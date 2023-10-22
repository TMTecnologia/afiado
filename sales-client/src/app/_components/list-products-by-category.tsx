"use client";

import { type getCategories } from "~/services";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { useSetAtom, useAtomValue } from "jotai";
import { writeOnlyCart, incrementAtom } from "~/lib/atoms";
import { useCallback } from "react";

interface ListProductsByCategoryProps {
  data: Awaited<ReturnType<typeof getCategories>>
}

export function ListProductsByCategory({ data: categories }: ListProductsByCategoryProps) {
  const updateCart = useSetAtom(writeOnlyCart);
  const increment = useAtomValue(incrementAtom)
  const handleClick = useCallback(
    (props: Omit<Parameters<typeof updateCart>[0], 'increment'>) => () => updateCart({ ...props, increment }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      increment
    ]
  )

  return (
    <div className="flex-start flex w-full flex-col">
      {categories?.map(({ id, name: categoryName, products }) => (
        <Accordion
          key={id}
          type="single"
          collapsible
        >
          <AccordionItem value={categoryName}>
            <AccordionTrigger className="text-2xl">{categoryName}</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {products.map((props) => (
                  <Button
                    key={props.id}
                    className="text-xl min-h-[8rem] lg:min-w-[16rem] hover:opacity-50 active:opacity-25"
                    onClick={handleClick(props)}
                  >
                    {props.name}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
