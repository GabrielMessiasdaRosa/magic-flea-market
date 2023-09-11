import { z } from "zod";

const SetNewPasswordSchemaZod = z
  .object({
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
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export default SetNewPasswordSchemaZod;
