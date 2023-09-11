"use client";

import { postNewPasswordByToken } from "@/api-handlers/api-hooks/users/use-create-new-password-by-token";
import SetNewPasswordSchemaZod from "@/zod/set-new-password-schema-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { z } from "zod";
import LoadingIcon from "./loading-icon";
import MfmBrandLogo from "./mfm-brand-logo";
import { Button, Input } from "./next-ui-exports";
import PasswordChecker from "./password-checker";

export interface SetNewPasswordRecoveryFormProps {
  token: string;
  email: string;
}

export default function RequestNewRecoveryTokenForm({
  token,
  email,
}: SetNewPasswordRecoveryFormProps) {
  const [isPasswordSent, setIsPasswordSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof SetNewPasswordSchemaZod>>({
    resolver: zodResolver(SetNewPasswordSchemaZod),
  });
  const password = watch("password");
  const { fetch, pending } = postNewPasswordByToken();
  const onSubmit = async (data: z.infer<typeof SetNewPasswordSchemaZod>) => {
    const dataWithToken = {
      newPassword: data.password,
      token,
      email,
    };
    setIsLoading(true);

    route.prefetch("/login");
    fetch(dataWithToken);
    setIsPasswordSent(true);
  };

  return (
    <>
      {isPasswordSent ? (
        <div className="xl:text-gray-800">
          <div className="flex flex-col items-center justify-center text-center ">
            <h1 className="text-2xl font-bold md:text-4xl">
              Senha alterada com <span className="text-green-500">sucesso</span>
              !
            </h1>
            <p className="mt-2 text-sm md:text-lg">
              Sua senha foi alterada com sucesso, você já pode fazer login com
              sua nova senha.
            </p>
            <div
              className={`flex text-green-500 transition-transform duration-1000  `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`flex h-48  w-48 items-center justify-center`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <Button
                size="lg"
                as={"a"}
                href="/login"
                color="primary"
                className="text-white"
              >
                {`< Voltar para o login`}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full w-3/4 flex-col items-center justify-center gap-4  space-y-10 xl:text-gray-800"
        >
          <div className="flex flex-col items-center justify-center text-center ">
            <span className="text-2xl font-light md:text-4xl">
              <MfmBrandLogo fontDefinition="text-white xl:text-primary-950" />
            </span>
            <h1 className="text-2xl font-bold md:text-4xl">Recuperar conta</h1>
            <p className="mt-2 text-sm md:text-lg">
              Escolha uma nova senha para sua conta
            </p>
          </div>
          <div className="flex w-full flex-col gap-3">
            <Input
              disabled={isLoading}
              {...register("password", { required: true })}
              validationState={errors?.password ? "invalid" : "valid"}
              errorMessage={(errors?.password?.message as string) || undefined}
              endContent={
                <svg
                  className={`h-6 w-6 ${
                    errors?.password ? "text-rose-500" : "text-gray-500"
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
              label="Nova senha"
              color="primary"
              placeholder="*********"
              type="password"
              variant="flat"
            />{" "}
            <Input
              disabled={isLoading}
              {...register("confirmPassword", { required: true })}
              validationState={
                Boolean(errors?.confirmPassword) ? "invalid" : "valid"
              }
              errorMessage={
                (errors?.confirmPassword?.message as string) || undefined
              }
              endContent={
                <svg
                  className={`h-6 w-6 ${
                    Boolean(errors?.confirmPassword)
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
              label="Confirme sua nova senha"
              color="primary"
              placeholder="*********"
              type="password"
              variant="flat"
            />
            <PasswordChecker key={password} password={password} />
            <div className="mt-4 flex flex-1 flex-col gap-4">
              <Button
                type="submit"
                color="primary"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? <LoadingIcon /> : "Atualizar senha"}
              </Button>
            </div>
          </div>
          <Toaster />
        </form>
      )}
    </>
  );
}
