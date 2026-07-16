import { Response } from 'express';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { svgCode2image } from './utils/svg2image';
import { generateHtml } from './utils/generate-html';
import { sanitizeSvg } from './utils/sanitize-svg';
import { OutputFormat } from './dto/base/output-format.dto';
import { themesProcessor } from './charts/themes.processor';
import { GithubUser } from './types/contribution.interface';
import { themes } from './utils/get-theme';
import { ConfigSvgQueryDto } from './dto/config-svg.query.dto';
import { SvgResponseResolverOptions } from './types/svg-res-resolver-opt.interface';
import { renderContributionSvg } from '../shared/render-core/render';

type SvgCacheEntry = {
  expiresAt: number;
  promise: Promise<string>;
};

const MAX_SVG_CACHE_ENTRIES = 200;
const ACTIVE_CONTENT_POLICY =
  "default-src 'none'; img-src data:; style-src 'unsafe-inline'; sandbox";

function sanitizeResponseFilename(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120) || 'image';
}

function stableSerialize(value: unknown): string {
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableSerialize(item)).join(',')}]`;
  }
  if (value && typeof value === 'object') {
    return `{${Object.keys(value as Record<string, unknown>)
      .sort()
      .map(
        (key) =>
          `${JSON.stringify(key)}:${stableSerialize(
            (value as Record<string, unknown>)[key],
          )}`,
      )
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function hashRenderCacheKey(value: unknown) {
  return createHash('sha1').update(stableSerialize(value)).digest('hex');
}

@Injectable()
export class AppService {
  private readonly chartSvgCache = new Map<string, SvgCacheEntry>();
  private readonly themeSvgCache = new Map<boolean, string>();

  constructor(@Inject(ConfigService) private readonly _cfgSrv: ConfigService) {}

  private getRenderCacheTtlMs() {
    return this._cfgSrv.get<number>('playground.dataCacheTtlMs') || 300000;
  }

  private pruneChartSvgCache(now = Date.now()) {
    for (const [key, entry] of this.chartSvgCache) {
      if (entry.expiresAt <= now) this.chartSvgCache.delete(key);
    }

    while (this.chartSvgCache.size >= MAX_SVG_CACHE_ENTRIES) {
      const oldestKey = this.chartSvgCache.keys().next().value;
      if (!oldestKey) break;
      this.chartSvgCache.delete(oldestKey);
    }
  }

  private setResponseCacheHeaders(res: Response) {
    const maxAge = Math.max(1, Math.floor(this.getRenderCacheTtlMs() / 1000));
    res.header(
      'Cache-Control',
      `public, max-age=${maxAge}, stale-while-revalidate=86400`,
    );
  }

  private setActiveContentHeaders(res: Response) {
    res.header('Content-Security-Policy', ACTIVE_CONTENT_POLICY);
    res.header('X-Content-Type-Options', 'nosniff');
  }

  /**
   * Create theme graph svg code
   * @returns
   */
  public async generateThemeSvgCode(dark) {
    const darkMode = !!dark;
    const cached = this.themeSvgCache.get(darkMode);
    if (cached) return cached;

    const svg = themesProcessor(themes, darkMode);
    this.themeSvgCache.set(darkMode, svg);
    return svg;
  }

  /**
   * Create chart svg code
   * @param username
   * @param config
   * @returns
   */
  public async generateChartSvgCode(
    user: GithubUser,
    _config: ConfigSvgQueryDto,
  ) {
    const config = { ..._config };
    if ([OutputFormat.PNG, OutputFormat.JPEG].includes(_config.format)) {
      delete config.animation;
    }

    const shouldCache = config.theme !== 'random';
    const cacheKey = shouldCache
      ? hashRenderCacheKey({
          user: user.contributionsCollection.contributionCalendar,
          config,
        })
      : '';
    const now = Date.now();

    if (shouldCache) {
      this.pruneChartSvgCache(now);
      const cached = this.chartSvgCache.get(cacheKey);
      if (cached && cached.expiresAt > now) return cached.promise;
    }

    const task = renderContributionSvg(user, config)
      .then((svgStr) => {
        if (!svgStr) {
          throw new BadRequestException(
            'Unimplemented chart type: ' + config.chart,
          );
        }

        return svgStr;
      })
      .catch((error) => {
        if (shouldCache) this.chartSvgCache.delete(cacheKey);
        throw error;
      });

    if (shouldCache) {
      this.chartSvgCache.set(cacheKey, {
        expiresAt: now + this.getRenderCacheTtlMs(),
        promise: task,
      });
    }

    return task;
  }

  /**
   * Make a response to client with different format
   * @param res
   * @param svgCode
   * @param format
   * @param quality
   * @param filename
   */
  public async resolveResponseByFormat(
    res: Response,
    svgCode: string,
    options: SvgResponseResolverOptions = {},
  ) {
    const { format, quality, dark } = options;
    const filename = sanitizeResponseFilename(
      options.filename || `${Date.now()}`,
    );
    const sanitizedSvgCode = sanitizeSvg(svgCode);

    const roundQuality = Math.min(
      10,
      Math.max(0.1, parseFloat(`${quality}`) || 1),
    );
    const bg = this._cfgSrv.get(`theme.bg.${dark ? 'dark' : 'light'}`);
    this.setResponseCacheHeaders(res);
    this.setActiveContentHeaders(res);
    if (format === OutputFormat.SVG) {
      res.header('Content-Type', 'image/svg+xml; charset=utf-8');
      // res.header('Content-Disposition', `inline; filename=${filename}.svg`);
      res.send(Buffer.from(sanitizedSvgCode));
    } else if (format === OutputFormat.XML) {
      res.header('Content-Type', 'application/xml;charset=utf-8');
      res.send(sanitizedSvgCode);
    } else if (format === OutputFormat.HTML) {
      res.header('Content-Type', 'text/html;charset=utf-8');
      res.send(generateHtml(sanitizedSvgCode, filename, bg));
    } else if (format === OutputFormat.PNG) {
      res.header('Content-Type', 'image/png;charset=utf-8');
      res.header('Content-Disposition', `inline; filename=${filename}.png`);
      res.send(await svgCode2image(sanitizedSvgCode, 'png', roundQuality, bg));
    } else if (format === OutputFormat.JPEG) {
      res.header('Content-Type', 'image/jpeg;charset=utf-8');
      res.header('Content-Disposition', `inline; filename=${filename}.jpg`);
      res.send(await svgCode2image(sanitizedSvgCode, 'jpeg', roundQuality, bg));
    } else
      return this.resolveResponseByFormat(res, svgCode, {
        ...options,
        format: OutputFormat.HTML,
      });
  }
}
