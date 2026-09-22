"Use client";

import { Bell, UserCircle } from "lucide-react";

export default function Header() {

    return (
        <header className="header">
            <div className="header-left">
                <div>
                    <h2>Dashboard</h2>
                    <p>Visão geral do seu negócio</p>
                </div>
            </div>
            <div className="header-right">
                <div className="header-icon">
                    <Bell size={20} />
                </div>
                <div className="user-profile">
                    <UserCircle size={20} />
                    <div className="user-info">
                        <strong>Usuário</strong>
                        <span>Administrador</span>
                    </div>
                </div>
            </div>
        </header>
    )
}