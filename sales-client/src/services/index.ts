import path from "path";
import { env } from "~/env.mjs";

const API_URL = new URL(env.NEXT_PUBLIC_API_URL);

type StrapiGetCategories = {
  data: Array<{
    id: number;
    attributes: {
      nome: string;
      produtos: {
        data: Array<{
          id: number;
          attributes: {
            nome: string;
            preco: number;
          };
        }>;
      };
    };
  }>;
};

export async function getCategories() {
  const categoriesRoute = new URL(
    path.join(API_URL.pathname, "categorias"),
    API_URL.origin,
  );

  categoriesRoute.searchParams.append("populate[0]", "produtos");
  categoriesRoute.searchParams.append("fields[0]", "nome");
  categoriesRoute.searchParams.append("populate[produtos][fields][0]", "nome");
  categoriesRoute.searchParams.append("populate[produtos][fields][1]", "preco");

  const categories = await fetch(categoriesRoute.href, {
    headers: {
      Authorization: `Bearer ${env.NEXT_PUBLIC_API_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((response) =>
      (response as StrapiGetCategories).data.map(({ id, attributes }) => ({
        id,
        nome: attributes.nome,
        produtos: attributes.produtos.data.map(({ id, attributes }) => ({
          id,
          ...attributes,
        })),
      })),
    );

  return categories;
}
