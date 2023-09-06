import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
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

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password, username } = req.body;
    const userByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userByEmail) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        {
          status: 409,
        }
      );
    }
    const userByUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userByUsername) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        {
          status: 409,
        }
      );
    }
    const usersQuantity = await prisma.user.count();
    const usernameWithIdentifier = formatUsernameWithIdentifier(
      username,
      usersQuantity + 1,
      4
    );
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: usernameWithIdentifier,
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
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        errorDetails: { ...error },
      },
      {
        status: error.status || 500,
      }
    );
  }
}
