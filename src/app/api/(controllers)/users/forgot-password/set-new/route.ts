import getRecoveryRequest from "@/app/api/(server-actions)/get-recovery-request";
import getUserByEmail from "@/app/api/(server-actions)/get-user-by-email";
import resetPassword from "@/app/api/(server-actions)/reset-password";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, token, newPassword } = await req.json();

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Usuário nao encontrado" },
        { status: 404 },
      );
    }

    const recoveryRequest = await getRecoveryRequest(email, token);
    if (!recoveryRequest) {
      return NextResponse.json(
        { error: "Token inválido ou expirado" },
        { status: 400 },
      );
    } else {
      await resetPassword(newPassword, email);
      return NextResponse.json({ message: "Senha alterada!" }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, errorDetails: { ...error } },
      { status: error.status || 500 },
    );
  }
}
