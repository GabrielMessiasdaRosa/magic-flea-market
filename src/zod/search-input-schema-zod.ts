import * as z from "zod";
import debounce from "./debounce";

const SearchInputSchemaZod = z
  .object({
    criteria: z.string(),
  })
  .refine(
    debounce(
      async ({ criteria }) => {},
      1000, // 1000 milissegundos (1 segundo) de debounce
    ),
    {
      path: ["email"],
      message: "Já existe um usuário com este email",
    },
  );
export default SearchInputSchemaZod;
