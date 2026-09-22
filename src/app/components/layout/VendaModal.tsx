"use client";

import { useState } from "react";
import { apiFetch } from "@/services/api";

interface Produto {
    id: number;
    nome: string;
    sku: string;
    preco: number;
}

interface ItemVenda {
    produtoId: number;
    quantidade: number;
}

interface VendaModalProps {
    produtos: Produto[];
    onClose: () => void;
    onSuccess: () => void;
}

export default function VendaModal({
    produtos,
    onClose,
    onSuccess,
}: VendaModalProps) {

    const [produtoId, setProdutoId] = useState("");
    const [quantidade, setQuantidade] = useState("1");
    const [itens, setItens] = useState<ItemVenda[]>([]);
    const [salvando, setSalvando] = useState(false);

    function adicionarItem() {

        if (!produtoId) {
            alert("Selecione um produto.");
            return;
        }

        if (!quantidade || Number(quantidade) <= 0) {
            alert("Informe uma quantidade válida.");
            return;
        }

        const id = Number(produtoId);
        const quantidadeNumero = Number(quantidade);

        setItens((itensAtuais) => {

            const existente = itensAtuais.find(
                (item) => item.produtoId === id
            );

            if (existente) {
                return itensAtuais.map((item) =>
                    item.produtoId === id
                        ? {
                            ...item,
                            quantidade:
                                item.quantidade +
                                quantidadeNumero,
                        }
                        : item
                );
            }

            return [
                ...itensAtuais,
                {
                    produtoId: id,
                    quantidade: quantidadeNumero,
                },
            ];
        });

        setProdutoId("");
        setQuantidade("1");
    }

    function removerItem(produtoId: number) {

        setItens((itensAtuais) =>
            itensAtuais.filter(
                (item) => item.produtoId !== produtoId
            )
        );
    }

    function calcularTotal() {

        return itens.reduce((total, item) => {

            const produto = produtos.find(
                (p) => p.id === item.produtoId
            );

            if (!produto) {
                return total;
            }

            return total + produto.preco * item.quantidade;

        }, 0);
    }

    async function finalizarVenda() {

        if (itens.length === 0) {
            alert("Adicione pelo menos um produto.");
            return;
        }

        try {

            setSalvando(true);

            await apiFetch("/api/vendas", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    itens,
                }),
            });

            onSuccess();
            onClose();

        } catch (error) {

            console.error(
                "Erro ao realizar venda:",
                error
            );

            alert(
                "Não foi possível realizar a venda."
            );

        } finally {

            setSalvando(false);

        }
    }

    return (
        <div style={{  position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.5)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", }} >
            <div style={{ background: "white", width: "600px", maxWidth: "90%", maxHeight: "90vh", overflowY: "auto", padding: "24px", borderRadius: "12px",  color: "black",}}>

                <div className="modal-header">
                    <div>
                        <h2>
                            Nova venda
                        </h2>
                    </div>
                </div>

                <div className="form-group">
                    <label>
                        Produto
                    </label>
                    
                    <select  value={produtoId} onChange={(event) =>  setProdutoId( event.target.value) } >

                        <option value="">
                            Selecione um produto
                        </option>

                        {produtos.map((produto) => (

                            <option key={produto.id} value={produto.id} >
                                {produto.nome} — {produto.sku}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>
                        Quantidade
                    </label>
                    <input type="number" min="1" value={quantidade} onChange={(event) =>   setQuantidade( event.target.value) } />
                </div>

                <button type="button" className="secondary-button" onClick={adicionarItem}> 
                    Adicionar produto
                </button>

                <div className="venda-itens">

                    {itens.length === 0 ? (

                        <div className="stock-empty">
                            Nenhum produto adicionado.
                        </div>

                    ) : (

                        itens.map((item) => {

                            const produto =
                                produtos.find(
                                    (p) =>
                                        p.id ===
                                        item.produtoId
                                );

                            if (!produto) {
                                return null;
                            }

                            const subtotal =
                                produto.preco *
                                item.quantidade;

                            return (

                                <div
                                    className="venda-item"
                                    key={item.produtoId}
                                >

                                    <div>

                                        <strong>
                                            {produto.nome}
                                        </strong>

                                        <span>
                                            {produto.sku}
                                        </span>

                                    </div>

                                    <div>
                                        {item.quantidade}x
                                    </div>

                                    <div>

                                        {subtotal.toLocaleString(
                                            "pt-BR",
                                            {
                                                style:
                                                    "currency",
                                                currency:
                                                    "BRL",
                                            }
                                        )}

                                    </div>

                                    <button type="button" onClick={() => removerItem(item.produtoId )}>
                                        ×
                                    </button>
                                </div>
                            );
                        })

                    )}

                </div>

                <div className="venda-total">

                    <span>
                        Total
                    </span>

                    <strong>

                        {calcularTotal().toLocaleString(
                            "pt-BR",
                            {
                                style: "currency",
                                currency: "BRL",
                            }
                        )}

                    </strong>

                </div>

                <div className="modal-footer">

                    <button type="button" className="secondary-button" onClick={onClose} >
                        Cancelar
                    </button>

                    <button type="button" className="primary-button" onClick={finalizarVenda}   disabled={salvando}  >
                        {salvando
                            ? "Finalizando..."
                            : "Finalizar venda"}
                    </button>

                </div>

            </div>

        </div>
    );
}