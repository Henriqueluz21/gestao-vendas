"use client";

import { useEffect, useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import DashBoardCards from "./components/layout/DashBoardCards";
import SalesChart from "./components/layout/SalesChart";
import RecentSales from "./components/layout/RecentSales";

import { apiFetch } from "@/services/api";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  sku: string;
}

interface Estoque {
  id: number;
  produtoId: number;
  quantidade: number;
}

interface ItemVenda {
  produtoId: number;
  sku: string;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

interface Venda {
  id: number;
  data: string;
  valorTotal: number;
  itens: ItemVenda[];
}

export default function Home() {

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarDashboard() {

    try {

      setCarregando(true);

      const [
        produtosData,
        estoquesData,
        vendasData,
      ] = await Promise.all([
        apiFetch("/api/produtos"),
        apiFetch("/api/estoque"),
        apiFetch("/api/vendas"),
      ]);

      setProdutos(produtosData);
      setEstoques(estoquesData);
      setVendas(vendasData);

    } catch (error) {

      console.error(
        "Erro ao carregar dashboard:",
        error
      );

    } finally {

      setCarregando(false);

    }
  }

  useEffect(() => {
    carregarDashboard();
  }, []);

  const totalProdutos = produtos.length;

  const totalEstoque = estoques.reduce(
    (total, estoque) =>
      total + estoque.quantidade,
    0
  );

  const totalVendas = vendas.length;

  const faturamento = vendas.reduce(
    (total, venda) =>
      total + Number(venda.valorTotal),
    0
  );

  return (
    <div>
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="dashboard-content">
          <DashBoardCards
            totalProdutos={totalProdutos}
            totalEstoque={totalEstoque}
            totalVendas={totalVendas}
            faturamento={faturamento}
            carregando={carregando}
          />
          <div className="dashboard-row">
            <SalesChart
              vendas={vendas}
            />
            <RecentSales
              vendas={vendas}
            />
          </div>
        </div>
      </main>
    </div>
  );
}