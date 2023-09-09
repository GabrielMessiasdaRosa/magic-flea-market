import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        plan: true,
        announcements: true,
      },
    });
    if (!user) {
      throw NextResponse.json(
        {
          error: "User not found",
          errorDetails: { details: `User with ID:${id} not found` },
        },
        { status: 404 },
      );
    }
    const { password, ...userDto } = user;

    return NextResponse.json({ data: userDto }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, errorDetails: { ...error } },
      { status: error.status || 500 },
    );
  }
}
