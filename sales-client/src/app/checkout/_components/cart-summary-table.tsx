"use client";

import { Button } from "~/components/ui/button";
import { BsTrash3 } from "react-icons/bs";
import { useAtomValue, useSetAtom } from "jotai";
import { countItemsOnCart, readOnlyCart, writeOnlyCart } from "~/lib/atoms";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const currencyFormatter = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export function CartSummaryTable() {
  const cartData = useAtomValue(readOnlyCart);
  const cartItemCount = useAtomValue(countItemsOnCart);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="uppercase"></TableHead>
          <TableHead className="uppercase">nome</TableHead>
          <TableHead className="uppercase">valor</TableHead>
          <TableHead className="uppercase">deletar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.values(cartData).map(({ name, amount, price }) => (
          <TableRow key={name}>
            <TableCell className="w-10 p-0 font-medium">
              <Input
                name={`${name}-amount`}
                type="number"
                defaultValue={amount}
                className="min-w-[4rem] max-w-[10rem]"
                min={1}
                onChange={(e) => console.log("update", e.target.value)}
              />
            </TableCell>
            <TableCell className="max-w-0">
              <p className="items-center overflow-hidden overflow-ellipsis whitespace-nowrap">
                {name}
              </p>
            </TableCell>
            <TableCell className="max-w-0">
              {`${currencyFormatter(
                price,
              )} x ${amount} = ${currencyFormatter(price * amount)}`}
            </TableCell>
            <TableCell className="w-10">
              <Button
                variant="ghost"
                className="hover:bg-red-500/50 hover:text-white active:bg-red-500"
                onClick={() => console.log("remove")}
              >
                <BsTrash3 size={20} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {cartItemCount === 0 && (
        <TableCaption className="p-8">
          Inclua produtos no pedido atual para visualizar aqui
        </TableCaption>
      )}
    </Table>
  );
}

