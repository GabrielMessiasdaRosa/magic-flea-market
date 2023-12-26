import AuthCardsShowoff from "@/components/auth-cards-showoff";
import LoginForm from "@/components/login-form";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
export interface LoginPageProps {}

export const metadata: Metadata = {
  title: "mfm | login",
  description:
    "Magic flea market - O lugar ideal para comprar e vender cartas de Magic: The Gathering",
};

export default async function LoginPage({}: LoginPageProps) {
  const session = await useSession();
  if (session?.data?.user) {
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
    <main className="relative flex min-h-screen flex-1 items-center justify-start overflow-hidden text-white  xl:flex">
      <div className="flex min-h-screen w-full flex-col items-center  justify-center bg-black/90 py-8 lg:px-16 xl:w-2/5 xl:bg-white">
        <LoginForm />
      </div>
      <div className="absolute right-0 -z-10 flex h-[400dvh] w-screen flex-col items-center justify-center overflow-hidden bg-black shadow-xl xl:w-3/5">
        <Suspense fallback={<></>}>
          <AuthCardsShowoff cards={cards} />
        </Suspense>
      </div>
    </main>
  );
}
