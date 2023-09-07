import { NextApiRequest } from "next";

export async function useApiRequestQueryMounter(req: NextApiRequest) {
  const url = new URL(req.url as any);
  const queryObject: any = {};
  url.searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });
  return { ...queryObject };
}
