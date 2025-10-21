import React from 'react';
import { MessageSquare } from 'lucide-react';

interface Ticket {
    id: string;
    formattedSupport: string;
    time: string;
    status: string;
}

interface TicketMessagesProps {
    tickets: Ticket[];
    newMessagesCount?: number;
}

const TicketMessages: React.FC<TicketMessagesProps> = ({ tickets, newMessagesCount = 1 }) => {
    return (
        <div className="ticket-messages">
            <div className="ticket-messages-header">
                <MessageSquare size={24} />
                <h2 className="ticket-messages-title">Mensajes de Tickets</h2>
            </div>
            <div className="ticket-list">
                {tickets.map((ticket, index) => (
                    <div key={index} className="ticket-item">
                        <div className="ticket-item-left">
                            <span className="ticket-id">{ticket.id}</span>
                            <span>{ticket.formattedSupport}</span>
                            <span className="ticket-reason">Tu razon 75 mins</span>
                        </div>
                        <div className="ticket-item-right">
                            <span>{ticket.status}</span>
                            <span className="ticket-time">{ticket.time}</span>
                        </div>
                    </div>
                ))}
                <div className="ticket-messages-footer">
                    Tienes {newMessagesCount} mensaje nuevo por leer
                </div>
            </div>
        </div>
    );
};

export default TicketMessages;