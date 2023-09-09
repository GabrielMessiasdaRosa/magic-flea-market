import { generateUniqueToken } from "@/lib/generate-unique-token";
import { sendMail } from "@/lib/mail-service";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user && user.recoveryAttempts > 10) {
    return NextResponse.json(
      { error: "Too many recovery attempts" },
      { status: 429 },
    );
  } else {
    await prisma.user.update({
      where: { email: email },
      data: { recoveryAttempts: { increment: 1 } },
    });
    const uniqueToken = generateUniqueToken();
    const expirationDate = new Date(Date.now() + 5 * 60 * 1000); // Prazo de validade de 5 minutos
    await sendMail(email, uniqueToken);

    await prisma.recoveryRequest.create({
      data: {
        email: email,
        token: uniqueToken,
        expirationDate: expirationDate,
      },
    });
    return NextResponse.json({ error: "Success" }, { status: 200 });
  }
}
