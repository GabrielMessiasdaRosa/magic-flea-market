import getProfileByIdService from "@/app/api/(services)/get-profile-by-id";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const profile = await getProfileByIdService(id);
    if (!profile) {
      throw NextResponse.json(
        {
          error: "Profile not found",
          errorDetails: { details: `Profile with ID:${id} not found` },
        },
        { status: 404 },
      );
    }
    return NextResponse.json({ data: profile }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, errorDetails: { ...error } },
      { status: error.status || 500 },
    );
  }
}
