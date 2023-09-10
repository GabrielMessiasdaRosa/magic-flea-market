"use server";

import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import createDto from "../(lib)/create-dto";
import formatUsernameWithIdentifier from "../(lib)/format-username-with-identifier";

const FREE_PLAN_CODE = "clm84s36c0001wif04xa09huu";
const BASIC_PLAN_CODE = "clm84s2eo0000wif0av6cnumu";
const PRO_PLAN_CODE = "clm84s3ax0002wif00d1uin4q";

async function createUser(payload: any): Promise<typeof newUserDto> {
  const { email, username, password } = payload;
  const usersQuantity = await prisma.user.count();
  const usernameWithIdentifier = formatUsernameWithIdentifier(
    username,
    usersQuantity + 1,
    4,
  );
  const hashedPassword = await hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: usernameWithIdentifier, // tem que mudar o schema pra username nao ser unico
      image: "https://i.imgur.com/6VBx3io.png",
      email,
      password: hashedPassword,
      username: usernameWithIdentifier,
      plan: {
        connect: {
          id: FREE_PLAN_CODE,
        },
      },
      profile: {
        create: { nickname: usernameWithIdentifier },
      },
    },
    include: {
      profile: true,
      plan: true,
    },
  });
  const newUserDto = createDto(newUser, ["password"]);
  return newUserDto;
}
export default createUser;
