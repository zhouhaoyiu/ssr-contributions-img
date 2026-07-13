export function sortObj(
  obj: unknown,
  filter: (value: unknown) => boolean = () => true,
): unknown {
  if (Array.isArray(obj))
    return [...obj].sort().map((el) => sortObj(el, filter));
  else if (obj && typeof obj === 'object') {
    const source = obj as Record<string, unknown>;
    const keys = Object.keys(source).sort();
    return keys.reduce((prev, curr) => {
      prev[curr] = sortObj(source[curr], filter);
      return prev;
    }, {} as Record<string, unknown>);
  } else if (filter(obj)) return obj;
}

export const hashObject = (obj: unknown, filter?: (v: unknown) => boolean) =>
  JSON.stringify(sortObj(obj, filter));
