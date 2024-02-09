import UserType from "@/types/user-type";
import clientApi from "../../api-hooks/client-api";

async function getUsersService(): Promise<UserType[]> {
  try {
    const res = await clientApi.get("/users");
    return (res?.data.data || []) as UserType[];
  } catch (error) {
    throw error;
  }
}
export default getUsersService;
