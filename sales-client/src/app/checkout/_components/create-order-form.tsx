"use client";

import { Button } from "~/components/ui/button";
import { CartSummaryTable } from "./cart-summary-table";

export function CreateOrderForm() {

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className="flex flex-1 flex-col items-start gap-2"
    >
      <CartSummaryTable />
      {/* TODO: add cart data here
		"operador": string
		"cliente": input text somente com números
		"pagamento": select fiado, pix, dinheiro, cartão de crédito, cartão de débito
       */}
      <div className="flex flex-1 flex-col w-full justify-end">
        <Button type="submit">Finalizar Pedido</Button>
      </div>
    </form>
  );
}

