import { postNewPasswordRecovery } from "@/api-handlers/api-services/put-new-password";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const usePostNewPasswordByToken = () => {
  const router = useRouter();
  /* const queryClient = useQueryClient(); */
  const { mutate, status } = useMutation(postNewPasswordRecovery, {
    onSuccess: async () => {
      /* await queryClient.invalidateQueries("users"); */
      toast.success("Senha alterada com sucesso!");
      toast.loading(
        "Você será redirecionado para a página de login em breve ...",
      );
      setTimeout(() => {
        router.push("/login");
      }, 3000);
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
