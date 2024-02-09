import clientApi from "../../api-hooks/client-api";

async function postNewUserService(newUserData: any) {
  try {
    const res = await clientApi.post("/users", newUserData);
    return res?.data;
  } catch (error) {
    throw error;
  }
}
export default postNewUserService;
