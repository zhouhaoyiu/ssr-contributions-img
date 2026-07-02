import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtendedRequest } from '../types/extended-request.interface';
import { PlaygroundRateLimitService } from '../services/playground-rate-limit.service';

function getHeaderValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || '' : value || '';
}

function getClientIp(req: ExtendedRequest) {
  const forwardedFor = getHeaderValue(req.headers['x-forwarded-for']);
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return (
    req.ip ||
    req.socket?.remoteAddress ||
    req.raw?.socket?.remoteAddress ||
    'unknown'
  );
}

@Injectable()
export class RenderRateLimitGuard implements CanActivate {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly rateLimitService: PlaygroundRateLimitService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<ExtendedRequest>();
    const username = `${req.params?.username || ''}`.trim().toLowerCase();
    const ip = getClientIp(req);
    const limit =
      this.configService.get<number>('playground.dataRateLimitMax') || 30;
    const windowMs =
      this.configService.get<number>('playground.dataRateLimitWindowMs') ||
      60000;

    if (
      !this.rateLimitService.consume(`render:ip:${ip}`, limit * 4, windowMs)
    ) {
      throw new HttpException(
        'Too many render requests from this client',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    if (
      !this.rateLimitService.consume(
        `render:ip:${ip}:user:${username}`,
        limit,
        windowMs,
      )
    ) {
      throw new HttpException(
        'Too many render requests for this username',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
