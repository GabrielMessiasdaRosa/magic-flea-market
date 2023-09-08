import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthCardsShowoff from "@/components/auth-cards-showoff";
import LoginForm from "@/components/login-form";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
export interface LoginPageProps {}

export const metadata: Metadata = {
  title: "mfm | login",
  description:
    "Magic flea market - O lugar ideal para comprar e vender cartas de Magic: The Gathering",
};

export default async function LoginPage({}: LoginPageProps) {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/");
  }
  const cards = await prisma.card.findMany({
    take: 25,
    select: {
      id: true,
      name: true,
    },
  });
  return (
    <main className="text-white flex flex-1 items-center relative xl:flex justify-start min-h-screen  overflow-hidden">
      <div className="flex flex-col lg:px-16 w-full xl:w-2/5  min-h-screen justify-center bg-black/90 xl:bg-white items-center py-8">
        <LoginForm />
      </div>
      <div className="flex flex-col absolute right-0 items-center overflow-hidden justify-center w-screen xl:w-3/5 shadow-xl bg-black h-[400dvh] -z-10">
        <Suspense fallback={<></>}>
          <AuthCardsShowoff cards={cards} />
        </Suspense>
      </div>
    </main>
  );
}
