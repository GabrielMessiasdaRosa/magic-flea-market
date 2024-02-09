import ProfileType from "@/types/profile-type";
import clientApi from "../../api-hooks/client-api";

async function getProfilesService(query: {
  take?: number;
  skip?: number;
  criteria?: string;
}): Promise<ProfileType[]> {
  try {
    const res = await clientApi.get("/profiles", {
      params: query,
    });
    return (res?.data.profiles || []) as ProfileType[];
  } catch (error) {
    throw error;
  }
}
export default getProfilesService;
