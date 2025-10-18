import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Edit, Plus, ExternalLink } from 'lucide-react';

// --- Códigos de Color ---
const COLOR_NARANJA = '#FFA82E';
const COLOR_RESPUESTA_HEADER = '#E0F0FF';
const COLOR_RESPUESTA_INPUT = '#F9F9F9';

// --- SIMULACIÓN DE COMPONENTES DE UI ---
const Button: React.FC<React.PropsWithChildren<React.ComponentPropsWithoutRef<'button'>>> = ({ className, children, ...props }) => (
    <button
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 ${className}`}
        {...props}
    >
        {children}
    </button>
);

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
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters...",
        attachment: 'img.png'
    },
    {
        id: 2,
        sender: 'user',
        name: 'Alberto Perez',
        email: 'ingsoftware@gmail.com',
        date: '04 Enero 2023',
        time: '15:00 p.m.',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
    },
    {
        id: 3,
        sender: 'user',
        name: 'Alberto Perez',
        email: 'ingsoftware@gmail.com',
        date: '04 Enero 2023',
        time: '15:00 p.m.',
        content: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form...",
        attachment: 'img.png'
    },
];

// Bloque de Mensaje Individual
const MessageBlock: React.FC<{ message: Message }> = ({ message }) => {
    return (
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

/**
 * Componente que maneja el historial de conversación y el formulario de respuesta.
 */
const ConversationPanel: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
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

export default ConversationPanel;
