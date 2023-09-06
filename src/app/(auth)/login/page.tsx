import LoginCardsShowoff from "@/components/login-cards-showoff";
import LoginForm from "@/components/login-form";
import prisma from "@/lib/prisma";
export interface LoginPageProps {}

export default async function LoginPage({}: LoginPageProps) {
  const cards = await prisma.card.findMany({
    take: 25,
  });
  if (!cards) return <></>;
  return (
    <main className=" flex w-full items-center justify-center h-screen overflow-hidden">
      <div className="px-8 lg:px-16 flex flex-col w-full lg:w-1/3 h-screen justify-center ">
        <LoginForm />
      </div>
      <div className="hidden relative lg:flex flex-col items-center overflow-hidden justify-center  shadow-xl  bg-black w-2/3 h-screen">
        <LoginCardsShowoff cards={cards} />
      </div>
    </main>
  );
}
