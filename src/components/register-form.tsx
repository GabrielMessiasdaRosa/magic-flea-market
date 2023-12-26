"use client";
import { useCreateUser } from "@/api-handlers/api-hooks/users/use-create-new-user";
import CreateUserSchemaZod from "@/zod/create-user-schema-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import * as z from "zod";

import { Button, Input, Link, Spinner } from "@nextui-org/react";
import MfmBrandLogo from "./mfm-brand-logo";
import PasswordChecker from "./password-checker";

export interface RegisterFormProps {}

export default function RegisterForm({}: RegisterFormProps) {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof CreateUserSchemaZod>>({
    resolver: zodResolver(CreateUserSchemaZod),
  });
  const password = watch("password");
  const { fetch, pending } = useCreateUser();
  const onSubmit = async (values: z.infer<typeof CreateUserSchemaZod>) => {
    route.prefetch("/login");
    fetch(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-3/4 flex-col items-center justify-center gap-4  space-y-10 xl:text-gray-800"
    >
      <div className="flex flex-col items-center justify-center text-center ">
        {" "}
        <span className="pb-6 text-2xl font-light md:text-4xl">
          <MfmBrandLogo fontDefinition="text-white xl:text-primary-950" />
        </span>
        <h1 className="text-2xl font-bold md:text-4xl">Crie sua conta</h1>
        <p className="mt-2 text-sm md:text-lg">
          É de graça e você tem acesso a uma lista de ofertas exclusívas!
        </p>
      </div>
      <div className="flex w-full flex-col gap-3">
        <Input
          radius="lg"
          disabled={pending === "loading"}
          autoFocus
          {...register("username", { required: true })}
          validationState={errors.username ? "invalid" : "valid"}
          errorMessage={(errors.username?.message as string) || undefined}
          endContent={
            <svg
              className={`h-6 w-6 ${
                errors.username ? "text-rose-500" : "text-gray-500"
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
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
          label="Nome de usuário"
          color="primary"
          placeholder="_jo2uke-higashikata_"
          type="username"
          variant="flat"
        />
        <Input
          radius="lg"
          disabled={pending === "loading"}
          {...register("email", { required: true })}
          autoFocus
          validationState={errors.email ? "invalid" : "valid"}
          errorMessage={(errors.email?.message as string) || undefined}
          endContent={
            <svg
              className={`h-6 w-6 ${
                errors.email ? "text-rose-500" : "text-gray-500"
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
          radius="lg"
          disabled={pending === "loading"}
          {...register("password", { required: true })}
          validationState={errors.password ? "invalid" : "valid"}
          errorMessage={(errors.password?.message as string) || undefined}
          endContent={
            <svg
              className={`h-6 w-6 ${
                errors.password ? "text-rose-500" : "text-gray-500"
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
        <Input
          radius="lg"
          disabled={pending === "loading"}
          {...register("confirmPassword", { required: true })}
          validationState={errors.confirmPassword ? "invalid" : "valid"}
          errorMessage={
            (errors.confirmPassword?.message as string) || undefined
          }
          endContent={
            <svg
              className={`h-6 w-6 ${
                Boolean(errors.confirmPassword)
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
          label="Confirme sua senha"
          color="primary"
          placeholder="*********"
          type="password"
          variant="flat"
        />
        <PasswordChecker key={password} password={password} />
        <div className="mt-4 flex-1">
          <Button
            radius="lg"
            type="submit"
            color="primary"
            disabled={pending === "loading"}
            className="w-full"
          >
            {pending === "loading" ? <Spinner color="white" /> : "Criar conta"}
          </Button>
        </div>
        <div className="flex justify-end gap-2 px-1 py-2 font-medium">
          <span className="text-sm">Já tem uma conta?</span>
          <Link color="primary" href="/login" size="sm">
            Faça o login aqui
          </Link>
        </div>
      </div>
      <Toaster />
    </form>
  );
}
