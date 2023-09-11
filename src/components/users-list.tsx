"use client";

import { useGetUsers } from "@/api-handlers/api-hooks/users/use-users";

export interface UsersListProps {}

export default function UsersList({}: UsersListProps) {
  const { data: users, pending } = useGetUsers();
  return (
    <ul>
      {pending ? (
        <li>Carregando...</li>
      ) : (
        users?.map((user, index) => {
          return (
            <li key={index + user.id}>
              <h1>{user.profile.nickname}</h1>
            </li>
          );
        })
      )}
    </ul>
  );
}
