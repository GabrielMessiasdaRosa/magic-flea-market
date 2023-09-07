import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthCardsShowoff from "@/components/auth-cards-showoff";
import LoginForm from "@/components/login-form";
import LogoutButton from "@/components/logout-button";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export interface LoginPageProps {}

export default async function LoginPage({}: LoginPageProps) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  const cards = await prisma.card.findMany({
    take: 25,
  });
  return (
    <main className=" flex w-full items-center justify-center h-screen overflow-hidden">
      {session?.user ? (
        <div className="absolute top-0 right-0 bg-white p-4">
          <h1 className="text-2xl font-bold">Bem vindo, {session.user.name}</h1>
          <p className="text-lg">Você está logado como {session.user.email}</p>
          <p>Voce esta no plano {session?.user.plan.type}</p>
          <LogoutButton />
        </div>
      ) : null}
      <div className="px-8 lg:px-16 flex flex-col w-full flex-1 max-w-3xl h-screen justify-center ">
        <LoginForm />
      </div>
      <div className="hidden relative lg:flex flex-col items-center overflow-hidden justify-center  shadow-xl  bg-black flex-1 h-screen">
        <AuthCardsShowoff cards={cards} />
      </div>
    </main>
  );
}
