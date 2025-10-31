import React, { useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import { useLocation, Link } from 'react-router-dom';
import { Home, Users, LogOut, User, ChevronLeft, Camera, Layout, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

const COLOR_NARANJA = '#FFA82E';
const COLOR_GRIS_ACTIVO = '#F5F5F5';
const COLOR_GRIS_HOVER = '#F8F8F8';
const COLOR_NEGRO_TEXTO = '#000000';

const Avatar: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
    <div className={className}>{children}</div>
);

const AvatarFallback: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
    <div className={`flex items-center justify-center ${className}`}>{children}</div>
);


interface NavItemProps {
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
    active?: boolean;
    to?: string;
    isFooter?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick, to, isFooter = false }) => {

    let baseClasses = `flex items-center gap-3 transition-colors cursor-pointer text-[0.9375rem] text-[${COLOR_NEGRO_TEXTO}] py-[0.75rem] px-3 hover:bg-[${COLOR_GRIS_HOVER}]`;

    if (active) {
        baseClasses = `flex items-center gap-3 bg-[${COLOR_GRIS_ACTIVO}] border-l-4 border-[#FF9500] text-[${COLOR_NEGRO_TEXTO}] font-medium py-[0.75rem] pl-[8px] pr-3 transition-colors cursor-pointer text-[0.9375rem]`;
    }

    if (isFooter) {
        baseClasses = `flex items-center gap-3 py-[0.75rem] px-4 text-[0.875rem] text-gray-700 hover:bg-[${COLOR_GRIS_ACTIVO}] transition-colors cursor-pointer font-normal`;
    }

    const Content = (
        <>
            <Icon className="w-5 h-5 text-gray-800 pl-[10px]" />
            <span>{label}</span>
        </>
    );

    const commonProps = {
        className: baseClasses,
        onClick: onClick
    };

    if (to) {
        return <Link to={to} {...commonProps}>{Content}</Link>;
    }

    return <div {...commonProps}>{Content}</div>;
};

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
}

interface MainNavProps {
    onNavigate: (view: 'inicio' | 'perfil') => void;
    currentPath: string;
}

const MainNav: React.FC<MainNavProps> = ({ onNavigate, currentPath }) => {
    // Lógica de rutas
    const isTicketsActive = currentPath === '/tickets';
    const isHomeActive = currentPath === '/inicio';
    const isClientesActive = currentPath === '/clientes';
    const { user } = useAuth();

    return (
        <div className="main-nav flex flex-col h-full bg-white">
            <div className='main-nav__content flex-grow flex flex-col'>
                <div className={`main-nav__header bg-[${COLOR_NARANJA}] h-[250px] flex flex-col items-center justify-center p-4 space-y-1`}>
                    <Avatar className="main-nav__avatar-wrapper w-20 h-20 rounded-full overflow-hidden bg-white shadow-md">
                        <AvatarFallback className={`main-nav__avatar-fallback bg-white text-white w-full h-full text-4xl`}>
                            <User className="w-[175px] h-[175px] text-white" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="main-nav__user-info text-white text-center mt-3">
                        <p className="main-nav__user-name font-semibold text-lg">{user?.name}</p>
                        <p className="main-nav__user-role text-sm opacity-90">{user?.roles}</p>
                    </div>
                </div>

                <nav className="main-nav__links-container flex flex-col pt-3 pb-4 ">
                    <NavItem icon={Home} label="Inicio" to="/inicio" active={isHomeActive} />
                    <NavItem icon={Layout} label="Tickets" to="/tickets" active={isTicketsActive} />
                    <NavItem icon={Users} label="Cliente" to="/clientes" active={isClientesActive} />
                </nav>
            </div>

            <div className="main-nav__footer-container border-t border-gray-200 py-2">
                <NavItem icon={User} label="Perfil" isFooter={true} onClick={() => onNavigate('perfil')} />
                <NavItem icon={LogOut} label="Cerrar Sesión" isFooter={true} onClick={logout} />
            </div>
        </div>
    );
};

interface PerfilViewProps {
    onBack: () => void;
}

interface DetailItemProps {
    icon: React.ElementType;
    label: string;
    isBold?: boolean;
    isLast?: boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon: Icon, label, isBold = false, isLast = false }) => (
    <div className={`flex items-center gap-4 py-3 px-4 mx-2 border-b border-gray-100 ${isLast ? 'border-b-0' : ''} hover:bg-gray-50 rounded-md transition-colors`}>
        <Icon className="w-5 h-5 text-gray-500" />
        <span className={`${isBold ? 'font-medium text-gray-800' : 'text-gray-700'} text-sm flex-grow`}>
            {label}
        </span>
    </div>
);


const PerfilView: React.FC<PerfilViewProps> = ({ onBack }) => (
    <div className="profile-view flex flex-col h-full bg-white text-gray-800">
        <div className='profile-view__scroll-content flex-grow overflow-y-auto'>
            <div className="profile-view__header flex items-center p-4 h-16 border-b border-gray-200">
                <ChevronLeft className="w-6 h-6 text-gray-600 cursor-pointer hover:text-orange-500 transition-colors" onClick={onBack} />
                <span className="ml-2 text-lg font-semibold">Perfil</span>
            </div>

            <div className="flex flex-col items-center p-8 space-y-4">
                <div className="relative w-32 h-32 rounded-full bg-gray-100 flex flex-col justify-center items-center text-gray-500 shadow-inner cursor-pointer hover:bg-gray-200 transition-colors">
                    <Camera className="w-8 h-8" />
                    <span className="text-xs font-medium text-center p-2 leading-tight">Añadir una foto de perfil</span>
                </div>
                <p className="font-bold text-xl text-gray-800">Carlos Manuel</p>
                <p className="text-sm text-gray-500">ID: 9 2 2 2 2 3 4</p>
            </div>

            <nav className="flex flex-col px-2 pb-4">
                <DetailItem icon={Users} label="J&P PERIFERICOS S.A.C" isBold />
                <DetailItem icon={Mail} label="aaaaa@gmail.com" />
                <DetailItem icon={MapPin} label="Los olivos" />
                <DetailItem icon={Phone} label="987 782 217" />
                <DetailItem icon={Briefcase} label="Tecnico TI" isLast />
            </nav>
        </div>

        <div className="profile-view__footer-container border-t border-gray-200 py-2">
            <NavItem icon={ChevronLeft} label="Volver a Navegación" isFooter={true} onClick={onBack} />
        </div>
    </div>
);



const Sidebar: React.FC = () => {
    const location = useLocation();
    const [currentView, setCurrentView] = useState<'inicio' | 'perfil'>(
        location.pathname === '/perfil' ? 'perfil' : 'inicio'
    );

    const handleNavigation = (view: 'inicio' | 'perfil') => {
        setCurrentView(view);
    };

    const isProfileView = currentView === 'perfil';

    return (
        <aside className="sidebar-container fixed top-0 left-0 z-40 w-[240px] flex flex-col h-screen bg-white shadow-xl">
            {isProfileView ? (
                <PerfilView onBack={() => handleNavigation('inicio')} />
            ) : (
                <MainNav onNavigate={handleNavigation} currentPath={location.pathname} />
            )}
        </aside>
    );
};

export default Sidebar;