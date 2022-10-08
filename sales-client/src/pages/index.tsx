import { useMutation, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import { env } from "../env/client.mjs";

type Produto = {
  id: string;
  attributes: {
    nome: string;
    preco: number;
    quantidade: number;
  };
}
interface CartItem {id: string; quantity: number; price: number}
interface ShoppingCart {[nome: string]: CartItem}

async function getProdutos(){
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/produtos`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const Home: NextPage = () => {
  const data = useSession();
  type dataType = typeof data;
  const query = useQuery<{data: Produto[]}| undefined>(['produtos'], getProdutos);
  const [increment, setIncrement] = useState(1);
  const [clientName, setClientName] = useState('');
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>({});
  const [showCart, setShowCart] = useState(false);
  const { mutateAsync } = useMutation(({product, operatorName}:{product: CartItem, operatorName: string}) => {
    const url = `${env.NEXT_PUBLIC_API_URL}/pedidos`
    return fetch(url, {
      method: 'POST',
      headers:{
        Authorization: `Bearer ${env.NEXT_PUBLIC_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          preco: product.price,
          quantidade: product.quantity,
          produto: product.id,
          cliente: clientName,
          operador: operatorName
        }
      })
    })
  })

  const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format
  function isAuthenticaded({status}: dataType){
    return status === "authenticated"
  }

  function userAvatar({data}: dataType) {
    if (!data)
      return (
        <div className="avatar placeholder mr-8">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
            <span className="text-xl text-bold">AA</span>
          </div>
        </div>
      )

    return (
      <div className="flex flex-col align-items justify-center">
        <picture className="flex align-items justify-center">
            <img
              className="rounded-full"
              src={data.user?.image ?? ''}
              alt={`Foto de Perfil do usuário ${data.user?.name}`}
              width={50}
              height={50}
            />
        </picture>
        <figcaption>{data.user?.name}</figcaption>
      </div>
    );
  } 

  function Navbar({data}: {data: dataType}){
    return (
    <nav className="flex gap-2 py-10 min-w-full justify-end mr-16">
      {
      isAuthenticaded(data) 
        ? <button className="btn text-xl" onClick={() => signOut()}>SAIR</button>
        : <button className="btn text-xl" onClick={() => signIn('google')}>LOGAR</button>
      }
      {userAvatar(data)}
    </nav>
    );
  }

  async function handleCheckout(){
    const responses = await Promise.all(Object.keys(shoppingCart).map((key) => {
      return mutateAsync({
        product: {...shoppingCart[key]} as CartItem,
        operatorName: data.data?.user?.name ?? "USUÁRIO NÃO LOGADO"
      })
    }))
    if(!responses.every((response) => response.ok)) return;
    setShowCart(false)
    setShoppingCart({} as ShoppingCart)
    setClientName('')
  }

  function CartCount(){
    const count = Object.values(shoppingCart)
                        .reduce((acc, curr) => {
                          return acc + curr.quantity
                        },0)
    if (count <= 0) return <></>
    return (
      <span className="badge badge-secondary rounded-full ml-2">
        +{count}
      </span>
    )
  }

  if(showCart){
    return (
      <div className="h-screen flex flex-col">
        <Head>
          <title>Carrinho</title>
          <meta name="description" content="Conferir e Finalizar o pedido" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="mr-8">
          <Navbar data={data}/>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center p-4 mx-auto">
          <ul className="grid grid-cols-1 gap-4">
            {
              Object.keys(shoppingCart).map((productName) => {
                const product = shoppingCart[productName]! // eslint-disable-line @typescript-eslint/no-non-null-assertion
                function handleDelete(name: string){
                  function filterOutKey(source: ShoppingCart, target: string){
                    return Object.keys(source)
                                  .filter((key) => key != target)
                                  .reduce((obj, key) => {
                                    return Object.assign(obj, {
                                      [key]: source[key]
                                    });
                                  }, {} as ShoppingCart);
                  }

                  return () => setShoppingCart((old) => filterOutKey(old, name));
                }

                return (
                  <li key={product.id}>
                    <button
                      className="btn hover:bg-red-600 align-middle mr-2"
                      onClick={handleDelete(productName)}
                    >
                      <picture>
                        <img src="/trash.svg" alt="Lixeira" className="w-10"/>
                      </picture>
                    </button>
                    <input
                      className="input input-bordered input-secondary w-20 align-middle mr-2"
                      placeholder={product.quantity.toString()}
                      type="number" min="1" inputMode="numeric"
                      onChange={(e) => {
                        const value = Number(e.target.value.trim())
                        if(value <= 0) return;
                        setShoppingCart((source) => {
                          return Object.keys(source).reduce((acc, name) => {
                            const currProduct = source[name]! // eslint-disable-line @typescript-eslint/no-non-null-assertion
                            return Object.assign(acc, {
                              [name]: {
                                ...currProduct,
                                quantity: name != productName ? currProduct.quantity : value
                              }
                            });
                          }, {} as ShoppingCart)
                        })
                      }}
                    />
                    <span className="text-lg">
                      {currencyFormatter(product.price)}
                      {" "}
                      {productName}
                    </span>
                  </li>
                )
              })
            }
          </ul>
        </main>
        <footer className="w-screen">
            <div className="flex justify-center items-center">
              <input
                type="text"
                placeholder="Cliente"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <button
              className="btn btn-outline btn-block my-4"
              onClick={() => setShowCart(false)}
            >
              <span className="text-xl text-bold">
                Voltar
              </span>
            </button>
            <button
              className="btn btn-outline btn-block"
              onClick={handleCheckout}
            >
              <span className="text-xl text-bold">
                Finalizar Compra
              </span>
              <span className="badge badge-secondary rounded-full ml-2">
                {
                  currencyFormatter(
                    Object.values(shoppingCart).reduce((acc, curr) => acc + curr.quantity * curr.price,0)
                  )
                }
              </span>
            </button>
        </footer>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Nova Venda</title>
        <meta name="description" content="Cadastrar uma nova venda no estoque" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex flex-col items-center justify-center">
        <Navbar data={data}/>
        <div className="btn-group pb-4">
          <button className={`btn ${increment === 1 && 'btn-accent'}`} onClick={() => setIncrement(1)}>+1</button>
          <button className={`btn ${increment === 2 && 'btn-accent'}`} onClick={() => setIncrement(2)}>+2</button>
          <button className={`btn ${increment === 5 && 'btn-accent'}`} onClick={() => setIncrement(5)}>+5</button>
        </div>
      </header>
      <main className="flex flex-1 overflow-auto items-center justify-center">
        <ul className="mt-40 mb-10 grid gap-5 md:mt-0 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {query.data?.data.map(produto => {
            function handleAddToCart(id: string, name: string, price: number){
              return () => isAuthenticaded(data) && setShoppingCart((old) => {
                const quantity = old[name]?.quantity ?? 0;
                return {...old, [name]: {id, quantity: quantity + increment, price}}
              })
            }

            return (<li key={produto.id}>
              <button
                className='btn w-full h-40 p-auto btn-lg shadow-xl'
                onClick={handleAddToCart(produto.id, produto.attributes.nome, produto.attributes.preco)}
              >
                {produto.attributes.nome}
              </button>
            </li>)
          })}
        </ul>
      </main>
      <footer className="w-screen">
          <button
            className="btn btn-outline btn-block"
            disabled={!isAuthenticaded(data)}
            onClick={() => setShowCart(true)}
          >
            <span className="text-xl text-bold">
              Carrinho
            </span>
            <CartCount />
          </button>
        </footer>
    </div>
  );
};

export default Home;