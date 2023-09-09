"use client";
import { validateEmail } from "@/lib/validate-email";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingIcon from "./loading-icon";
import MfmBrandLogo from "./mfm-brand-logo";
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
    const isEmailValid = validateEmail(data.email);
    if (!isEmailValid) {
      setError("invalidEmailFormat", {
        type: "manual",
        message: "O email inserido não está em um formato válido",
      });
      return;
    }
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
      });
    }
    if (loginResponse?.error === null) {
      router.push("/");
    }
  };
  return (
    <form className="flex h-full w-3/4 flex-col items-center justify-center gap-4  space-y-10 xl:text-gray-800">
      <div className="flex flex-col items-center justify-center text-center ">
        <h1 className="text-2xl  font-light md:text-4xl">
          <MfmBrandLogo fontDefinition="text-white xl:text-primary-950" />
        </h1>
        <p className="mt-2 text-sm md:text-lg">
          O lugar ideal para vender, comprar ou trocar cartas de Magic: The
          Gathering
        </p>
      </div>
      <div className="flex w-full flex-col gap-3">
        <Input
          disabled={loading}
          {...register("email", { required: true })}
          validationState={
            errors.email ||
            errors.invalidCredentials ||
            errors.invalidEmailFormat
              ? "invalid"
              : "valid"
          }
          errorMessage={
            errors.email
              ? "Insira um email válido"
              : errors.invalidCredentials
              ? "Email ou senha incorretos"
              : errors.invalidEmailFormat &&
                "O email inserido não está em um formato válido"
          }
          autoFocus
          endContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`h-6 w-6 ${
                errors.email || errors.invalidEmailFormat
                  ? "text-rose-500"
                  : "text-gray-500"
              }`}
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
          variant="flat"
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
              className={`h-6 w-6 ${
                errors.password || errors.invalidCredentials
                  ? "text-rose-500"
                  : "text-gray-500"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
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
          variant="flat"
        />{" "}
        <div className="flex-1">
          <Button
            color="primary"
            disabled={loading}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              clearErrors();
              handleSubmit(onSubmit)();
            }}
            className="w-full"
          >
            {loading ? <LoadingIcon /> : "Entrar"}
          </Button>
        </div>
        <div className="flex flex-col justify-between px-1 py-2 font-medium 2xl:flex-row">
          {/* <Checkbox
            classNames={{
              label: "text-small",
            }}
          >
            Remember me
          </Checkbox> */}
          <Link color="primary" href="/recovery/request-new-password" size="sm">
            Esqueci a senha
          </Link>
          <div className="flex gap-2">
            <span className="text-sm">Primeira vez aqui?</span>
            <Link color="primary" href="/register" size="sm">
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
