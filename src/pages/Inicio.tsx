import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ValorizacionModal } from "../components/ValorizacionModal";
import TicketMessagesCard from "../components/TicketMessagesCard";
import { Home, FileText, Bell, History, Star } from "lucide-react"; // Se elimina MessageSquare de la importación

const COLOR_NARANJA = "#FFC676";
    
interface StatsCardProps {
    title: string;
    value: string | number;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, Icon, onClick }) => (
    <div
        onClick={onClick}
        className="flex flex-col justify-between items-start rounded-[10px] shadow-xl p-6 text-black select-none cursor-pointer transition-transform hover:scale-105 ml-[20px] p-[10px]"
        style={{
            backgroundColor: COLOR_NARANJA,
            width: 300,
            height: 300,
            minWidth: 300,
            minHeight: 300,
            maxWidth: 300,
            maxHeight: 300,

        }}
    >
        <div className="w-full flex items-start justify-between">
            <Icon className="w-[85px] h-[85px]" />
            <div className="text-left">
                <h3 className="text-lg font-semibold text-black">{title}</h3>
            </div>

        </div>

        <div className="w-full flex flex-col items-start">
            <div className="w-full flex justify-between items-center">

                <div className="text-[36px] font-extrabold text-black">{value}</div>

                <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        if (onClick) onClick();
                    }}

                    className="bg-white text-black font-semibold py-2 px-4 rounded-md shadow-sm hover:opacity-90"
                >
                    Ver
                </button>
            </div>

        </div>
    </div>
);

interface Message {
    id: string;
    message: string;
    time: string;
}

// Inicio
const Inicio: React.FC = () => {
    const [isValorizacionOpen, setIsValorizacionOpen] = useState(false);

    const stats: StatsCardProps[] = [
        { title: "Tickets Activos", value: 5, Icon: FileText },
        { title: "Tickets Urgentes", value: 2, Icon: Bell },
        { title: "Historial de Tickets", value: 25, Icon: History },
        { title: "Valorización", value: "90%", Icon: Star },
    ];

    const messages: Message[] = [
        { id: "#T-0000001", message: "Fernandes - Soporte. Te envió un mensaje de seguimiento...", time: "hace 20 min" },
        { id: "#T-0000002", message: "Actualización de estado.", time: "hace 1 hora" },
        { id: "#T-0000003", message: "Actualización de estado.", time: "hace 1 hora" },
        { id: "#T-0000004", message: "Actualización de estado.", time: "hace 1 hora" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Sidebar />

            <div className="ml-[240px] min-h-screen flex flex-col">
                <Header title="Inicio" icon={Home} />

                <main className="flex-1 w-full flex flex-col items-center px-8 py-6 space-y-10">

                    {/* Cards */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {stats.map((s, idx) => {
                            const openModal = idx === 3;
                            return (
                                <StatsCard
                                    key={s.title}
                                    title={s.title}
                                    value={s.value}
                                    Icon={s.Icon}
                                    onClick={() => {
                                        if (openModal) setIsValorizacionOpen(true);
                                    }}
                                />
                            );
                        })}
                    </div>

                    <TicketMessagesCard messages={messages} />

                </main>
            </div>

            {/* Modal Valorización */}
            <ValorizacionModal
                isOpen={isValorizacionOpen}
                onOpenChange={setIsValorizacionOpen}
                cliente={{ nombre: "Cliente prueba", ubicacion: "Lima" }}
            />
        </div>
    );
};

export default Inicio;