async function apiRequestQueryMounter(req: Request) {
  const url = new URL(req.url as any);
  const queryObject: any = {};
  url.searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });
  return queryObject;
}
export default apiRequestQueryMounter;
