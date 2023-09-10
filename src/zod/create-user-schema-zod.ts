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
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Senhas não conferem",
  })
  .refine((data) => data.email !== data.password, {
    path: ["password"],
    message: "Senha não pode ser igual ao email",
  })
  .refine((data) => data.username !== data.password, {
    path: ["password"],
    message: "Senha não pode ser igual ao username",
  })
  .refine((data) => data.username !== data.email, {
    path: ["email"],
    message: "Email não pode ser igual ao username",
  });

export default CreateUserSchemaZod;
