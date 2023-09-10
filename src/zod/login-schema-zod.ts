import { z } from "zod";

const LoginSchemaZod = z.object({
  email: z.string().nonempty("Email é obrigatório").email("Email não é válido"),
  password: z.string().nonempty("Senha é obrigatório"),
});
export default LoginSchemaZod;
