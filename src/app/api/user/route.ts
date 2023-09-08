import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { apiRequestQueryMounter } from "../(lib)/use-api-request-queries-handler";

const FREE_PLAN_CODE = "clm84s36c0001wif04xa09huu";
const BASIC_PLAN_CODE = "clm84s2eo0000wif0av6cnumu";
const PRO_PLAN_CODE = "clm84s3ax0002wif00d1uin4q";

// create new user
function formatUsernameWithIdentifier(
  username: string,
  userNumber: number,
  totalDigits: number,
  paddingCharacter?: string
) {
  const userNumberString = String(userNumber);
  const paddingChar = paddingCharacter || "0";

  const paddingLength = totalDigits - userNumberString.length;
  if (paddingLength <= 0) {
    return userNumberString;
  }

  const padding = paddingChar.repeat(paddingLength);
  const formattedUserIdentifier = username + "#" + padding + userNumberString;
  return formattedUserIdentifier;
}

export async function POST(req: Request, res: Response) {
  try {
    const { email, username, password } = await req.json();
    const userByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userByEmail) {
      return NextResponse.json(
        {
          error: "Email already in use",
        },
        { status: 409 }
      );
    } else {
      const usersQuantity = await prisma.user.count();
      const usernameWithIdentifier = formatUsernameWithIdentifier(
        username,
        usersQuantity + 1,
        4
      );
      const hashedPassword = await hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          name: username,
          image: "https://i.imgur.com/6VBx3io.png",
          email,
          password: hashedPassword,
          username,
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

      return NextResponse.json(
        {
          message: "User created",
          user: {
            id: newUser.id,
            email: newUser.email,
          },
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        errorDetails: { ...error },
      },
      { status: error.status || 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { limit, page } = await apiRequestQueryMounter(req);
    const users = await prisma.user.findMany({
      take: Number(limit || 10),
      skip: Number(page || 1) - 1,
      include: {
        profile: true,
        plan: true,
        announcements: true,
      },
    });
    const usersDto = users.map(({ password, ...rest }) => {
      return {
        ...rest,
      };
    });
    return NextResponse.json({ data: usersDto }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        errorDetails: { ...error },
      },
      { status: error.status || 500 }
    );
  }
}
