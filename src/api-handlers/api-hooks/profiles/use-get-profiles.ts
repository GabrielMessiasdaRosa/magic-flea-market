"use client";

import getProfilesService from "@/api-handlers/api-services/profiles/get-profiles-service";
import ProfileType from "@/types/profile-type";

import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProfiles = (query: {
  take?: number;
  skip?: number;
  criteria?: string;
}) => {
  const queryClient = useQueryClient();
  const { refetch, data, error, status } = useQuery<ProfileType[]>({
    queryKey: ["profiles"],
    queryFn: async () => await getProfilesService(query),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["profiles"])?.dataUpdatedAt,
    initialData: () => {
      const state: any = queryClient.getQueryState(["profiles"]);

      if (state && Date.now() - state.dataUpdatedAt <= 10 * 1000) {
        return state.data.data;
      }
      return undefined;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["profiles"], data);
    },
    onError: (error) => {
      console.error("Something went wrong: ", { message: error });
    },
  });
  return { refetch, data, error, pending: status };
};
