"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { apiFetch } from "@/services/api";

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    sku: string;
}

interface ProductModalProps {
    produto?: Produto | null;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ProductModal({
    produto,
    onClose,
    onSuccess,
}: ProductModalProps) {

    const [nome, setNome] = useState(
        produto?.nome || ""
    );

    const [descricao, setDescricao] = useState(
        produto?.descricao || ""
    );

    const [preco, setPreco] = useState(
        produto?.preco?.toString() || ""
    );

    const [sku, setSku] = useState(
        produto?.sku || ""
    );

    const [salvando, setSalvando] = useState(false);

    const [erro, setErro] = useState("");

    const modoEdicao = !!produto;

    async function salvarProduto(
        event: React.FormEvent
    ) {

        event.preventDefault();

        setErro("");

        if (!nome || !preco || !sku) {

            setErro(
                "Preencha nome, preço e SKU."
            );

            return;
        }

        try {

            setSalvando(true);

            const dados = {
                nome,
                descricao,
                preco: Number(preco),
                sku,
            };

            if (modoEdicao) {

                await apiFetch(
                    `/api/produtos/${produto.id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(dados),
                    }
                );

            } else {

                await apiFetch(
                    "/api/produtos",
                    {
                        method: "POST",
                        body: JSON.stringify(dados),
                    }
                );

            }

            onSuccess();

            onClose();

        } catch (error) {

            console.error(error);

            setErro(
                modoEdicao
                    ? "Não foi possível atualizar o produto."
                    : "Não foi possível cadastrar o produto."
            );

        } finally {

            setSalvando(false);

        }
    }

    return (
        <div className="modal-overlay">
            <div className="product-modal">
                <div className="modal-header">
                    <div>
                        <h2>
                            {modoEdicao
                                ? "Editar produto"
                                : "Novo produto"}
                        </h2>
                        <p>
                            {modoEdicao
                                ? "Altere os dados do produto."
                                : "Cadastre um novo produto no sistema."}
                        </p>
                    </div>
                    <button className="modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={salvarProduto} className="product-form" >

                    <div className="form-group">
                        <label>
                            Nome *
                        </label>
                        <input type="text" placeholder="Ex: Teclado Mecânico" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label>
                            SKU *
                        </label>
                        <input type="text"  placeholder="Ex: TEC001" value={sku} onChange={(e) => setSku(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label>
                            Descrição
                        </label>
                        <textarea placeholder="Descrição do produto..." value={descricao} onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Preço *
                        </label>
                        <input type="number" step="0.01" min="0" placeholder="0.00" value={preco} onChange={(e) => setPreco(e.target.value) }/>
                    </div>

                    {erro && (
                        <div className="form-error">
                            {erro}
                        </div>
                    )}

                    <div className="modal-actions">
                        <button type="button"className="secondary-button"onClick={onClose}disabled={salvando}> Cancelar </button>
                        <button type="submit" className="primary-button"disabled={salvando} >
                            {salvando
                                ? "Salvando..."
                                : modoEdicao
                                    ? "Salvar alterações"
                                    : "Cadastrar produto"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}