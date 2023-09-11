"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

async function resetPassword(newPassword: string, email: string) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { email },
    data: { recoveryAttempts: 0, password: hashedPassword },
  });
  await prisma.recoveryRequest.deleteMany({
    where: { email },
  });
}
export default resetPassword;
