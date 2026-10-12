"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";
import EstoqueModal from "../components/layout/EstoqueModal";
import Toast from "../components/layout/Toast";

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
    const [estoqueEditar, setEstoqueEditar] = useState<Estoque | null>(null);

    const [toastVisivel, setToastVisivel] = useState(false);
    const [toastMensagem, setToastMensagem] = useState("");
    const [toastTipo, setToastTipo] = useState<"sucesso" | "erro" | "aviso" | "info">("sucesso");



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

    function editarEstoque(estoque: Estoque) {
        alert(
            `Editar estoque do produto ${estoque.produtoId}`
        );
    }

    async function excluirEstoque(id: number) {
        const confirmar = window.confirm(
            "Deseja realmente excluir este estoque?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await apiFetch(`/api/estoque/${id}`, {
                method: "DELETE",
            });

            await carregarEstoques();
        } catch (error) {
            console.error(
                "Erro ao excluir estoque:",
                error
            );

            alert(
                "Não foi possível excluir o estoque."
            );
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
                <button className="primary-button" onClick={() => { setEstoqueEditar(null); setModalAberto(true); }}>
                    + Entrada
                </button>
            </div>

            <Toast
                mensagem={toastMensagem}
                tipo={toastTipo}
                visivel={toastVisivel}
                onClose={() => setToastVisivel(false)}
            />
            
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
                                <th>Ações</th>
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
                                        <td>
                                            <div className="table-actions">
                                                <button className="table-button" onClick={() => { setEstoqueEditar(estoque); setModalAberto(true); }}>
                                                    Editar
                                                </button>

                                                <button className="table-button delete-button" onClick={() => excluirEstoque(estoque.id)} >
                                                    Excluir
                                                </button>
                                            </div>
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
                    estoqueEditando={estoqueEditar}
                    onClose={() => {
                        setModalAberto(false);
                        setEstoqueEditar(null);
                    }}
                    onSuccess={carregarEstoques}
                />
            )}
        </main>
    );
}