"use server";

import prisma from "@/lib/prisma";

async function getRecoveryRequest(email: string, token: string) {
  const recoveryRequest = await prisma.recoveryRequest.findFirst({
    where: {
      email: email,
      token: token,
      expirationDate: {
        gte: new Date(),
      },
    },
  });
  return recoveryRequest;
}

export default getRecoveryRequest;
