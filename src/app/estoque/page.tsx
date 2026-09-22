"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";
import EstoqueModal from "../components/layout/EstoqueModal";

interface Estoque {
    id: number;
    produtoId: number;
    quantidade: number;
}

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    sku: string;
}

export default function EstoquePage() {

    const [estoques, setEstoques] = useState<Estoque[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [carregando, setCarregando] = useState(true);

    async function carregarEstoques() {
        try {
            setCarregando(true);

            const [estoquesData, produtosData] = await Promise.all([

                apiFetch("/api/estoque"),
                apiFetch("/api/produtos"),

            ]);

            setEstoques(estoquesData);
            setProdutos(produtosData);

        } catch (error) {

            console.error(
                "Erro ao carregar estoque:",
                error
            );

        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarEstoques();
    }, []);

    return (

        <main className="page-content">
            <div className="page-header">
                <div>
                    <h1>Estoque</h1>
                </div>
                <button className="primary-button" onClick={() => setModalAberto(true)}>
                    + Entrada
                </button>
            </div>

            <div className="stock-card">

                {carregando ? (
                    <div className="stock-loading">
                        Carregando estoque...
                    </div>

                ) : estoques.length === 0 ? (
                    <div className="stock-empty">
                        Nenhum produto possui estoque cadastrado.
                    </div>
                ) : (

                    <table className="stock-table">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>SKU</th>
                                <th>Quantidade</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {estoques.map((estoque) => {

                                const produto = produtos.find(
                                    (p) => p.id === estoque.produtoId
                                );

                                let statusClass =
                                    "stock-status-good";

                                let statusText =
                                    "Em estoque";

                                if (
                                    estoque.quantidade === 0
                                ) {

                                    statusClass =
                                        "stock-status-empty";

                                    statusText =
                                        "Sem estoque";

                                } else if (
                                    estoque.quantidade <= 5
                                ) {

                                    statusClass =
                                        "stock-status-low";

                                    statusText =
                                        "Estoque baixo";

                                }

                                return (
                                    <tr key={estoque.id}>
                                        <td>
                                            <div className="stock-product">
                                                <span className="stock-product-name">
                                                    {produto?.nome ||
                                                        `Produto #${estoque.produtoId}`}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <span className="stock-product-sku">
                                                {produto?.sku || "-"}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="stock-quantity">
                                                {estoque.quantidade}
                                            </span>
                                        </td>

                                        <td>
                                            <span className={`stock-status ${statusClass}`}>
                                                {statusText}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            {modalAberto && (
                <EstoqueModal
                    produtos={produtos}
                    onClose={() => setModalAberto(false)}
                    onSuccess={carregarEstoques}
                />
            )}
        </main>
    );
}