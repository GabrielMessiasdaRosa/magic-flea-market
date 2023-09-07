"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingIcon from "./loading-icon";
import { Button, Input, Link } from "./next-ui-exports";

export interface LoginFormProps {}

export default function LoginForm({}: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const onSubmit = async (data: any) => {
    setLoading(true);
    const loginResponse = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (loginResponse?.error === "CredentialsSignin") {
      setError("invalidCredentials", {
        type: "manual",
        message: "Email ou senha incorretos",
      });
    }
    if (loginResponse?.error === null) {
      router.push("/");
    }
  };
  return (
    <form className="text-gray-800 flex flex-col gap-4 space-y-10 items-center justify-center w-full h-full">
      <div className="flex flex-col text-center items-center justify-center lg:w-1/2">
        <h1 className="text-4xl font-bold">Magic flea market</h1>
        <sub className="mt-2 text-lg">
          O lugar ideal para vender, comprar ou trocar cartas de Magic: The
          Gathering
        </sub>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          disabled={loading}
          {...register("email", { required: true })}
          validationState={
            errors.email || errors.invalidCredentials ? "invalid" : "valid"
          }
          errorMessage={
            errors.email
              ? "Insira um email válido"
              : errors.invalidCredentials && "Email ou senha incorretos"
          }
          autoFocus
          endContent={
            <svg
              style={{
                color: errors.email ? "red" : "gray",
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          }
          label="Email"
          type="email"
          color="primary"
          placeholder="magic-flea-market@email.com"
          variant="bordered"
        />
        <Input
          disabled={loading}
          {...register("password", { required: true })}
          validationState={
            errors.password || errors.invalidCredentials ? "invalid" : "valid"
          }
          errorMessage={
            errors.password
              ? "Senha é obrigatória"
              : errors.invalidCredentials && "Email ou senha incorretos"
          }
          endContent={
            <svg
              style={{
                color: errors.password ? "red" : "gray",
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          }
          label="Senha"
          color="primary"
          placeholder="*********"
          type="password"
          variant="bordered"
        />{" "}
        <div className="flex-1">
          <Button
            color="primary"
            disabled={loading}
            onClick={() => {
              clearErrors();
              handleSubmit(onSubmit)();
            }}
            className="w-full"
          >
            {loading ? <LoadingIcon /> : "Entrar"}
          </Button>
        </div>
        <div className="flex py-2 px-1 justify-between">
          {/* <Checkbox
            classNames={{
              label: "text-small",
            }}
          >
            Remember me
          </Checkbox> */}
          {/*  <Link color="primary" href="#" size="sm">
            Esqueci a senha
          </Link> */}
          <span className="text-sm">Não tem uma conta ?</span>
          <Link color="primary" href="/register" size="sm">
            Registre-se
          </Link>
        </div>
      </div>
    </form>
  );
}
