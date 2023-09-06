"use client";
import { LockIcon } from "./lock-icon";
import { MailIcon } from "./mail-icon";
import { Checkbox, Input, Link } from "./next-ui-exports";

export interface LoginFormProps {}

export default function LoginForm({}: LoginFormProps) {
  return (
    <form className="text-gray-800 flex flex-col gap-4 space-y-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Magic flea market</h1>
        <sub className="mt-2 text-lg text-center">
          O lugar ideal para vender, comprar ou trocar cartas de Magic: The
          Gathering
        </sub>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          autoFocus
          endContent={
            <MailIcon className="text-2xl text-gray-500 pointer-events-none flex-shrink-0" />
          }
          label="Email"
          placeholder="magic-flea-market@email.com"
          variant="bordered"
        />
        <Input
          endContent={
            <LockIcon className="text-2xl text-gray-500 pointer-events-none flex-shrink-0" />
          }
          label="Senha"
          placeholder="*********"
          type="password"
          variant="bordered"
        />
        <div className="flex py-2 px-1 justify-between">
          <Checkbox
            classNames={{
              label: "text-small",
            }}
          >
            Remember me
          </Checkbox>
          <div className="flex gap-2">
            <Link color="primary" href="#" size="sm">
              Esqueci a senha
            </Link>
            <Link color="primary" href="#" size="sm">
              Registre-se
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
