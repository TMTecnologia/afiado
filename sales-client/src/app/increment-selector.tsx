"use client";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useSetAtom } from "jotai";
import { incrementAtom } from "~/lib/atoms";

export const IncrementSelector = () => {
  const setIncrement = useSetAtom(incrementAtom)

  return (
    <Tabs defaultValue="1" className="min-h-max">
      <TabsList>
        <TabsTrigger
          className="text-3xl md:text-5xl"
          onClick={() => setIncrement(1)}
          value="1"
        >
          +1
        </TabsTrigger>
        <TabsTrigger
          className="text-3xl md:text-5xl"
          onClick={() => setIncrement(2)}
          value="2"
        >
          +2
        </TabsTrigger>
        <TabsTrigger
          className="text-3xl md:text-5xl"
          onClick={() => setIncrement(5)}
          value="5"
        >
          +5
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
