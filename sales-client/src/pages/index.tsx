import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";

type Produto = {
  id: string;
  attributes: {
    nome: string;
    preco: number;
    quantidade: number;
  };
}

async function getProdutos(){
  const response = await fetch('http://localhost:1337/api/produtos')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const Home: NextPage = () => {
  const query = useQuery<{data: Produto[]}| undefined>(['produtos'], getProdutos);

  return (
    <>
      <Head>
        <title>Nova Venda</title>
        <meta name="description" content="Cadastrar uma nova venda no estoque" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
        <ul className="grid gap-5 md:gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {query.data?.data.map(produto => (
            <li key={produto.id}>
              <button className={`btn w-full h-40 p-auto btn-lg shadow-xl ${produto.attributes.quantidade > 0 ? '' : 'btn-disabled'}`}>
                {produto.attributes.nome}
              </button>
            </li>
          ))}
        </ul>
        <div className="btn-group">
          <button className="btn">+1</button>
          <button className="btn">+2</button>
          <button className="btn">+5</button>
        </div>
        <button className="btn btn-outline btn-block">
          Carrinho
          <div className="badge badge-secondary rounded-full">+99</div>
        </button>
      </main>
    </>
  );
};

export default Home;