import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, token, newPassword } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    // Usuário não existe
    // Trate o erro adequadamente
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const recoveryRequest = await prisma.recoveryRequest.findFirst({
    where: {
      email: user.email,
      token: token,
      expirationDate: {
        gte: new Date(),
      },
    },
  });
  if (!recoveryRequest && user) {
    // Token inválido ou expirado
    // Trate o erro adequadamente
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 },
    );
  } else {
    // Token válido; permita ao usuário redefinir a senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email: user.email },
      data: { recoveryAttempts: 0, password: hashedPassword },
    });
    await prisma.recoveryRequest.deleteMany({
      where: { email: user.email },
    });
    return NextResponse.json(
      { message: "Token is valid. Password updated !" },
      { status: 200 },
    );
  }
}
