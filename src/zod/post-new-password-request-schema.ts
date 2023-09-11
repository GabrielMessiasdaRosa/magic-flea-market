import getUserByEmail from "@/app/api/(services)/get-user-by-email";
import { z } from "zod";

const PostNewPasswordRequestSchema = z.object({
  email: z
    .string()
    .nonempty("Email é obrigatório")
    .email("Email não é válido")
    .refine((email) => {
      const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
      return emailRegex.test(email);
    }, "Email não é válido")
    .refine(async (data) => {
      const user = await getUserByEmail(data);
      if (!user) {
        return false;
      }
      return true;
    }, "Não existe usuário com esse email"),
});

export default PostNewPasswordRequestSchema;
