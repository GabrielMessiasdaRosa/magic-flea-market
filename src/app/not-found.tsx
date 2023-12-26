import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-8 text-center sm:px-20">
      <h2 className="text-5xl font-black sm:text-7xl ">
        404 - Ooops, parece que esta página não existe
      </h2>
      <p className="py-6 text-7xl font-black">😵</p>
      <p className="dm:text-3xl pb-16">
        Não encontramos a página que você está procurando
      </p>
      <Button color="primary" size="lg">
        <Link className="!w-24" href="/">
          {`<`} Voltar
        </Link>
      </Button>
    </div>
  );
}
