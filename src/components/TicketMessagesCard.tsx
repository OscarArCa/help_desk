// components/TicketMessagesCard.tsx

import React from 'react';
import { MessageSquare } from "lucide-react";

const COLOR_NARANJA = "#FFA82E";
const COLOR_GRIS_CLARO = "#F5F5F5";

// Tipado de mensajes
interface Message {
    id: string;
    message: string;
    time: string;
}

interface TicketMessagesCardProps {
    messages: Message[];
}

const TicketMessagesCard: React.FC<TicketMessagesCardProps> = ({ messages }) => {
    return (
        <div className="w-full max-w-[900px] bg-white rounded-xl shadow-lg border border-gray-100 p-[10px] mt-[20px]">
            {/* Encabezado centrado */}
            <div className="flex items-center justify-center mb-4 space-x-3">
                <MessageSquare className="w-[40px] h-[40px] text-[#000000] m-[10px]" />
                <h2 className="text-lg font-semibold text-gray-900">Mensajes de Tickets</h2>
            </div>

            <div className={`rounded-lg p-3 bg-[${COLOR_GRIS_CLARO}] divide-y divide-gray-200`}>
                {messages.map((msg) => (

                    <div
                        key={msg.id}

                        className="flex items-center justify-between py-2 text-sm text-gray-700 p-[10px]"
                    >
                        <div>
                            <span className="font-mono text-gray-600 mr-2">{msg.id}</span>
                            {msg.message}
                        </div>
                        <span className="text-xs font-medium" style={{ color: COLOR_NARANJA }}>{msg.time}</span>
                    </div>
                ))}
            </div>

            <div className="text-right mt-4 text-sm font-medium" style={{ color: COLOR_NARANJA }}>
                Tienes 1 mensaje nuevo por leer
            </div>
        </div>
    );
};

export default TicketMessagesCard;