import { normalizeRenderConfig } from '../../shared/render-core/normalize';

describe('normalizeRenderConfig', () => {
  it('should normalize raw hex stroke and foreground colors like the server dto', () => {
    const config = normalizeRenderConfig({
      chart: '3dbar' as unknown,
      strokeColor: '222222',
      foregroundColor: 'ff00aa',
    });

    expect(config.strokeColor).toBe('#222222');
    expect(config.foregroundColor).toBe('#ff00aa');
  });

  it('should discard non-hex color strings', () => {
    const config = normalizeRenderConfig({
      chart: '3dbar' as unknown,
      strokeColor: 'white',
      foregroundColor: 'rgb(255, 0, 170)',
    });

    expect(config.strokeColor).toBe('');
    expect(config.foregroundColor).toBe('');
  });
});
