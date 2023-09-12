"use server";

import prisma from "@/lib/prisma";

const clearRecoveryAttempts = async (user: any) => {
  await prisma.recoveryRequest.deleteMany({
    where: {
      email: user.email,
    },
  });
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      recoveryAttempts: 0,
    },
  });
};
export default clearRecoveryAttempts;
