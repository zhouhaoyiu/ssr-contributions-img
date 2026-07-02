import { Transform } from 'class-transformer';
import { isArray, IsArray, IsOptional, IsString } from 'class-validator';
import { decorate } from 'ts-mixer';

const normalizeHexColor = (value: unknown) => {
  if (typeof value !== 'string') return '';
  const normalized = value.trim().replace(/^#/, '');
  return /^(?:[\da-fA-F]{3}|[\da-fA-F]{4}|[\da-fA-F]{6}|[\da-fA-F]{8})$/.test(
    normalized,
  )
    ? `#${normalized}`
    : '';
};

export class ColorsDto {
  /**
   * custom colors, hex value join with ","
   * @default {undefined}
   */
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  @decorate(
    Transform(({ value }) =>
      (isArray(value) ? value : (value || '').split(','))
        .map(normalizeHexColor)
        .filter(Boolean),
    ),
  )
  colors?: string[];
}
