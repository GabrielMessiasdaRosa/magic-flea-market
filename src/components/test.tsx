"use client";

import { useGetUsers } from "@/api-hooks/users/use-get-users-api-hook";

export interface TestProps {}

export default function Test({}: TestProps) {
  const { data: users, pending } = useGetUsers();
  return (
    <div>
      <div>status: {pending}</div>
      <div>
        users:{" "}
        {pending ? (
          <div>loading...</div>
        ) : (
          <div>
            {users?.map((user) => {
              return <div>{user.name}</div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
