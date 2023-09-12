import postNewUserService from "@/api-handlers/api-services/post-new-user-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useCreateUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation(postNewUserService, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Conta criada com sucesso!");
      toast.loading(
        "Você será redirecionado para a página de login em breve ...",
      );
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return {
    pending: status,
    fetch: mutate,
  };
};
