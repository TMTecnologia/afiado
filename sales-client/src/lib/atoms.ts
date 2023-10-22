import { atom } from "jotai";

export const incrementAtom = atom(1);

type Cart = Record<
  number,
  {
    name: string
    amount: number
    price: number
  }
>;

const shoppingCart = atom({} as Cart);
export const countItemsOnCart = atom((get) => {
  const currentCart = get(shoppingCart)
  return Object.keys(currentCart).reduce((acc, key) => acc + (currentCart[Number(key)]?.amount ?? 0), 0)
});
export const readOnlyCart = atom((get) => get(shoppingCart));
export const writeOnlyCart = atom(
  null, // it's a convention to pass `null` for the first argument
  (
    get,
    set,
    update: { id: number, increment: number } & Pick<Cart[number], 'name' | 'price'>,
  ) => {
    const previousCart = get(shoppingCart);
    const previousAmount =
      previousCart[update.id]?.amount ?? 0;
    set(shoppingCart, {
      ...previousCart,
      [update.id]: {
        name: update.name,
        amount: previousAmount + update.increment,
        price: update.price
      },
    });
  },
);
