"use server";

import { NextApiRequest } from "next";

export async function apiRequestQueryMounter(req: NextApiRequest) {
  const url = new URL(req.url as any);
  const queryObject: any = {};
  url.searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });
  return { ...queryObject };
}
