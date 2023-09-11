import getUserByEmail from "@/app/api/(services)/get-user-by-email";
import * as z from "zod";
import debounce from "./debounce";

const CreateUserSchemaZod = z
  .object({
    username: z
      .string()
      .min(3, `Nome do usuário deve ter no mínimo 3 caracteres`)
      .max(60)
      .nonempty("Username is required"),
    email: z
      .string()
      .nonempty("Email é obrigatório")
      .email("Email não é válido"),
    password: z
      .string()
      .min(8, `Senha deve ter no mínimo 8 caracteres`)
      .regex(/(?=.*[A-Z])/, "Senha deve conter pelo menos uma letra maiúscula")
      .regex(/(?=.*[a-z])/, "Senha deve conter pelo menos uma letra minúscula")
      .regex(/(?=.*[0-9])/, "Senha deve conter pelo menos um número")
      .regex(
        /(?=.*[!@#$%^&*])/,
        "Senha deve conter pelo menos um caractere especial",
      )
      .nonempty("Senha é obrigatório"),

    confirmPassword: z.string().nonempty("Confirmação de senha é obrigatório"),
  })
  .refine(
    debounce(
      async ({ email }) => {
        const user = await getUserByEmail(email);
        if (!user) {
          return true;
        }
        return false;
      },
      1000, // 1000 milissegundos (1 segundo) de debounce
    ),
    {
      path: ["email"],
      message: "Já existe um usuário com este email",
    },
  );
export default CreateUserSchemaZod;
