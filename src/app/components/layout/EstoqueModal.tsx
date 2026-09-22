"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { apiFetch } from "@/services/api";

interface Produto {
  id: number;
  nome: string;
  sku: string;
}

interface EstoqueModalProps {
  produtos: Produto[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function EstoqueModal({
  produtos,
  onClose,
  onSuccess,
}: EstoqueModalProps) {

  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function adicionarEstoque(event: FormEvent) {

    event.preventDefault();

    if (!produtoId) {
      alert("Selecione um produto.");
      return;
    }

    if (!quantidade || Number(quantidade) <= 0) {
      alert("Informe uma quantidade válida.");
      return;
    }

    try {

      setSalvando(true);

      await apiFetch("/api/estoque", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produtoId: Number(produtoId),
          quantidade: Number(quantidade),
        }),
      });

      onSuccess();
      onClose();

    } catch (error) {

      console.error(
        "Erro ao adicionar estoque:",
        error
      );

      alert(
        "Não foi possível adicionar o estoque."
      );

    } finally {

      setSalvando(false);

    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999,
      }}
    >

      <div
        style={{
          width: "500px",
          backgroundColor: "#ffffff",
          color: "#111827",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "25px",
          }}
        >

          <div>

            <h2
              style={{
                margin: 0,
                color: "#111827",
              }}
            >
              Entrada de estoque
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "24px",
              cursor: "pointer",
              color: "#6b7280",
            }}
          >
            ×
          </button>

        </div>

        <form onSubmit={adicionarEstoque}>

          <div
            style={{
              marginBottom: "20px",
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              Produto
            </label>

            <select
              value={produtoId}
              onChange={(event) =>
                setProdutoId(event.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#111827",
              }}
            >

              <option value="">
                Selecione um produto
              </option>

              {produtos.map((produto) => (
                <option
                  key={produto.id}
                  value={produto.id}
                >
                  {produto.nome} — {produto.sku}
                </option>
              ))}

            </select>

          </div>

          <div
            style={{
              marginBottom: "25px",
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              Quantidade
            </label>

            <input
              type="number"
              min="1"
              value={quantidade}
              onChange={(event) =>
                setQuantidade(event.target.value)
              }
              placeholder="Digite a quantidade"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#111827",
              }}
            />

          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >

            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 18px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#374151",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={salvando}
              style={{
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                background: "#2563eb",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              {salvando
                ? "Adicionando..."
                : "Adicionar"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}