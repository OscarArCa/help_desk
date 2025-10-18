import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, LogOut, User, ChevronLeft, Camera, Layout, Mail, Phone, MapPin, Briefcase } from 'lucide-react'; // FileText ha sido eliminado

// NOTA: Componentes de UI simulados para el entorno de un solo archivo
const Avatar: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({ className, children, ...props }) => (
    <div className={className} {...props}>{children}</div>
);

const AvatarFallback: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({ className, children, ...props }) => (
    <div className={`flex items-center justify-center ${className}`} {...props}>{children}</div>
);

// --- Códigos de Color basados en las imágenes ---
const COLOR_NARANJA = '#FFA82E'; // Encabezado y Pie
const COLOR_NEGRO_FONDO = '#202020'; // Fondo del cuerpo principal
const COLOR_GRIS_ITEM_ACTIVO = '#EBEBEB'; // Fondo del elemento activo
const COLOR_GRIS_TEXTO_INACTIVO = '#B3B3B3'; // Texto de los ítems inactivos

// --- Sub-componentes ---

interface NavItemProps {
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
    active?: boolean;
    to?: string;
    isFooter?: boolean; // Para ítems en el pie de página (fondo naranja)
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick, to, isFooter = false }) => {
    // Clases base para el ítem
    let classes = `flex items-center space-x-3 p-3 transition-colors text-sm`;
    const Content = (
        <>
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </>
    );

    if (active) {
        // Estilo del ÍTEM ACTIVO (Fondo Gris Claro + Borde Izquierdo Naranja, texto negro)
        classes += ` bg-[${COLOR_GRIS_ITEM_ACTIVO}] text-black font-semibold border-l-4 border-[${COLOR_NARANJA}]`;
    } else if (isFooter) {
        // Estilo del ÍTEM DEL PIE (Fondo Naranja, texto blanco)
        classes += ` bg-[${COLOR_NARANJA}] text-white hover:bg-black/10`;
    } else {
        // Estilo del ÍTEM INACTIVO (Fondo Negro, texto gris claro)
        classes += ` text-[${COLOR_GRIS_TEXTO_INACTIVO}] hover:bg-black/30`;
    }

    // Si hay una ruta 'to', usamos Link. Si no, usamos un div con onClick.
    if (to) {
        return (
            <Link to={to} className={`cursor-pointer ${classes}`}>
                {Content}
            </Link>
        );
    }

    return (
        <div className={`cursor-pointer ${classes}`} onClick={onClick}>
            {Content}
        </div>
    );
};

// --- Contenido de la Navegación Principal ---

interface MainNavProps {
    onNavigate: (view: 'inicio' | 'perfil') => void;
    currentPath: string; // Para saber qué enlace está activo
}

const MainNav: React.FC<MainNavProps> = ({ onNavigate, currentPath }) => {
    // Usamos Layout en lugar de FileText para imitar el icono de las imágenes
    const isTicketsActive = currentPath === '/tickets';
    const isHomeActive = currentPath === '/';
    const isClientesActive = currentPath === '/clientes';

    return (
        <div className="flex flex-col h-full">
            {/* Sección Superior: Avatar y Menú */}
            <div className='flex-1'>
                {/* Encabezado Naranja */}
                <div className={`p-4 flex flex-col items-center space-y-2 bg-[${COLOR_NARANJA}] h-[120px] justify-center`}>
                    <Avatar className="w-16 h-16 border-2 border-white">
                        <AvatarFallback className={`bg-white text-[${COLOR_NARANJA}] text-xl`}>
                            <User className="w-10 h-10" /> {/* Ícono de usuario grande */}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-white text-center -mt-2">
                        <p className="font-semibold text-lg">Alberto Perez</p>
                        <p className="text-sm opacity-90">Soporte TI</p>
                    </div>
                </div>

                {/* Elementos de Navegación (sobre fondo NEGRO_FONDO) */}
                <nav className="mt-4 space-y-1 px-4">
                    <NavItem
                        icon={Home}
                        label="Inicio"
                        to="/"
                        active={isHomeActive}
                    />
                    <NavItem
                        icon={Layout} // Icono similar a "Tickets"
                        label="Tickets"
                        to="/tickets"
                        active={isTicketsActive}
                    />
                    <NavItem
                        icon={Users}
                        label="Cliente"
                        to="/clientes"
                        active={isClientesActive}
                    />
                </nav>
            </div>

            {/* Pie de Página: Fondo Naranja, como en la imagen */}
            <div className={`text-white space-y-2 bg-[${COLOR_NARANJA}]`}>
                <NavItem icon={User} label="Perfil" isFooter={true} onClick={() => onNavigate('perfil')} />
                <NavItem icon={LogOut} label="Cerrar Sesión" isFooter={true} onClick={() => {}} />
            </div>
        </div>
    );
};

// --- Contenido de la Vista de Perfil ---

interface PerfilViewProps {
    onBack: () => void;
}

const PerfilView: React.FC<PerfilViewProps> = ({ onBack }) => (
    // La vista de perfil parece tener un fondo blanco/gris claro y la sección inferior naranja
    <div className={`flex flex-col justify-between h-full w-full bg-white text-black`}>
        <div>
            {/* Cabecera de Perfil - Gris Claro */}
            <div className={`p-4 flex items-center space-x-2 bg-gray-100 h-16 border-b border-gray-200 text-black`}>
                <ChevronLeft className="w-6 h-6 text-gray-800 cursor-pointer" onClick={onBack} />
                <span className="text-lg font-semibold">Perfil</span>
            </div>

            {/* Avatar Centralizado y Nombre */}
            <div className={`p-8 flex flex-col items-center space-y-4`}>
                {/* Ícono de Perfil Grande y Gris */}
                <div className="relative w-32 h-32 rounded-full bg-gray-300 flex flex-col justify-center items-center text-gray-600 shadow-inner">
                    <Camera className="w-8 h-8" />
                    <span className="text-sm font-medium">Añadir una foto de perfil</span>
                </div>
                <p className="font-bold text-xl text-gray-900">Carlos Manuel</p>
                <p className="text-sm text-gray-500">ID: 9 2 2 2 2 3 4</p>
            </div>

            {/* Lista de Detalles del Perfil */}
            <nav className="mt-4 space-y-1">
                <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 border-b border-gray-100">
                    <Users className="w-5 h-5 text-gray-600" />
                    <span className="flex-1 font-medium">J&P PERIFERICOS S.A.C</span>
                </div>
                <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 border-b border-gray-100">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span className="flex-1">aaaaa@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 border-b border-gray-100">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <span className="flex-1">Los olivos</span>
                </div>
                <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 border-b border-gray-100">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span className="flex-1">987 782 217</span>
                </div>
                <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 border-b border-gray-100">
                    <Briefcase className="w-5 h-5 text-gray-600" />
                    <span className="flex-1">Tecnico TI</span>
                </div>
            </nav>
        </div>
        {/* Pie de Página Naranja para la Vista de Perfil */}
        <div className={`text-white space-y-2 bg-[${COLOR_NARANJA}] p-1`}>
            <NavItem icon={User} label="Perfil" isFooter={true} active={true} onClick={() => {}} />
            <NavItem icon={LogOut} label="Cerrar Sesión" isFooter={true} onClick={onBack} />
        </div>
    </div>
);


// --- Componente Principal Sidebar ---

const Sidebar: React.FC = () => {
    const location = useLocation();
    // Inicializar el estado de vista basado en la ruta (si es necesario) o por defecto a 'inicio'
    const [currentView, setCurrentView] = useState<'inicio' | 'perfil'>(
        location.pathname === '/perfil' ? 'perfil' : 'inicio'
    );

    const handleNavigation = (view: 'inicio' | 'perfil') => {
        setCurrentView(view);
        // Si vuelves a 'inicio', asegúrate de que la ruta sea '/'
        if (view === 'inicio' && location.pathname !== '/') {
            // NOTA: En un entorno de React real, podrías usar navigate('/') aquí.
            // Para esta simulación, solo actualizamos la vista interna.
        }
    };

    const isProfileView = currentView === 'perfil';

    return (
        // CONTENEDOR PRINCIPAL: Si es vista de inicio, fondo NEGRO. Si es perfil, el fondo blanco lo maneja PerfilView.
        <aside className={`fixed top-0 left-0 z-10 w-[240px] flex flex-col justify-between min-h-screen ${isProfileView ? 'bg-white' : `bg-[${COLOR_NEGRO_FONDO}]`}`}>
            {isProfileView ? (
                <PerfilView onBack={() => handleNavigation('inicio')} />
            ) : (
                <MainNav onNavigate={handleNavigation} currentPath={location.pathname} />
            )}
        </aside>
    );
};

export default Sidebar;
