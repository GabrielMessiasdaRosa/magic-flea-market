"use server";
import prisma from "@/lib/prisma";
import createDto from "../(lib)/create-dto";

async function getProfileByIdService(
  id: string,
): Promise<typeof profileDto | any> {
  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!profile) {
    return null;
  }

  const profileDto = createDto(profile, ["user.password"]);
  return profileDto as typeof profileDto;
}
export default getProfileByIdService;
