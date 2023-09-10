import * as z from "zod";
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
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um numero e um caracteres especial",
      ),
    confirmPassword: z.string().nonempty("Confirmação de senha é obrigatório"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Senhas não conferem",
  });
export default CreateUserSchemaZod;
