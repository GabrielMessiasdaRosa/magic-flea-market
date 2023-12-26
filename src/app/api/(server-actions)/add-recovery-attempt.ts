"use server";

import prisma from "@/lib/prisma";

async function addRecoveryAttempt(email: string) {
  await prisma.user.update({
    where: { email },
    data: { recoveryAttempts: { increment: 1 } },
  });
  return;
}
export default addRecoveryAttempt;
