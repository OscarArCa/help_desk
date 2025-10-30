import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {ArrowLeft, Send, User, MessageSquare, ExternalLink } from 'lucide-react';

// --- Códigos de Color ---
const COLOR_NARANJA = '#FFA82E';
const COLOR_RESPUESTA_HEADER = '#E0F0FF';
const COLOR_RESPUESTA_INPUT = '#F9F9F9';

// ✅ Importamos tu Sidebar real
import Sidebar from '../components/Sidebar';

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
        content: "It is a long established fact that a reader will be distracted by the readable content...",
        attachment: 'img.png'
    },
    {
        id: 2,
        sender: 'user',
        name: 'Alberto Perez',
        email: 'ingsoftware@gmail.com',
        date: '04 Enero 2023',
        time: '15:00 p.m.',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
    },
];

// --- Componente Base: Button ---
interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    className?: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className = '', children, ...props }) => (
    <button
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 
        hover:opacity-90 active:scale-[0.98] ${className}`}
        {...props}
    >
        {children}
    </button>
);

// --- Componente 1: Detalle del Ticket ---
const TicketDetailsPanel: React.FC = () => (
    <div className="w-[300px] bg-white flex flex-col h-full border-r border-gray-200">
        <div className="bg-gray-50 p-4 border-b">
            <span className="font-bold text-gray-800 text-sm">#T-0000001</span>
            <p className="text-xs text-gray-600">Motivo: Problema en el encendido</p>
            <p className="text-sm font-bold text-gray-900">Fallo en el encendido de la Laptop</p>
            <span className="px-2 py-1 bg-green-200 text-green-900 text-sm rounded mt-2 inline-block font-bold">
                Activo
            </span>
        </div>

        <div className="p-4 border-b text-sm text-gray-700">
            <p>Nombre: <strong>Alberto Perez</strong></p>
            <p>Empresa: <strong>J&P PERIFERICOS S.A.C</strong></p>
            <p>Sucursal: <strong>Jesus Maria</strong></p>
        </div>

        <div className="p-4 mt-auto">
            <Button className="w-full text-white h-14" style={{ backgroundColor: COLOR_NARANJA }}>
                Soporte In Situ
            </Button>
        </div>
    </div>
);

// --- Componente de Mensaje Individual ---
const MessageBlock: React.FC<{ message: Message }> = ({ message }) => (
    <div className="p-4 border-b">
        <div className="flex justify-between">
            <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <div>
                    <p className="font-semibold text-sm">{message.name}</p>
                    <p className="text-xs text-gray-500">{message.email}</p>
                </div>
            </div>
            <p className="text-xs text-gray-500">{message.date} {message.time}</p>
        </div>
        <p className="text-sm mt-2">{message.content}</p>

        {message.attachment && (
            <div className="mt-2 text-xs flex items-center text-gray-500">
                <ExternalLink className="w-3 h-3 mr-1" />
                {message.attachment}
            </div>
        )}
    </div>
);

// --- Panel de Conversación ---
const ConversationPanel: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const date = new Date();
        setMessages(prev => [
            ...prev,
            {
                id: prev.length + 1,
                sender: 'support',
                name: 'Alberto Perez - Soporte',
                email: 'alberto.perez@soporte.com',
                date: date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long' }),
                time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                content: newMessage.trim(),
            }
        ]);

        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-full bg-white border shadow-xl flex-1">
            <div className="flex-1 overflow-y-auto">
                {messages.map(msg => <MessageBlock key={msg.id} message={msg} />)}
                <div ref={chatEndRef} />
            </div>

            {/* Área de respuesta */}
            <div style={{ backgroundColor: COLOR_RESPUESTA_HEADER }}>
                <div className="flex justify-between px-4 py-2 border-b">
                    <h4 className="font-semibold">Responder</h4>
                </div>
                <form onSubmit={handleSendMessage} className="flex p-4 space-x-3">
                    <textarea
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        className="flex-1 border p-3 rounded-lg resize-none h-12 text-sm"
                        style={{ backgroundColor: COLOR_RESPUESTA_INPUT }}
                    />
                    <Button
                        type="submit"
                        className="w-12 h-12 text-white rounded-full shadow"
                        style={{ backgroundColor: COLOR_NARANJA }}
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

// --- Layout del Chat ---
const ChatLayout: React.FC = () => (
    <div className="h-full flex flex-col p-6 gap-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Link to="/tickets">
                    <ArrowLeft className="w-6 h-6 cursor-pointer" />
                </Link>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    Chat
                </h1>
            </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
            <TicketDetailsPanel />
            <div className="flex-1 pl-6">
                <ConversationPanel />
            </div>
        </div>
    </div>
);

// ✅ Sidebar aplicado correctamente ✅
const Chat: React.FC = () => (
    <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="ml-[240px] flex-1">
            <ChatLayout />
        </main>
    </div>
);

export default Chat;

