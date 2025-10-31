import React from 'react';
import { Home, Ticket, Monitor, User, LogOut } from 'lucide-react';

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
}

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-avatar">
                    <User size={32}/>
                </div>
                <div className="sidebar-name">Alberto Perez</div>
                <div className="sidebar-role">Cliente</div>
            </div>

            <nav className="sidebar-nav">
                <a href="#" className="sidebar-link active">
                    <Home size={20} />
                    <span>Inicio</span>
                </a>
                <a href="#" className="sidebar-link">
                    <Ticket size={20} />
                    <span>Tickets</span>
                </a>
                <a href="#" className="sidebar-link">
                    <Monitor size={20} />
                    <span>Equipos</span>
                </a>
            </nav>

            <div className="sidebar-footer">
                <a href="#" className="sidebar-link">
                    <User size={20} />
                    <span>Perfil</span>
                </a>
                <a href="#" className="sidebar-link" onClick={logout}>
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;