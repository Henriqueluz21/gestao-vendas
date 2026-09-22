"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Package } from "lucide-react";
import { apiFetch } from "@/services/api";
import ProductModal from "../components/layout/ProductModal";

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    sku: string;
}


export default function ProdutosPage() {

    const [modalAberto, setModalAberto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [busca, setBusca] = useState("");
    const [carregando, setCarregando] = useState(true);

    async function carregarProdutos() {

        try {
            setCarregando(true);
            const dados = await apiFetch("/api/produtos");
            setProdutos(dados);

        } catch (error) {
            console.error("Erro ao carregar produtos:", error);

        } finally {
            setCarregando(false);
        }
    }

    async function excluirProduto(produto: Produto) {
        const confirmou = window.confirm(
            `Deseja realmente excluir o produto "${produto.nome}"?`
        );

        if (!confirmou) {
            return;
        }

        try {
            await apiFetch(
                `/api/produtos/${produto.id}`,
                {
                    method: "DELETE",
                }
            );
            await carregarProdutos();

        } catch (error) {
            console.error(
                "Erro ao excluir produto:",
                error
            );
            alert(
                "Não foi possível excluir o produto."
            );
        }
    }
    useEffect(() => {
        carregarProdutos();
    }, []);

    const produtosFiltrados = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
        produto.sku.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <main className="page-content">
            <div className="page-header">
                <div>
                    <h1>Produtos</h1>
                    <p>
                        Gerencie os produtos cadastrados no sistema.
                    </p>
                </div>

                <button className="primary-button" onClick={() => { setProdutoSelecionado(null); setModalAberto(true); }}>
                    <Plus size={18} />
                    Novo produto
                </button>

            </div>

            <div className="products-toolbar">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Buscar produto ou SKU..." value={busca} onChange={(e) => setBusca(e.target.value)} />
                </div>
            </div>

            <div className="products-card">

                {carregando ? (
                    <div className="empty-state">
                        Carregando produtos...
                    </div>
                ) : produtosFiltrados.length === 0 ? (

                    <div className="empty-state">
                        <Package size={40} />
                        <h3>Nenhum produto encontrado</h3>
                        <p>
                            Cadastre um produto para começar.
                        </p>
                    </div>

                ) : (

                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Produto</th>
                                <th>SKU</th>
                                <th>Descrição</th>
                                <th>Preço</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {produtosFiltrados.map((produto) => (
                                <tr key={produto.id}>
                                    <td>
                                        #{produto.id}
                                    </td>
                                    <td>
                                        <strong>
                                            {produto.nome}
                                        </strong>
                                    </td>
                                    <td>
                                        {produto.sku}
                                    </td>
                                    <td>
                                        {produto.descricao}
                                    </td>
                                    <td>
                                        R$ {Number(produto.preco).toFixed(2)}
                                    </td>
                                    <td>
                                        <button className="table-button" onClick={() => { setProdutoSelecionado(produto); setModalAberto(true); }}>
                                            Editar
                                        </button>
                                        <button className="table-button delete-button" onClick={() => { excluirProduto(produto); }}>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {modalAberto && (
                <ProductModal
                    produto={produtoSelecionado}
                    onClose={() => {
                        setModalAberto(false);
                        setProdutoSelecionado(null);
                    }}
                    onSuccess={carregarProdutos}
                />
            )}
        </main>
    );
}