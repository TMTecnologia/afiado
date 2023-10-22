import { type Metadata } from "next";
import { CreateOrderForm } from "./_components";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { MdArrowBackIosNew } from "react-icons/md";

export const metadata: Metadata = {
  title: "Afiado - Criar Pedido",
  description: "Confira os dados antes de enviar o pedido",
};

export default function CartSummary() {
  return (
    <main className="container flex min-h-screen flex-col items-start justify-start py-8">
      <div className="flex w-full flex-1 flex-col">
        <div className="flex justify-start gap-2">
          <Button asChild>
            <Link href="/">
              <MdArrowBackIosNew size={20} />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold ">Conferir Pedido</h1>
        </div>
        <CreateOrderForm />
      </div>
    </main>
  );
}
