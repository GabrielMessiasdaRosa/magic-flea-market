"use client";

import getCardsService from "@/api-handlers/api-services/cards/get-cards-service";
import { CardType } from "@/types/card-type";

import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCards = (query: {
  take?: number;
  skip?: number;
  criteria?: string;
}) => {
  const queryClient = useQueryClient();
  const { refetch, data, error, status } = useQuery<CardType[]>({
    queryKey: ["cards"],
    queryFn: async () => await getCardsService(query),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["cards"])?.dataUpdatedAt,
    initialData: () => {
      const state: any = queryClient.getQueryState(["cards"]);

      if (state && Date.now() - state.dataUpdatedAt <= 10 * 1000) {
        return state.data.data;
      }
      return undefined;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cards"], data);
    },
    onError: (error) => {
      console.log("Something went wrong: ", { message: error });
    },
  });
  return { refetch, data, error, pending: status };
};
