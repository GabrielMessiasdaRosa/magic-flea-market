import prisma from "@/lib/prisma";
import createDto from "../(lib)/create-dto";

async function getProfiles({
  limit,
  page,
  orderBy,
  criteria,
}: {
  limit: string;
  page: string;
  orderBy?: any; // Use o tipo de ordenação correto aqui
  criteria?: string;
}) {
  const profiles = await prisma.profile.findMany({
    take: Number(limit || 10),
    skip: Number(page || 1) - 1,
    where: {
      OR: [
        {
          nickname: {
            contains: criteria || "",
            mode: "insensitive",
          },
        },
        {
          user: {
            username: {
              contains: criteria || "",
              mode: "insensitive",
            },
          },
        },
      ],
    },
    include: {
      user: true,
      wantList: true,
    },
    orderBy: orderBy || [
      {
        reputationPoints: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
  /*  await prisma.user.update({
    where: {
      id: "clmcsaaro0002wisnqjgkuby5",
    },
    data: {
      profile: {
        update: {
          reputationPoints: 100,
        },
      },
    },
  }); */
  const profilesDto = createDto(profiles, ["user.password"]);
  return profilesDto as typeof profilesDto;
}

export default getProfiles;
