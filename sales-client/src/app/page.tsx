import { type Metadata } from "next";
import { Suspense } from "react";
import { getCategories } from "~/services";
import {
  CheckoutButton,
  IncrementSelect,
  ListProductsByCategory,
} from "./_components";

export const metadata: Metadata = {
  title: "Afiado - Produtos",
  description: "Lista de produtos disponíveis",
};

export default async function Home() {
  const categoriesData = await getCategories();

  return (
    <main className="flex min-h-screen flex-col items-start justify-start py-2">
      <div className="container flex flex-col items-start justify-start">
        <Suspense fallback={<p>Loading...</p>}>
          <ListProductsByCategory data={categoriesData} />
        </Suspense>
        <div className="fixed bottom-10 flex w-full flex-row justify-start md:justify-center">
          <IncrementSelect />
        </div>
        <div className="fixed bottom-8 right-8">
          <CheckoutButton />
        </div>
      </div>
    </main>
  );
}
