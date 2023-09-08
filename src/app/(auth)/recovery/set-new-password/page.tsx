import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthCardsShowoff from "@/components/auth-cards-showoff";
import SetNewPasswordRecoveryForm from "@/components/set-new-password-recovery-form";
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
  console.log(searchParams);
  const email = searchParams.email as string;
  const token = searchParams.token as string;
  return (
    <main className="text-white flex flex-1  items-center relative xl:flex justify-center h-screen  overflow-hidden">
      <div className=" flex flex-col lg:px-16 w-full xl:w-2/5  h-screen justify-center bg-black/90 xl:bg-white items-center ">
        <Suspense fallback={<div>Carregando credenciais ...</div>}>
          <SetNewPasswordRecoveryForm email={email} token={token} />
        </Suspense>
      </div>
      <div className="flex flex-col absolute xl:static  items-center overflow-hidden justify-center w-full xl:w-3/5 shadow-xl bg-black h-screen flex-1 -z-10">
        <AuthCardsShowoff cards={cards} />
      </div>
    </main>
  );
}
