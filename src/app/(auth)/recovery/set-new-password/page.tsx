import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthCardsShowoff from "@/components/auth-cards-showoff";
import RequestNewRecoveryTokenForm from "@/components/request-new-recovery-token-form";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "mfm | nova senha",
  description:
    "Magic flea market - O lugar ideal para comprar e vender cartas de Magic: The Gathering",
};

export default async function PasswordRecoveryPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/");
  }
  const cards = await prisma.card.findMany({
    take: 25,
  });
  const email = searchParams.email as string;
  const token = searchParams.token as string;
  return (
    <main className="text-white flex flex-1 items-center relative xl:flex justify-start min-h-screen  overflow-hidden">
      <div className="flex flex-col lg:px-16 w-full xl:w-2/5  min-h-screen justify-center bg-black/90 xl:bg-white items-center py-8">
        <Suspense fallback={<div>Carregando credenciais ...</div>}>
          <RequestNewRecoveryTokenForm email={email} token={token} />
        </Suspense>
      </div>
      <div className="flex flex-col absolute right-0 items-center overflow-hidden justify-center w-screen xl:w-3/5 shadow-xl bg-black h-[400dvh] -z-10">
        <Suspense fallback={<></>}>
          <AuthCardsShowoff cards={cards} />
        </Suspense>
      </div>
    </main>
  );
}
