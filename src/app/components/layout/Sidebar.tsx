"use client";

import {
    LayoutDashboard,
    Package,
    Warehouse,
    ShoppingCart,
    BarChart3,
    Settings,
    Bot,
} from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <div className="logo-icon">
                    ◈
                </div>
                <div>
                    <h1>Sistema de Gestão</h1>
                </div>
            </div>

            <nav className="sidebar-menu">
                <a className="sidebar-item active">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </a>
                <a className="sidebar-item" href="/produtos">
                    <Package size={20} />
                    <span>Produtos</span>
                </a>
                <a className="sidebar-item" href="/estoque">
                    <Warehouse size={20} />
                    <span>Estoque</span>
                </a>
                <a className="sidebar-item" href="/vendas">
                    <ShoppingCart size={20} />
                    <span>Vendas</span>
                </a>
                 <a className="sidebar-item" href="/ia">
                    <Bot size={20} />
                    <span>Assistente de estoque</span>
                </a>
                <a className="sidebar-item">
                    <BarChart3 size={20} />
                    <span>Relatórios</span>
                </a>
            </nav>
        </aside>
    );
}