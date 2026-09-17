
"use client";

import { useEffect, useState } from "react";

import { apiFetch } from "@/services/api";
import { Produto } from "@/types/produto";
import React from "react";

export default function ProdutosPage() {

    const [produtos, setProdutos] = React.useState<Produto[]>([]);

    useEffect(() => {

        apiFetch('/api/produtos')
            .then(setProdutos)
            .catch(console.error);
    }, []);

     return (
        <section className="section">
            <div className="container">
                <h1 className="title">
                    Produtos
                </h1>
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Nome</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(
                            produto => (
                            <tr key={produto.id}>
                                <td>
                                    {produto.sku}
                                </td>
                                <td>
                                    {produto.nome}
                                </td>
                                <td>
                                    R$ {produto.preco}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}