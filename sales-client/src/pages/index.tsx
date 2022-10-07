import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nova Venda</title>
        <meta name="description" content="Cadastrar uma nova venda no estoque" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
        <ul className="grid gap-5 md:gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <li>
            <button className="btn w-full h-40 p-auto btn-lg shadow-xl">
              Coxinha
            </button>
          </li>
          <li>
            <button className="btn w-full h-40 p-auto btn-lg shadow-xl">
              Suco de Caju
            </button>
          </li>
          <li>
            <button className="btn w-full h-40 p-auto btn-lg shadow-xl">
              Costela de Adão
            </button>
          </li>
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