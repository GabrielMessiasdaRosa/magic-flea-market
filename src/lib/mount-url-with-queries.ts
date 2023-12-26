export function mountUrlWithQueries(
  basePath: string,
  qryObject: Record<string, unknown>,
) {
  const url = new URL(basePath);
  Object.entries(qryObject).forEach(([key, value]) => {
    if (typeof value === "string") {
      url.searchParams.append(key, value);
    } else {
      // Se o valor não for uma string, converta-o para string antes de anexá-lo
      url.searchParams.append(key, String(value));
    }
  });
  return url;
}
