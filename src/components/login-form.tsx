"use client";
import { loginRequestStatus } from "@/store/handle-async-login-error";
import LoginSchemaZod from "@/zod/login-schema-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

import { Button, Input, Link, Spinner } from "@nextui-org/react";
import MfmBrandLogo from "./mfm-brand-logo";

export interface LoginFormProps {}

export default function LoginForm({}: LoginFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchemaZod>>({
    resolver: zodResolver(LoginSchemaZod),
  });
  const email = watch("email");
  const password = watch("password");
  const { asyncErrors, status, updateStatus, setAsyncErrors } =
    loginRequestStatus();

  const onSubmit = async (values: z.infer<typeof LoginSchemaZod>) => {
    updateStatus("pending");
    const loginResponse = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (loginResponse?.error === "CredentialsSignin") {
      updateStatus("error");
      toast.error("Verifique seu email e senha");
      return setAsyncErrors({
        email: "Email ou senha incorretos",
        password: "Email ou senha incorretos",
      });
    }

    if (loginResponse?.error === null) {
      updateStatus("success");
      setAsyncErrors({});
      return router.push("/");
    }
  };
  React.useEffect(() => {
    setAsyncErrors({});
  }, [email, password]);
  React.useEffect(() => {
    toast.dismiss();
  }, []);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-3/4 flex-col items-center justify-center gap-4  space-y-10 xl:text-gray-800"
    >
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
          radius="lg"
          {...register("email", { required: true })}
          validationState={
            errors.email || asyncErrors.email ? "invalid" : "valid"
          }
          errorMessage={(errors.email?.message as string) || asyncErrors.email}
          autoFocus
          endContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`h-6 w-6 ${
                errors.email ? "text-rose-500" : "text-gray-500"
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
          radius="lg"
          {...register("password", { required: true })}
          validationState={
            errors.password || asyncErrors.email ? "invalid" : "valid"
          }
          errorMessage={
            (errors.password?.message as string) || asyncErrors.email
          }
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
        <div className="flex-1">
          <Button
            radius="lg"
            color="primary"
            disabled={status === "pending"}
            type="submit"
            className="w-full"
          >
            {status === "pending" ? <Spinner color="white" /> : "Entrar"}
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
      <Toaster />
    </form>
  );
}
