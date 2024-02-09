"use client";

import getUsersService from "@/api-handlers/api-services/users/get-users-service";
import UserType from "@/types/user-type";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUsers = () => {
  const queryClient = useQueryClient();
  const { data, error, status } = useQuery<UserType[]>({
    queryKey: ["users"],
    queryFn: getUsersService,
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["users"])?.dataUpdatedAt,
    initialData: () => {
      const state: any = queryClient.getQueryState(["users"]);

      if (state && Date.now() - state.dataUpdatedAt <= 10 * 1000) {
        return state.data.data;
      }
      return undefined;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], data);
    },
    onError: (error) => {
      console.error("Something went wrong: ", { message: error });
    },
  });
  return {
    data,
    error,
    pending: status === "loading",
  };
};
