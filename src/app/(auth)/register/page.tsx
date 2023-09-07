import AuthCardsShowoff from "@/components/auth-cards-showoff";
import RegisterForm from "@/components/register-form";
import prisma from "@/lib/prisma";
export interface RegisterPageProps {}

export default async function RegisterPage({}: RegisterPageProps) {
  const cards = await prisma.card.findMany({
    take: 25,
  });

  return (
    <main className=" flex w-full items-center justify-center h-screen overflow-hidden">
      <div className="px-8 lg:px-16 flex flex-col w-full flex-1 max-w-3xl h-screen justify-center ">
        <RegisterForm />
      </div>
      <div className="hidden relative lg:flex flex-col items-center overflow-hidden justify-center  shadow-xl  bg-black flex-1 h-screen">
        <AuthCardsShowoff cards={cards} />
      </div>
    </main>
  );
}
