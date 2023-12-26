"use server";

import prisma from "@/lib/prisma";
import createDto from "../(lib)/create-dto";

async function getUserByEmail(email: string): Promise<typeof userDto | any> {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      profile: true,
      plan: true,
      announcements: true,
    },
  });
  if (!user) {
    return null;
  }
  const userDto = createDto(user, ["password"]);
  return userDto;
}
export default getUserByEmail;
