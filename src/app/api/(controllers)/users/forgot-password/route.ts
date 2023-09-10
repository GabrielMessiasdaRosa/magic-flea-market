import createNewRecoveryRequest from "@/app/api/(services)/create-new-recovery-request";
import getUserByEmail from "@/app/api/(services)/get-user-by-email";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log(email);
    const user = await getUserByEmail(email);
    console.log(user.email);
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
    console.log(error);
    return NextResponse.json(
      { error: error.message, errorDetails: { ...error } },
      { status: error.status || 500 },
    );
  }
}
