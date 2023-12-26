import { authOptions } from "@/app/api/(lib)/auth-option";
import AuthCardsShowoff from "@/components/auth-cards-showoff";
import RegisterForm from "@/components/register-form";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
export interface RegisterPageProps {}
export const metadata: Metadata = {
  title: "mfm | cadastro",
  description:
    "Magic flea market - Cadastre-se e comece a negociar suas cartas de Magic: The Gatherin aqui!",
};
export default async function RegisterPage({}: RegisterPageProps) {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/");
  }
  const cards = await prisma.card.findMany({
    take: 25,
  });
  return (
    <main className="relative flex min-h-screen flex-1 items-center justify-start overflow-hidden text-white  xl:flex">
      <div className="flex min-h-screen w-full flex-col items-center  justify-center bg-black/90 py-8 lg:px-16 xl:w-2/5 xl:bg-white">
        <RegisterForm />
      </div>
      <div className="absolute right-0 -z-10 flex h-[400dvh] w-screen flex-col items-center justify-center overflow-hidden bg-black shadow-xl xl:w-3/5">
        <Suspense fallback={<></>}>
          <AuthCardsShowoff cards={cards} />
        </Suspense>
      </div>
    </main>
  );
}
