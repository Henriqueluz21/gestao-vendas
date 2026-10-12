
"use client";

import { FormEvent, useState } from "react";

type Mensagem = {
  tipo: "usuario" | "ia";
  texto: string;
};

export default function PaginaIA() {
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [carregando, setCarregando] = useState(false);

  async function enviarMensagem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const texto = mensagem.trim();

    if (!texto || carregando) {
      return;
    }

    setMensagens((anteriores) => [
      ...anteriores,
      { tipo: "usuario", texto },
    ]);

    setMensagem("");
    setCarregando(true);

    try {
      const resposta = await fetch(
        "http://localhost:8080/api/ia/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mensagem: texto,
          }),
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dados.resposta || "Erro ao consultar a IA."
        );
      }

      setMensagens((anteriores) => [
        ...anteriores,
        {
          tipo: "ia",
          texto: dados.resposta,
        },
      ]);
    } catch (erro) {
      const textoErro =
        erro instanceof Error
          ? erro.message
          : "Não foi possível conectar à IA.";

      setMensagens((anteriores) => [
        ...anteriores,
        {
          tipo: "ia",
          texto: textoErro,
        },
      ]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="section">
      <div className="container is-max-desktop">
        <div className="box">
          <div className="mb-5">
            <h1 className="title is-3">
              Assistente de estoque
            </h1>

            <p className="subtitle is-6 has-text-grey">
              Converse com a IA para consultar informações
              e solicitar operações no sistema.
            </p>
          </div>

          <div
            className="chat-mensagens mb-5"
            aria-live="polite"
          >
            {mensagens.length === 0 && (
              <div className="notification is-light">
                <p className="has-text-weight-semibold mb-2">
                  Olá! Como posso ajudar?
                </p>

                <p>
                  Experimente perguntar sobre produtos ou
                  solicitar o cadastro de um novo produto.
                </p>
              </div>
            )}

            {mensagens.map((item, indice) => (
              <div
                key={indice}
                className={`box mb-3 ${
                  item.tipo === "usuario"
                    ? "has-background-link-light"
                    : "has-background-light"
                }`}
              >
                <p
                  className={`has-text-weight-semibold mb-2 ${
                    item.tipo === "usuario"
                      ? "has-text-link"
                      : "has-text-dark"
                  }`}
                >
                  {item.tipo === "usuario" ? "Você" : "Assistente IA"}
                </p>

                <p className="chat-texto">{item.texto}</p>
              </div>
            ))}

            {carregando && (
              <div className="notification is-light">
                <span
                  className="icon-text"
                  role="status"
                >
                  <span className="icon">
                    <i className="fas fa-robot" aria-hidden="true" />
                  </span>

                  <span>
                    A IA está preparando uma resposta...
                  </span>
                </span>
              </div>
            )}
          </div>

          <form onSubmit={enviarMensagem}>
            <div className="field">
              <label className="label" htmlFor="mensagem-ia">
                Sua mensagem
              </label>

              <div className="control">
                <textarea
                  id="mensagem-ia"
                  className="textarea"
                  placeholder="Ex.: Cadastre um teclado USB por R$ 79,90..."
                  value={mensagem}
                  onChange={(event) =>
                    setMensagem(event.target.value)
                  }
                  rows={3}
                  disabled={carregando}
                  required
                />
              </div>
            </div>

            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <button
                  type="submit"
                  className={`button is-link ${
                    carregando ? "is-loading" : ""
                  }`}
                  disabled={carregando || !mensagem.trim()}
                >
                  <span className="icon">
                    <i className="fas fa-paper-plane" aria-hidden="true" />
                  </span>

                  <span>Enviar mensagem</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
