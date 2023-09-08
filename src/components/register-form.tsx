"use client";
import { validPassword } from "@/lib/validate-password";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import LoadingIcon from "./loading-icon";
import { Button, Input, Link } from "./next-ui-exports";
import PasswordChecker from "./password-checker";

export interface RegisterFormProps {}

export default function RegisterForm({}: RegisterFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const errorMessage =
      {
        [201]: "Usuário criado! Redirecionando para a home page",
        [409]: "Email já cadastrado",
        [500]: "Erro interno",
      }[res.status] || "Erro desconhecido";
    if (!res.ok) {
      setLoading(false);
      switch (res.status) {
        case 409: {
          toast.error(errorMessage);
          setError("email", {
            message: errorMessage,
          });
          break;
        }
        case 500: {
          toast.error(errorMessage);
          break;
        }
        default: {
          toast.error(errorMessage);
          break;
        }
      }
      return;
    }
    const loginResponse = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setLoading(false);
    if (loginResponse?.error === null) {
      return router.push("/");
    }
  };

  React.useEffect(() => {
    clearErrors("username");
    const usernameBannedCharacters = /[^a-zA-Z0-9_-]/g;
    const username = watch("username");
    // username validation

    if (username.length > 0 && username.length < 3) {
      setError("username", {
        type: "minLength",
        message: "Nome de usuário deve ter no mínimo 3 caracteres",
      });
      return;
    }
    if (username.length > 20) {
      setError("username", {
        type: "maxLength",
        message: "Nome de usuário deve ter no máximo 20 caracteres",
      });
      return;
    }
    if (username.match(usernameBannedCharacters)) {
      setError("username", {
        type: "pattern",
        message:
          "Nome de usuário deve conter apenas letras, números, hífens e underscores",
      });
      return;
    }
  }, [watch("username")]);

  React.useEffect(() => {
    clearErrors("email");
  }, [watch("email")]);

  React.useEffect(() => {
    clearErrors("password");
    clearErrors("invalidEmailFormat");
    const password = watch("password");
    const passwordConfirmation = watch("passwordConfirmation");

    if (passwordConfirmation.length > 0 && password.length > 0) {
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

    if (passwordConfirmation.length > 0 && password.length > 0) {
      if (passwordConfirmation !== password) {
        setError("passwordConfirmation", {
          type: "manual",
          message: "As senhas não coincidem",
        });
      }
    }
  }, [watch("passwordConfirmation")]);

  return (
    <form className="xl:text-gray-800 flex flex-col gap-4 space-y-10 items-center justify-center  w-3/4 h-full">
      <div className="flex flex-col text-center items-center justify-center ">
        <h1 className="text-2xl md:text-4xl font-bold">Registre-se</h1>
        <p className="mt-2 text-sm md:text-lg">
          É de graça e voce tem acesso a uma lista de ofertas exclusivas!
        </p>
      </div>
      <div className="flex flex-col w-full gap-3">
        <Input
          disabled={loading}
          autoFocus
          {...register("username", { required: true })}
          validationState={errors.username ? "invalid" : "valid"}
          errorMessage={(errors.username?.message as string) || undefined}
          endContent={
            <svg
              className={`w-6 h-6 ${
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
          disabled={loading}
          {...register("email", { required: true })}
          validationState={
            errors.email || errors.invalidEmailFormat ? "invalid" : "valid"
          }
          errorMessage={
            errors.email
              ? (errors.email.message as string)
              : errors.invalidEmailFormat &&
                (errors.invalidEmailFormat.message as string)
          }
          autoFocus
          endContent={
            <svg
              className={`w-6 h-6 ${
                errors.email || errors.invalidEmailFormat
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
            errors.password || errors.passwordConfirmation ? "invalid" : "valid"
          }
          errorMessage={(errors.password?.message as string) || undefined}
          endContent={
            <svg
              className={`w-6 h-6 ${
                errors.password || errors.passwordConfirmation
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
        <Input
          disabled={loading}
          {...register("passwordConfirmation", { required: true })}
          validationState={
            Boolean(errors.passwordConfirmation) ? "invalid" : "valid"
          }
          errorMessage={
            (errors.passwordConfirmation?.message as string) || undefined
          }
          endContent={
            <svg
              className={`w-6 h-6 ${
                Boolean(errors.passwordConfirmation)
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
        <div className="flex-1 mt-4">
          <Button
            color="primary"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              let username = e.currentTarget.form?.username.value;
              let email = e.currentTarget.form?.email.value;
              let password = e.currentTarget.form?.password.value;
              let passwordConfirmation =
                e.currentTarget.form?.passwordConfirmation.value;

              // username validation
              if (username.length === 0) {
                setError("username", {
                  type: "required",
                  message: "Nome de usuário é obrigatório",
                });
              }
              // email validation
              if (email.length === 0) {
                setError("email", {
                  type: "required",
                  message: "Email é obrigatório",
                });
              }
              // password validation
              if (password.length === 0) {
                setError("password", {
                  type: "required",
                  message: "Senha é obrigatória",
                });
              }
              // password confirmation validation
              if (passwordConfirmation.length === 0) {
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
                !Boolean(errors.username) &&
                !Boolean(errors.email) &&
                !Boolean(errors.password) &&
                !Boolean(errors.passwordConfirmation)
              ) {
                clearErrors();
                handleSubmit(onSubmit)();
              }
            }}
            className="w-full"
          >
            {loading ? <LoadingIcon /> : "Cadastre-se"}
          </Button>
        </div>
        <div className="flex py-2 px-1 justify-end gap-2 font-medium">
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
