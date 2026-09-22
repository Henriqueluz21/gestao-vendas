"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";
import VendaModal from "../components/layout/VendaModal";

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

interface Produto {
    id: number;
    nome: string;
    sku: string;
    preco: number;
}

export default function VendasPage() {
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [modalAberto, setModalAberto] = useState(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [vendaSelecionada, setVendaSelecionada] = useState<Venda | null>(null);

    async function carregarVendas() {
        try {
            setCarregando(true);

            const [vendasData, produtosData] = await Promise.all([
                apiFetch("/api/vendas"),
                apiFetch("/api/produtos"),
            ]);

            setVendas(vendasData);
            setProdutos(produtosData);
        } catch (error) {
            console.error("Erro ao carregar vendas:", error);
        } finally {
            setCarregando(false);
        }
    }

    async function cancelarVenda(id: number) {
        const confirmar = window.confirm(
            "Tem certeza que deseja cancelar esta venda?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await apiFetch(`/api/vendas/${id}`, {
                method: "DELETE",
            });

            setVendaSelecionada(null);

            await carregarVendas();

            alert("Venda cancelada com sucesso.");
        } catch (error) {
            console.error(
                "Erro ao cancelar venda:",
                error
            );

            alert(
                "Não foi possível cancelar a venda."
            );
        }
    }

    useEffect(() => {
        carregarVendas();
    }, []);

    function formatarData(data: string) {
        return new Date(data).toLocaleDateString("pt-BR");
    }

    function formatarValor(valor: number) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    return (
        <main className="page-content">
            <div className="page-header">
                <div>
                    <h1>Vendas</h1>
                </div>
                    <button className="primary-button" onClick={() => setModalAberto(true)}>
                        + Nova venda
                    </button>
            </div>
            <div className="stock-card">

                {carregando ? (
                    <div className="stock-loading">
                        Carregando vendas...
                    </div>
                ) : vendas.length === 0 ? (
                    <div className="stock-empty">
                        Nenhuma venda realizada.
                    </div>
                ) : (
                    <table className="stock-table">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Data</th>
                                <th>Quantidade</th>
                                <th>Valor total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {vendas.map((venda) => (
                                venda.itens.map((item) => (
                                    <tr key={`${venda.id}-${item.produtoId}`} onClick={() => setVendaSelecionada(venda)} className="sale-row">

                                        <td>
                                            <div className="stock-product">
                                                <span className="stock-product-name">
                                                    {item.nomeProduto}
                                                </span>

                                                <span className="stock-product-sku">
                                                    {item.sku}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            {formatarData(venda.data)}
                                        </td>

                                        <td>
                                            {item.quantidade}x
                                        </td>

                                        <td>
                                            {formatarValor(item.subtotal)}
                                        </td>

                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {modalAberto && (
                <VendaModal
                    produtos={produtos}
                    onClose={() => setModalAberto(false)}
                    onSuccess={carregarVendas}
                />
            )}

            {vendaSelecionada && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.5)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                    <div style={{ background: "white", color: "#111827", width: "700px", maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", padding: "30px", borderRadius: "12px" }}>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px" }}>
                            <div>
                                <h2 style={{ margin: 0 }}>
                                    Venda #{vendaSelecionada.id}
                                </h2>

                                <p
                                    style={{
                                        marginTop: "6px",
                                        color: "#6b7280",
                                    }}
                                >
                                    {new Date(
                                        vendaSelecionada.data
                                    ).toLocaleString("pt-BR")}
                                </p>
                            </div>

                            <button type="button" onClick={() => setVendaSelecionada(null)} style={{ border: "none", background: "transparent", fontSize: "24px", cursor: "pointer" }}>
                                ×
                            </button>
                        </div>
                        <h3>
                            Produtos
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", }} >
                            {vendaSelecionada.itens.map((item) => (
                                <div key={item.produtoId} style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "15px", }} >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}  >
                                        <div>
                                            <strong>
                                                {item.nomeProduto}
                                            </strong>

                                            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px", }}  >
                                                SKU: {item.sku}
                                            </div>
                                        </div>

                                        <strong>
                                            {Number(
                                                item.subtotal
                                            ).toLocaleString(
                                                "pt-BR",
                                                {
                                                    style: "currency",
                                                    currency: "BRL",
                                                }
                                            )}
                                        </strong>

                                    </div>

                                    <div style={{ marginTop: "10px", fontSize: "14px", color: "#4b5563", }} >
                                        {item.quantidade} ×{" "}
                                        {Number(
                                            item.precoUnitario
                                        ).toLocaleString(
                                            "pt-BR",
                                            {
                                                style: "currency",
                                                currency: "BRL",
                                            }
                                        )}
                                    </div>

                                </div>

                            ))}
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "25px", paddingTop: "20px", borderTop: "1px solid #e5e7eb" }}>
                            <strong>
                                Total da venda
                            </strong>

                            <strong style={{ fontSize: "22px", }}>
                                {Number(
                                    vendaSelecionada.valorTotal
                                ).toLocaleString(
                                    "pt-BR",
                                    {
                                        style: "currency",
                                        currency: "BRL",
                                    }
                                )}
                            </strong>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <button
                                type="button"
                                className="danger-button"
                                onClick={() =>
                                    cancelarVenda(
                                        vendaSelecionada.id
                                    )
                                }
                            >
                                Cancelar venda
                            </button>

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() =>
                                    setVendaSelecionada(null)
                                }
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}