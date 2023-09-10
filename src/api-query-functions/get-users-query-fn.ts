import clientApi from "@/api-hooks/client-api";
import UserType from "@/types/user-type";

async function getUsersQueryFn(): Promise<UserType[]> {
  try {
    const res = await clientApi.get("/users");
    return (res?.data.data || []) as UserType[];
  } catch (error) {
    throw error;
  }
}
export default getUsersQueryFn;
