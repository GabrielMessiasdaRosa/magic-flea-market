import CardsType from "@/types/user-type";

import clientApi from "../../api-hooks/client-api";

async function getCardsService(query: {
  take?: number;
  skip?: number;
  criteria?: string;
}): Promise<CardsType[]> {
  try {
    const res = await clientApi.get("/cards", {
      params: query,
    });
    return (res?.data.data || []) as CardsType[];
  } catch (error) {
    throw error;
  }
}
export default getCardsService;
