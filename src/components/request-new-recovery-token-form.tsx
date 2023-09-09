"use client";
import { validPassword } from "@/lib/validate-password";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
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
  const [loading, setLoading] = useState(false);

  const [isPasswordSent, setIsPasswordSent] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data: any) => {
    const dataWithToken = {
      newPassword: data.password,
      token,
      email,
    };
    setLoading(true);
    const res = await fetch("/api/user/forgot-password/set-new", {
      method: "POST",
      body: JSON.stringify(dataWithToken),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseMessage =
      {
        [200]: "Senha atualizada!",
        [400]: "Link de recuperação de senha expirado ou inválido.",
        [500]: "Erro interno",
      }[res.status] || "Erro desconhecido";
    if (!res.ok) {
      setLoading(false);
      switch (res.status) {
        case 500: {
          toast.error(responseMessage);
          break;
        }
        case 400: {
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
    setIsPasswordSent(true);
  };

  React.useEffect(() => {
    clearErrors("password");
    clearErrors("invalidEmailFormat");
    const password = watch("password");
    const passwordConfirmation = watch("passwordConfirmation");

    if (passwordConfirmation?.length > 0 && password.length > 0) {
      if (passwordConfirmation !== password) {
        setError("passwordConfirmation", {
          type: "manual",
          message: "As senhas não coincidem",
        });
      }
      if (!validPassword(password)) {
        setError("password", {
          type: "pattern",
        });
        setError("invalidEmailFormat", {
          type: "pattern",
        });
      }
    }
  }, [watch("password")]);

  React.useEffect(() => {
    clearErrors("passwordConfirmation");
    const password = watch("password");
    const passwordConfirmation = watch("passwordConfirmation");

    if (passwordConfirmation?.length > 0 && password.length > 0) {
      if (passwordConfirmation !== password) {
        setError("passwordConfirmation", {
          type: "manual",
          message: "As senhas não coincidem",
        });
      }
    }
  }, [watch("passwordConfirmation")]);

  return (
    <>
      {isPasswordSent ? (
        <div className="xl:text-gray-800">
          <div className="flex flex-col text-center items-center justify-center ">
            <h1 className="text-2xl md:text-4xl font-bold">
              Senha alterada com <span className="text-green-500">sucesso</span>
              !
            </h1>
            <p className="mt-2 text-sm md:text-lg">
              Sua senha foi alterada com sucesso, você já pode fazer login com
              sua nova senha.
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
                {`< Voltar para o login`}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <form className="xl:text-gray-800 flex flex-col gap-4 space-y-10 items-center justify-center  w-3/4 h-full">
          <div className="flex flex-col text-center items-center justify-center ">
            <span className="text-2xl md:text-4xl font-light">
              <MfmBrandLogo fontDefinition="text-white lg:text-primary-950"  />
            </span>
            <h1 className="text-2xl md:text-4xl font-bold">Recuperar conta</h1>
            <p className="mt-2 text-sm md:text-lg">
              Escolha uma nova senha para sua conta
            </p>
          </div>
          <div className="flex flex-col w-full gap-3">
            <Input
              disabled={loading}
              {...register("password", { required: true })}
              validationState={
                errors?.password || errors?.passwordConfirmation
                  ? "invalid"
                  : "valid"
              }
              errorMessage={(errors?.password?.message as string) || undefined}
              endContent={
                <svg
                  className={`w-6 h-6 ${
                    errors?.password || errors?.passwordConfirmation
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
              label="Nova senha"
              color="primary"
              placeholder="*********"
              type="password"
              variant="flat"
            />{" "}
            <Input
              disabled={loading}
              {...register("passwordConfirmation", { required: true })}
              validationState={
                Boolean(errors?.passwordConfirmation) ? "invalid" : "valid"
              }
              errorMessage={
                (errors?.passwordConfirmation?.message as string) || undefined
              }
              endContent={
                <svg
                  className={`w-6 h-6 ${
                    Boolean(errors?.passwordConfirmation)
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
            <div className="flex-1 mt-4 flex flex-col gap-4">
              <Button
                color="primary"
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  let password = e.currentTarget.form?.password.value;
                  let passwordConfirmation =
                    e.currentTarget.form?.passwordConfirmation?.value;

                  // password validation
                  if (password.length === 0) {
                    setError("password", {
                      type: "required",
                      message: "Senha é obrigatória",
                    });
                  }
                  // password confirmation validation
                  if (passwordConfirmation?.length === 0) {
                    setError("passwordConfirmation", {
                      type: "required",
                      message: "Confirmação de senha é obrigatória",
                    });
                  } else if (passwordConfirmation !== password) {
                    setError("passwordConfirmation", {
                      type: "manual",
                      message: "As senhas não coincidem",
                    });
                  }

                  if (
                    !Boolean(errors?.username) &&
                    !Boolean(errors?.email) &&
                    !Boolean(errors?.password) &&
                    !Boolean(errors?.passwordConfirmation)
                  ) {
                    clearErrors();
                    handleSubmit(onSubmit)();
                  }
                }}
                className="w-full"
              >
                {loading ? <LoadingIcon /> : "Atualizar senha"}
              </Button>
              <Button
                as="a"
                href="/"
                className="w-full"
              >{`Ir para a Home`}</Button>
            </div>
          </div>
          <Toaster />
        </form>
      )}
    </>
  );
}
