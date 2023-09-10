import { NextResponse } from "next/server";

export type GetUsersParams = {
  limit?: number;
  page?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

export async function getUsers({
  limit,
  page,
  onError,
  onSuccess,
}: GetUsersParams) {
  try {
    const url = new URL(
      process.env.NEXT_PUBLIC_API_URL +
        "/api/user" +
        `?limit=${limit}&page=${page}`,
    ).toString();
    const users = await fetch(url);
    console.log(url);
    const data = await users.json();
    if (data) {
      onSuccess && onSuccess(data);
    } else {
      onError && onError(data);
    }
  } catch (error: any) {
    console.log(error);
    onError && onError(error);
    throw NextResponse.json({
      error: error.message,
      errorDetails: { ...error },
    });
  }
}
