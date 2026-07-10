import { renderContributionSvg } from '../shared/render-core/render';
import {
  buildGithubUserFromContributionDays,
  getContributionYearsForProfileWindow,
  mergeContributionDaysByDate,
} from '../src/utils/github-profile-contributions';

const cacheTtlSeconds = 300;

async function loadUser(username: string) {
  const { years, startDate, endDate } = getContributionYearsForProfileWindow();
  const pages = await Promise.all(
    years.map(async (year) => {
      const pageUrl = new URL(
        `https://github.com/users/${username}/contributions`,
      );
      pageUrl.searchParams.set('from', `${year}-01-01`);
      pageUrl.searchParams.set('to', `${year}-12-31`);

      const response = await fetch(pageUrl.toString(), {
        headers: {
          'Accept-Language': 'en-US,en;q=0.9',
          'User-Agent': 'ssr-contributions-img-worker',
        },
      });

      return {
        status: response.status,
        data: response.ok ? await response.text() : '',
      };
    }),
  );

  if (pages.some((page) => page.status === 404)) return null;
  if (pages.some((page) => page.status !== 200)) {
    throw new Error('GitHub contribution graph unavailable');
  }

  const days = mergeContributionDaysByDate(
    pages.map((page) => page.data),
    endDate,
    startDate,
  );

  return days.length
    ? buildGithubUserFromContributionDays(username, days)
    : null;
}

function getUsername(pathname: string) {
  const match = pathname.match(/^\/(?:_|svg)\/([^/]+)$/);
  const username = match?.[1] ? decodeURIComponent(match[1]) : '';
  return /^[A-Za-z0-9-]{1,39}$/.test(username) ? username : '';
}

function getRenderConfig(searchParams: URLSearchParams) {
  const config: Record<string, string | string[]> = {};

  searchParams.forEach((value, key) => {
    if (!value) return;
    config[key] = key === 'colors' ? value.split(',') : value;
  });

  return config;
}

export default {
  async fetch(request: Request, _env: unknown, ctx: any) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405 });
    }

    const url = new URL(request.url);

    if (url.pathname === '/health') return new Response('ok');
    if (url.pathname === '/') {
      return Response.redirect(
        'https://github.com/zhouhaoyiu/ssr-contributions-img',
        302,
      );
    }

    const username = getUsername(url.pathname);
    if (!username) return new Response('Not found', { status: 404 });

    const cache = (caches as CacheStorage & { default: Cache }).default;
    const cached = await cache.match(request);
    if (cached) return cached;

    let user;
    try {
      user = await loadUser(username);
    } catch {
      return new Response('GitHub contribution graph unavailable', {
        status: 503,
      });
    }
    if (!user)
      return new Response(`User ${username} not found`, { status: 404 });

    const svg = await renderContributionSvg(user, {
      chart: '3dbar',
      format: 'svg',
      ...getRenderConfig(url.searchParams),
    } as any);

    const response = new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': `public, max-age=${cacheTtlSeconds}, stale-while-revalidate=86400`,
      },
    });
    ctx.waitUntil(cache.put(request, response.clone()));
    return response;
  },
};
