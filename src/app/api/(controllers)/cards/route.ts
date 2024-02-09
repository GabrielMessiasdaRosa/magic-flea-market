import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import apiRequestQueryMounter from "../../(lib)/use-api-request-queries-handler";

export async function GET(req: Request) {
  const params = await apiRequestQueryMounter(req);
  const data = await prisma.card.findMany({
    take: Number(params.take),
    skip: Number(params.skip),
    where: {
      OR: [
        {
          name: {
            contains: params.criteria || "",
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}
