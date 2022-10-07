import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useSession, signIn, signOut } from 'next-auth/react';

type Produto = {
  id: string;
  attributes: {
    nome: string;
    preco: number;
    quantidade: number;
  };
}

interface ShoppingCart {[nome: string]: {id: string; quantity: number; price: number}}

async function getProdutos(){
  const response = await fetch('http://localhost:1337/api/produtos')
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
  const [shoppingCart, setShoppingCart] = useState({} as ShoppingCart);
  const [showCart, setShowCart] = useState(false);

  const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format
  function isAuthenticaded({status}: dataType){
    return status === "authenticated"
  }

  function userAvatar({data}: dataType) {
    if (!data) return <span className="text-xl">AA</span>;

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
    <nav className="flex gap-2 py-10 min-w-full justify-end">
      {
      isAuthenticaded(data) 
        ? <button onClick={() => signOut()}>Logout</button>
        : <button onClick={() => signIn('google')}>Login</button>
      }
      {userAvatar(data)}
    </nav>
    );
  }

  if(showCart){
    return (
      <>
        <Head>
          <title>Carrinho</title>
          <meta name="description" content="Conferir e Finalizar o pedido" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
          <Navbar data={data}/>
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
          <button
            className="btn btn-outline btn-block my-4"
            onClick={() => setShowCart(false)}
          >Voltar</button>
          <button
            className="btn btn-outline btn-block"
            onClick={() => setShowCart(true)}
          >
            Finalizar Compra
            <div className="badge badge-secondary rounded-full">{
              currencyFormatter(
                Object.values(shoppingCart).reduce((acc, curr) => acc + curr.quantity * curr.price,0)
              )
            }</div>
          </button>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Nova Venda</title>
        <meta name="description" content="Cadastrar uma nova venda no estoque" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
        <Navbar data={data}/>
        <ul className="grid gap-5 md:gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {query.data?.data.map(produto => {
            function handleAddToCart(id: string, name: string, price: number){
              return () => isAuthenticaded(data) && setShoppingCart((old) => {
                const quantity = old[name]?.quantity ?? 0;
                return {...old, [name]: {id, quantity: quantity + increment, price}}
              })
            }

            return (<li key={produto.id}>
              <button
                className={`btn w-full h-40 p-auto btn-lg shadow-xl ${produto.attributes.quantidade > 0 ? '' : 'btn-disabled'}`}
                onClick={handleAddToCart(produto.id, produto.attributes.nome, produto.attributes.preco)}
              >
                {produto.attributes.nome}
              </button>
            </li>)
          })}
        </ul>
        <div className="btn-group">
          <button className={`btn ${increment === 1 && 'btn-accent'}`} onClick={() => setIncrement(1)}>+1</button>
          <button className={`btn ${increment === 2 && 'btn-accent'}`} onClick={() => setIncrement(2)}>+2</button>
          <button className={`btn ${increment === 5 && 'btn-accent'}`} onClick={() => setIncrement(5)}>+5</button>
        </div>
        <button
          className="btn btn-outline btn-block"
          disabled={!isAuthenticaded(data)}
          onClick={() => setShowCart(true)}
        >
          Carrinho
          <div className="badge badge-secondary rounded-full">+{
            Object.values(shoppingCart).reduce((acc, curr) => acc + curr.quantity,0)
          }</div>
        </button>
      </main>
    </>
  );
};

export default Home;