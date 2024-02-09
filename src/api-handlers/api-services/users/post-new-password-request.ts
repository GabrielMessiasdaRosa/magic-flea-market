import clientApi from "../../api-hooks/client-api";

async function postNewPasswordRequestService(email: string) {
  try {
    const res = await clientApi.post("/users/forgot-password", { email });
    return res;
  } catch (error) {
    throw error;
  }
}

export default postNewPasswordRequestService;
