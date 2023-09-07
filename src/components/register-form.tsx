"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingIcon from "./loading-icon";
import { Button, Input, Link } from "./next-ui-exports";

export interface RegisterFormProps {}

export default function RegisterForm({}: RegisterFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    setLoading(true);
    await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const loginResponse = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setLoading(false);
    if (loginResponse?.error === null) {
      router.push("/");
    }
  };

  const password = watch("password");
  const passwordConfirmation = watch("passwordConfirmation");
  return (
    <form className="text-gray-800 flex flex-col gap-4 space-y-10 items-center justify-center w-full h-full">
      <div className="flex flex-col text-center items-center justify-center lg:w-1/2">
        <h1 className="text-4xl font-bold">Registre-se</h1>
        <sub className="mt-2 text-lg">
          É de graça e voce tem acesso a uma lista de ofertas exclusivas!
        </sub>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          disabled={loading}
          {...register("username", { required: true })}
          validationState={errors.username ? "invalid" : "valid"}
          errorMessage={errors.username && "Senha é obrigatória"}
          endContent={
            <svg
              style={{
                color: errors.username ? "red" : "gray",
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
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
          label="Nome de usuário"
          color="primary"
          placeholder="motivado"
          type="username"
          variant="bordered"
        />
        <Input
          disabled={loading}
          {...register("email", { required: true })}
          validationState={errors.email ? "invalid" : "valid"}
          errorMessage={errors.email && "Insira um email válido"}
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
          validationState={errors.password ? "invalid" : "valid"}
          errorMessage={errors.password && "Senha é obrigatória"}
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
        <Input
          disabled={loading}
          {...register("passwordConfirmation", { required: true })}
          validationState={
            Boolean(errors.passwordConfirmation) ||
            password != passwordConfirmation
              ? "invalid"
              : "valid"
          }
          errorMessage={
            Boolean(errors.passwordConfirmation) ||
            (password != passwordConfirmation && "Senhas não coincidem")
          }
          endContent={
            <svg
              style={{
                color:
                  Boolean(errors.passwordConfirmation) ||
                  password != passwordConfirmation
                    ? "red"
                    : "gray",
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
          label="Confirme sua senha"
          color="primary"
          placeholder="*********"
          type="password"
          variant="bordered"
        />
        <div className="flex-1">
          <Button
            color="primary"
            disabled={loading}
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
            className="w-full"
          >
            {loading ? <LoadingIcon /> : "Cadastre-se"}
          </Button>
        </div>
        <div className="flex py-2 px-1 justify-between">
          <span className="text-sm">Já tem uma conta ?</span>
          <Link color="primary" href="/login" size="sm">
            Faça o login aqui
          </Link>
        </div>
      </div>
    </form>
  );
}
