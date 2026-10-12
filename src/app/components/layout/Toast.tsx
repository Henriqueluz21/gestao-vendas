"use client";

import { useEffect } from "react";

interface ToastProps {
    mensagem: string;
    tipo?: "sucesso" | "erro" | "aviso" | "info";
    visivel: boolean;
    onClose: () => void;
}

export default function Toast({
    mensagem,
    tipo = "sucesso",
    visivel,
    onClose,
}: ToastProps) {

    useEffect(() => {
        if (!visivel) return;

        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [visivel, onClose]);

    if (!visivel) {
        return null;
    }

    const icones = {
        sucesso: "✓",
        erro: "!",
        aviso: "!",
        info: "i",
    };

    return (
        <div className={`toast toast-${tipo}`}>
            <div className="toast-icon">
                {icones[tipo]}
            </div>

            <div className="toast-content">
                <strong>
                    {tipo === "sucesso" && "Sucesso"}
                    {tipo === "erro" && "Erro"}
                    {tipo === "aviso" && "Atenção"}
                    {tipo === "info" && "Informação"}
                </strong>

                <span>{mensagem}</span>
            </div>

            <button type="button" className="toast-close" onClick={onClose}>
                ×
            </button>
        </div>
    );
}