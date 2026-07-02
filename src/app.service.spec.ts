import { ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { OutputFormat } from './dto/base/output-format.dto';
import { ChartTpl } from '../shared/render-core/enums';
import { GithubUser } from './types/contribution.interface';

const user: GithubUser = {
  name: 'CatsJuice',
  contributionsCollection: {
    contributionCalendar: {
      colors: [],
      totalContributions: 3,
      weeks: [
        {
          firstDay: '2026-03-15',
          contributionDays: [
            { date: '2026-03-15', contributionCount: 0 },
            { date: '2026-03-16', contributionCount: 1 },
            { date: '2026-03-17', contributionCount: 2 },
          ],
        },
      ],
    },
  },
};

function createService() {
  return new AppService(
    new ConfigService({
      playground: {
        dataCacheTtlMs: 60000,
      },
      theme: {
        bg: {
          dark: '#000',
          light: '#fff',
        },
      },
    }),
  );
}

describe('AppService', () => {
  it('reuses rendered chart SVGs for the same contribution data and config', async () => {
    const service = createService();
    const config = {
      chart: ChartTpl.BAR3D,
      theme: 'green',
      weeks: 1,
    } as any;

    const first = await service.generateChartSvgCode(user, config);
    const second = await service.generateChartSvgCode(user, config);

    expect(second).toBe(first);
  });

  it('sets browser cache headers for rendered responses', async () => {
    const service = createService();
    const res = {
      header: jest.fn(),
      send: jest.fn(),
    } as any;

    await service.resolveResponseByFormat(res, '<svg></svg>', {
      format: OutputFormat.SVG,
      dark: false,
    });

    expect(res.header).toHaveBeenCalledWith(
      'Cache-Control',
      'public, max-age=60, stale-while-revalidate=86400',
    );
  });
});
