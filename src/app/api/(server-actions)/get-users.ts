"use server";
import prisma from "@/lib/prisma";
import createDto from "../(lib)/create-dto";

async function getUsersService(
  limit: string,
  page: string,
): Promise<typeof usersDto> {
  const users = await prisma.user.findMany({
    take: Number(limit || 10),
    skip: Number(page || 1) - 1,
    include: {
      profile: true,
      plan: true,
      announcements: true,
    },
  });
  const usersDto = createDto(users, ["password"]);
  return usersDto as typeof usersDto;
}
export default getUsersService;
