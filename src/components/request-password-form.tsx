"use client";
import { validateEmail } from "@/lib/validate-email";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import LoadingIcon from "./loading-icon";
import { Button, Input, Link } from "./next-ui-exports";

export interface RequestPasswordFormProps {}

export default function RequestPasswordForm({}: RequestPasswordFormProps) {
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [submited, setSubmited] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const onSubmit = async (data: any) => {
    setSubmited(false);
    const isEmailValid = validateEmail(data.email);
    if (!isEmailValid) {
      setError("invalidEmailFormat", {
        type: "manual",
        message: "O email inserido não está em um formato válido",
      });
      setSubmited(true);
      return;
    }
    setLoading(true);
    const res = await fetch("/api/user/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email }),
    });
    setLoading(false);

    const responseMessage =
      {
        [200]: "Verifique a caixa de entrada do seu email",
        [429]:
          "Voce excedeu o limite de requisições, tente novamente mais tarde",
        [500]: "Erro interno",
      }[res.status] || "Erro desconhecido";
    console.log(res.status);
    if (!res.ok) {
      setLoading(false);
      setError("email", {
        type: "manual",
        message: res.statusText,
      });
      setSubmited(true);
      switch (res.status) {
        case 429: {
          toast.error(responseMessage);
          break;
        }
        case 500: {
          toast.error(responseMessage);
          break;
        }
        default: {
          toast.error(responseMessage);
          break;
        }
      }
      return;
    }
    toast.success(responseMessage);
    setIsEmailSent(true);
  };

  React.useEffect(() => {
    clearErrors("email");
    const email = watch("email");
    const isEmailValid = validateEmail(email);
    if (email?.length > 0) {
      if (!isEmailValid && submited) {
        setError("invalidEmailFormat", {
          type: "pattern",
          message: "O email inserido não está em um formato válido",
        });
        return;
      }
    }
  }, [watch("email")]);

  return (
    <>
      {isEmailSent ? (
        <div className="xl:text-gray-800 ">
          <div className="flex flex-col text-center items-center justify-center ">
            <h1 className="text-2xl md:text-4xl font-bold">
              Email de recuperação{" "}
              <span className="text-green-500">enviado</span>!
            </h1>
            <p className="mt-2 text-sm md:text-lg">
              Um email foi enviado para você com instruções de como recuperar
              sua senha
            </p>
            <div
              className={`text-green-500 transition-transform duration-1000 flex  `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-48 h-48  flex items-center justify-center`}
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
                Voltar para o login
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <form className="xl:text-gray-800 flex flex-col gap-4 space-y-10 items-center justify-center  w-3/4 h-full">
          <div className="flex flex-col text-center items-center justify-center ">
            <h1 className="text-2xl md:text-4xl font-bold">Recuperar conta</h1>
            <p className="mt-2 text-sm md:text-lg">
              Digite o email da sua conta para redefinir a senha
            </p>
          </div>
          <div className="flex flex-col w-full gap-3">
            <Input
              disabled={loading}
              {...register("email", { required: true })}
              validationState={
                errors.email || errors.invalidEmailFormat ? "invalid" : "valid"
              }
              errorMessage={
                errors.email
                  ? "Insira um email válido"
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
                  className={`w-6 h-6 ${
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
              placeholder="magic-flea-market@email?.com"
              variant="bordered"
            />
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
                {loading ? <LoadingIcon /> : "Enviar email de recuperação"}
              </Button>
            </div>
            <div className="flex py-2 px-1 justify-end gap-2 font-medium">
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
