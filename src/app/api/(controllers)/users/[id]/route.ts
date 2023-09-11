import getUserByIdService from "@/app/api/(server-actions)/get-user-by-id";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const user = await getUserByIdService(id);
    if (!user) {
      throw NextResponse.json(
        {
          error: "User not found",
          errorDetails: { details: `User with ID:${id} not found` },
        },
        { status: 404 },
      );
    }
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, errorDetails: { ...error } },
      { status: error.status || 500 },
    );
  }
}
