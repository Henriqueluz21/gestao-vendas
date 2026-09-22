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
                <a className="sidebar-item">
                    <BarChart3 size={20} />
                    <span>Relatórios</span>
                </a>
            </nav>
            <div className="sidebar-bottom">
                <a className="sidebar-item">
                    <Settings size={20} />
                    <span>Configurações</span>
                </a>
                <div className="ai-card">
                    <div className="ai-icon">
                        <Bot size={22} />
                    </div>
                    <div>
                        <strong>Assistente IA</strong>
                        <div className="ai-status">
                            <span></span>
                            Online
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}