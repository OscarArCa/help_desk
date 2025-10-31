import React from 'react';
import { useAuth } from "@/context/AuthContext";
import { Home, Ticket, Monitor, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
}

const Sidebar: React.FC = () => {
    const location = useLocation();
    const { user } = useAuth();

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-avatar">
                    <User size={50} />
                </div>
                <div className="sidebar-name">{user?.name}</div>
                <div className="sidebar-role">{user?.roles}</div>
            </div>

            <nav className="sidebar-nav">
                <Link
                    to="/inicioClient"
                    className={`sidebar-link ${location.pathname === '/inicio' ? 'active' : ''}`}
                >
                    <Home size={20} />
                    <span>Inicio</span>
                </Link>

                <Link
                    to="/TicketClient"
                    className={`sidebar-link ${location.pathname === '/tickets' ? 'active' : ''}`}
                >
                    <Ticket size={20} />
                    <span>Tickets</span>
                </Link>

                <Link
                    to="/equipos"
                    className={`sidebar-link ${location.pathname === '/equipos' ? 'active' : ''}`}
                >
                    <Monitor size={20} />
                    <span>Equipos</span>
                </Link>
            </nav>

            <div className="sidebar-footer">
                <Link
                    to="/perfil"
                    className={`sidebar-link ${location.pathname === '/perfil' ? 'active' : ''}`}
                >
                    <User size={20} />
                    <span>Perfil</span>
                </Link>
                <Link
                    to="/login"
                    className={`sidebar-link ${location.pathname === '/login' ? 'active' : ''}`}
                    onClick={logout}
                >
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;