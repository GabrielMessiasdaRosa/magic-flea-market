"use client";
import postNewPasswordRequestService from "@/api-handlers/api-services/post-new-password-request";
import { handleRequestNewPasswordStore } from "@/store/handle-request-new-password-store";
import PostNewPasswordRequestSchema from "@/zod/post-new-password-request-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { z } from "zod";

import { Button, Input, Link, Spinner } from "@nextui-org/react";
import MfmBrandLogo from "./mfm-brand-logo";

export interface RecoveryAccFormProps {}

export default function RecoveryAccForm({}: RecoveryAccFormProps) {
  const { status, updateStatus, finished } = handleRequestNewPasswordStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof PostNewPasswordRequestSchema>>({
    resolver: zodResolver(PostNewPasswordRequestSchema),
  });
  const onSubmit = async (
    data: z.infer<typeof PostNewPasswordRequestSchema>,
  ) => {
    updateStatus("pending");
    const res = await postNewPasswordRequestService(data.email);

    if (res.status === 200) {
      updateStatus("success");
      return;
    }
  };

  return (
    <>
      {finished ? (
        <div className="xl:text-gray-800 ">
          <div className="flex flex-col items-center justify-center text-center ">
            <h1 className="text-2xl font-bold md:text-4xl">
              Email de recuperação{" "}
              <span className="text-green-500">enviado</span>!
            </h1>
            <p className="mt-2 text-sm md:text-lg">
              Um email foi enviado para você com instruções de como recuperar
              sua senha
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
                radius="lg"
                size="lg"
                as={"a"}
                href="/login"
                color="primary"
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>

                {`Voltar para o login`}
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
              Digite o email da sua conta para redefinir a senha
            </p>
          </div>
          <div className="flex w-full flex-col gap-3">
            <Input
              radius="lg"
              disabled={status === "pending"}
              {...register("email", { required: true })}
              validationState={errors.email ? "invalid" : "valid"}
              errorMessage={errors.email?.message as string}
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
            <div className="flex-1">
              <Button
                radius="lg"
                color="primary"
                disabled={status === "pending"}
                type="submit"
                className="w-full"
              >
                {status === "pending" ? (
                  <Spinner color="white" />
                ) : (
                  "Enviar email de recuperação"
                )}
              </Button>
            </div>
            <div className="flex justify-end gap-2 px-1 py-2 font-medium">
              <Link color="primary" href="/login" size="sm">
                Voltar para o login
              </Link>
            </div>
          </div>
        </form>
      )}
      <Toaster />
    </>
  );
}
