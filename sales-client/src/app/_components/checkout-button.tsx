"use client";

import { Button } from "~/components/ui/button";
import { BsBagCheck } from "react-icons/bs";
import { Badge } from "~/components/ui/badge";
import { useAtomValue } from "jotai";
import { countItemsOnCart } from "~/lib/atoms";
import Link from "next/link";

export function CheckoutButton() {
  const itemCount = useAtomValue(countItemsOnCart);

  return (
    <div className="relative">
      {itemCount > 0 && (
        <Badge
          className="absolute right-1 top-1"
          variant="secondary"
        >
          {itemCount}
        </Badge>
      )}
      <Button className="min-h-fit min-w-fit rounded-s p-8">
        <Link href={'/checkout'}>
          <BsBagCheck size={32} />
        </Link>
      </Button>
    </div>
  );
}
