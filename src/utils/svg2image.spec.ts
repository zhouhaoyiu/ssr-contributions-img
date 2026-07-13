import { resolveSharpFactory } from './svg2image';

describe('resolveSharpFactory', () => {
  it('should support direct CommonJS function exports', () => {
    const sharpFactory = jest.fn() as unknown;

    expect(resolveSharpFactory(sharpFactory)).toBe(sharpFactory);
  });

  it('should support ESM default exports', () => {
    const sharpFactory = jest.fn() as unknown;

    expect(resolveSharpFactory({ default: sharpFactory } as unknown)).toBe(
      sharpFactory,
    );
  });

  it('should throw when the module shape is invalid', () => {
    expect(() => resolveSharpFactory({} as unknown)).toThrow(
      'Failed to resolve sharp factory from module export',
    );
  });
});
