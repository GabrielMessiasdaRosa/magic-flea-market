import postNewUserService from "@/api-handlers/api-services/post-new-user-service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateUser = () => {
  /* const queryClient = useQueryClient(); */
  const { mutate, status } = useMutation(postNewUserService, {
    onSuccess: async (application) => {
      /* await queryClient.invalidateQueries("users"); */
      toast.success("Conta criada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return {
    pending: status === "loading",
    fetch: mutate,
  };
};
