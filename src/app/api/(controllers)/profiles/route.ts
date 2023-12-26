import { NextResponse } from "next/server";
import apiRequestQueryMounter from "../../(lib)/use-api-request-queries-handler";
import getProfiles from "../../(server-actions)/get-profiles";

export async function GET(req: Request) {
  try {
    const { limit, page, orderBy, criteria } =
      await apiRequestQueryMounter(req);
    const profiles = await getProfiles({
      limit,
      page,
      orderBy,
      criteria,
    });

    return NextResponse.json({ profiles }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, errorDetails: { ...error } },
      { status: error.status || 500 },
    );
  }
}
