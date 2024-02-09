import createNewRecoveryRequest from "@/app/api/(server-actions)/create-new-recovery-request";
import getUserByEmail from "@/app/api/(server-actions)/get-user-by-email";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const user = await getUserByEmail(email);
    if (user && user.recoveryAttempts > 10) {
      return NextResponse.json(
        { error: "Too many recovery attempts" },
        { status: 429 },
      );
    } else {
      await createNewRecoveryRequest(email);
      return NextResponse.json({ message: "Success" }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, errorDetails: { ...error } },
      { status: error.status || 500 },
    );
  }
}
