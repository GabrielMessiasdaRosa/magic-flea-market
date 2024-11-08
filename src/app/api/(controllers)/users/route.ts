import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import apiRequestQueryMounter from "../../(lib)/use-api-request-queries-handler";
import createUser from "../../(server-actions)/create-user";
import getUserByEmail from "../../(server-actions)/get-user-by-email";
import getUsersService from "../../(server-actions)/get-users";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { email, password, username } = body;
    const userByEmail = await getUserByEmail(email);
    if (userByEmail) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );
    } else {
      const newUser = (await createUser(body)) as User;
      return NextResponse.json(
        {
          message: "User created",
          user: {
            id: newUser.id,
            email: newUser.email,
          },
        },
        { status: 201 },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        errorDetails: { ...error },
      },
      { status: error.status || 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { limit, page } = await apiRequestQueryMounter(req);
    const users = await getUsersService(limit, page);
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        errorDetails: { ...error },
      },
      { status: error.status || 500 },
    );
  }
}
