"use-client";

import { getCategories } from "~/services";

export default async function ListCategories() {
  const categories = await getCategories();

  return (
    <>
      {categories?.map(({ id, nome: categoryName, produtos }) => (
        <details key={id}>
          <summary>{categoryName}</summary>
          <ul>
            {produtos.map(({ id, nome }) => (
              <li key={id}>
                <button>{nome}</button>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </>
  );
}
