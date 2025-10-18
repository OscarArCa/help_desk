import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, ArrowLeft, Send, User, LogOut, Users, MessageSquare, Edit, Plus, ExternalLink } from 'lucide-react';

// --- Códigos de Color ---
const COLOR_NARANJA = '#FFA82E';
const COLOR_GRIS_OSCURO = '#3A3A3C';
const COLOR_ESTADO_ACTIVO = '#90EE90';
const COLOR_RESPUESTA_HEADER = '#E0F0FF';
const COLOR_RESPUESTA_INPUT = '#F9F9F9';

// --- Tipado y Datos de Mensajes ---
interface Message {
    id: number;
    sender: 'user' | 'support';
    name: string;
    email: string;
    date: string;
    time: string;
    content: string;
    attachment?: string;
}

const initialMessages: Message[] = [
    {
        id: 1,
        sender: 'support',
        name: 'Fernandes - Soporte',
        email: 'ejemplo07@gmail.com',
        date: '04 Enero 2023',
        time: '14:00 p.m.',
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
        attachment: 'img.png'
    },
    {
        id: 2,
        sender: 'user',
        name: 'Alberto Perez',
        email: 'ingsoftware@gmail.com',
        date: '04 Enero 2023',
        time: '15:00 p.m.',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
    },
    {
        id: 3,
        sender: 'user',
        name: 'Alberto Perez',
        email: 'ingsoftware@gmail.com',
        date: '04 Enero 2023',
        time: '15:00 p.m.',
        content: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
        attachment: 'img.png'
    },
];

// --- Componente Base: Button ---
interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    className?: string;
    // Se usa React.ReactNode en lugar de la importación separada
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className = '', children, ...props }) => (
    <button
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 
        hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[${COLOR_NARANJA}] focus:ring-offset-2
        ${className}`}
        {...props}
    >
        {children}
    </button>
);

// --- Componente Sidebar ---
interface SidebarProps {
    currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage }) => {
    const activeBorderClass = `border-[${COLOR_NARANJA}]`;

    interface NavItemProps {
        to: string;
        icon: React.ElementType;
        label: string;
        active?: boolean;
    }

    const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, active }) => (
        <Link
            to={to}
            className={`flex items-center space-x-3 p-3 rounded-lg text-gray-700 transition-all duration-150 hover:bg-gray-100/80 border-l-4 border-transparent ${active ? 'bg-gray-100 font-semibold border-l-4 ' + activeBorderClass : ''}`}
        >
            <Icon className="w-5 h-5 text-gray-700" />
            <span className="text-sm">{label}</span>
        </Link>
    );

    const isActive = (path: string) => currentPage === path;

    return (
        <nav className={`fixed left-0 top-0 h-full w-[240px] bg-white text-gray-900 shadow-xl z-40 flex flex-col`}>

            {/* 1. SECCIÓN DE PERFIL (Fondo Naranja) */}
            <div className="p-6 text-white flex flex-col items-center" style={{ backgroundColor: COLOR_NARANJA }}>
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2">
                    <User className="w-10 h-10" style={{ color: COLOR_NARANJA }} />
                </div>
                <p className="font-bold text-lg">Alberto Perez</p>
                <p className="text-sm font-light">Soporte TI</p>
            </div>

            {/* 2. SECCIÓN DE NAVEGACIÓN PRINCIPAL */}
            <div className="flex-1 p-3 space-y-1">
                <NavItem to="/" icon={Home} label="Inicio" active={isActive('/')} />
                <NavItem to="/tickets" icon={FileText} label="Tickets" active={isActive('/tickets') || isActive('/chat')} />
                <NavItem to="/clientes" icon={Users} label="Clientes" active={isActive('/clientes')} />
            </div>

            {/* 3. SECCIÓN INFERIOR (Perfil y Cerrar Sesión) */}
            <div className="p-3 border-t mt-auto space-y-1">
                <NavItem to="/perfil" icon={User} label="Perfil" active={isActive('/perfil')} />
                <NavItem to="/logout" icon={LogOut} label="Cerrar Sesión" active={isActive('/logout')} />
            </div>
        </nav>
    );
};

// --- Componente 1: Detalle del Ticket (Panel Izquierdo) ---
const TicketDetailsPanel: React.FC = () => (
    <div className="w-[300px] bg-white flex flex-col h-full border-r border-gray-200">

        {/* SECCIÓN 1: ENCABEZADO DEL TICKET (Fondo Gris Claro) */}
        <div className="bg-gray-50 p-4 border-b">
            <div className="text-sm mb-1">
                <span className="font-semibold text-gray-800">#T-0000001</span>
            </div>
            <p className="text-xs text-gray-600">Motivo: Problema en el encendido</p>
            <p className="text-sm font-bold text-gray-900">Asunto: Fallo en el encendido de la Laptop</p>
            <span className={`px-2 py-1 mt-2 inline-block rounded text-sm font-bold`} style={{ backgroundColor: COLOR_ESTADO_ACTIVO, color: '#1B5E20' }}>
                Activo
            </span>
        </div>

        {/* SECCIÓN 2: INFORMACIÓN DEL CLIENTE (Fondo Blanco) */}
        <div className="bg-white p-4 border-b">
            <h3 className="text-lg font-extrabold text-gray-800 mb-3 text-center">Informacion de Cliente</h3>
            <div className="text-sm space-y-2 text-gray-600">
                <p>Nombre Cliente: <span className="font-medium text-gray-800">Alberto Perez</span></p>
                <p>Empresa: <span className="font-medium text-gray-800">J&P PERIFERICOS S.A.C.</span></p>
                <p>Sucursal: <span className="font-medium text-gray-800">Jesus Maria</span></p>
                <p>Area: <span className="font-medium text-gray-800">Administracion</span></p>
            </div>
        </div>

        {/* SECCIÓN 3: DETALLES TÉCNICOS (Fondo Blanco, separado por línea) */}
        <div className="bg-white p-4 border-b">
            <div className="text-sm space-y-2 text-gray-600">
                <p>Equipo: <span className="font-medium text-gray-800">Laptop</span></p>
                <p>Prioridad: <span className="font-medium text-gray-800" style={{ color: 'red' }}>Alta</span></p>
            </div>
        </div>

        {/* SECCIÓN 4: PIN DE USUARIO (Fondo Gris Claro) */}
        <div className="bg-gray-50 p-4 border-b">
            <h3 className="text-lg font-extrabold text-gray-800 text-center mb-3">Pin de Usuario</h3>
            <div className="bg-white p-3 rounded-lg text-2xl font-mono tracking-widest text-center shadow-inner text-gray-700 border border-gray-200">
                9 8 7 6 5 4 3
            </div>
        </div>

        {/* SECCIÓN 5: BOTÓN DE ACCIÓN (Soporte In Situ) */}
        <div className="p-4 mt-auto">
            <Button className="w-full text-white text-xl font-bold shadow-lg h-14" style={{ backgroundColor: COLOR_NARANJA }}>
                Soporte In Situ
            </Button>
        </div>
    </div>
);


// --- Componente 2.1: Bloque de Mensaje Individual (Diseño Final) ---
const MessageBlock: React.FC<{ message: Message }> = ({ message }) => {
    return (
        // Se asegura el padding lateral para que el texto no toque los bordes del panel
        <div className="p-4 border-b border-gray-300">
            {/* Cabecera del Mensaje */}
            <div className="flex justify-between items-center pb-2">
                <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-700" />
                    <div>
                        <p className="font-semibold text-sm text-gray-800">{message.name}</p>
                        <p className="text-xs text-gray-500">{message.email}</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500">{message.date} {message.time}</p>
            </div>

            {/* Contenido del Mensaje */}
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mt-2">
                {message.content}
            </p>

            {/* Archivo Adjunto (si existe) */}
            {message.attachment && (
                <div className="mt-3 text-xs font-mono text-gray-500 flex items-center">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    {message.attachment}
                </div>
            )}
        </div>
    );
};

// --- Componente 2.2: Panel de Conversación (Panel Derecho) ---
const ConversationPanel: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState<string>('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const date = new Date();
        const newMessageObject: Message = {
            id: messages.length + 1,
            sender: 'support',
            name: 'Alberto Perez - Soporte',
            email: 'alberto.perez@soporte.com',
            date: date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long' }).replace(' ', '/').replace('.', ''),
            time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }).replace(':', ':') + ' p.m.',
            content: newMessage.trim(),
        };

        setMessages([...messages, newMessageObject]);
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-full bg-white border-t border-b border-r shadow-xl">

            {/* Área de Mensajes (Scrollable) */}
            <div className="flex-1 overflow-y-auto">
                {messages.map((msg) => (
                    <MessageBlock key={msg.id} message={msg} />
                ))}
                <div ref={chatEndRef} /> {/* Marcador para el scroll */}
            </div>

            {/* Área de Respuesta (Fija al fondo) */}
            <div className={`border-t`} style={{ backgroundColor: COLOR_RESPUESTA_HEADER }}>

                {/* Header de Responder */}
                <div className="flex justify-between items-center px-4 py-3 border-b" style={{ backgroundColor: COLOR_RESPUESTA_HEADER }}>
                    <div className="flex items-center space-x-2">
                        <Edit className="w-4 h-4 text-gray-700" />
                        <h4 className="font-semibold text-gray-700">Responder</h4>
                    </div>
                    <div className="flex space-x-2">
                        <Button className="w-8 h-8 p-0 bg-white hover:bg-gray-100 border border-gray-300 rounded-full shadow-sm" title="Adjuntar Archivo">
                            <Plus className="w-4 h-4 text-gray-600" />
                        </Button>
                    </div>
                </div>

                {/* Formulario de Mensaje */}
                <form onSubmit={handleSendMessage} className="flex p-4 space-x-3">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe tu respuesta..."
                        className={`flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-12 text-sm`}
                        style={{ backgroundColor: COLOR_RESPUESTA_INPUT }}
                    />
                    <Button
                        type="submit"
                        className={`text-white font-bold w-12 h-12 self-end rounded-full shadow-lg`}
                        style={{ backgroundColor: COLOR_NARANJA }}
                        title="Enviar Mensaje"
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

// --- Componente que maneja el layout completo (Header + Grid) ---
const ChatLayout: React.FC = () => (
    <div className="p-8 pb-4 h-full flex flex-col">
        {/* CABECERA PRINCIPAL (CON BACK Y TÍTULO) */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
                <Link to="/tickets">
                    <ArrowLeft className={`w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800`} />
                </Link>
                <h1 className="text-3xl font-extrabold text-gray-900 flex items-center space-x-2">
                    <MessageSquare className={`w-8 h-8`} style={{ color: COLOR_GRIS_OSCURO }} />
                    <span>Chat</span>
                </h1>
            </div>

            {/* Detalles de la Empresa */}
            <div className="text-right text-sm">
                <p className="font-semibold text-gray-800">J&P PERIFERICOS S.A.C.</p>
                <p className="text-xs text-gray-500">Los Olivos</p>
            </div>
        </div>

        {/* CONTENIDO PRINCIPAL: GRID DE DETALLES Y CHAT */}
        {/* Se usa flexbox para asegurar que ambos paneles ocupen la altura restante */}
        <div className="flex flex-1 overflow-hidden">

            {/* Panel de Detalles del Ticket (Ancho Fijo) */}
            <div className="h-full overflow-y-auto">
                <TicketDetailsPanel />
            </div>

            {/* Panel de Conversación (Ocupa el resto del ancho) */}
            <div className="flex-1 h-full pl-8"> {/* Pl-8 para el espacio entre TicketDetails y Chat */}
                <ConversationPanel />
            </div>
        </div>
    </div>
);


// --- 3. Componente Principal Chat (Orquestador) ---
const Chat: React.FC = () => {
    const [currentPage] = useState('/chat');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar (Fijo a la izquierda) */}
            <Sidebar currentPage={currentPage} />

            {/* Contenido Principal (ML-[240px] mueve el contenido para que comience después del Sidebar) */}
            <main className="ml-[240px] flex-1 min-h-screen">
                {/* Se asegura que el ChatLayout tome la altura completa de la pantalla - sidebar */}
                <div className="h-screen flex flex-col">
                    <ChatLayout />
                </div>
            </main>
        </div>
    );
};

// Exportamos 'Chat'
export default Chat;
