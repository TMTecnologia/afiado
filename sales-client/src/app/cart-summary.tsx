"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { BsBagCheck } from "react-icons/bs";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { useAtomValue } from "jotai";
import { countItemsOnCart } from "~/lib/atoms";

export default function CartSummary() {
  const [openCart, setOpenCart] = useState(false);
  const itemCount = useAtomValue(countItemsOnCart);

  return (
    <Sheet
      open={openCart}
      onOpenChange={setOpenCart}
    >
      <SheetTrigger asChild>
        <div className="relative">
          <Badge
            className="absolute right-1 top-1"
            variant="secondary"
          >
            {itemCount}
          </Badge>
          <Button className="min-h-fit min-w-fit rounded-s p-8">
            <BsBagCheck size={32} />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col">
        <SheetHeader>
          <SheetTitle>Conferir Pedido</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={(event) => {
            setOpenCart(false);
            event.preventDefault();
          }}
          className="flex flex-1 flex-col"
        >
          {/* TODO: add cart data here
		"operador": "thales", string
		"cliente": "05286680135", input text somente com números
		"pagamento": "fiado", select fiado, pix, dinheiro, cartão de crédito, cartão de débito
          */}
          <SheetFooter className="flex flex-1 flex-col justify-end">
            <Button type="submit">Finalizar Pedido</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
