import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ValorizacionModal } from "../components/ValorizacionModal";
import TicketMessagesCard from "../components/TicketMessagesCard";

import StatsCard from "../components/StatsCard";
import type { StatsCardProps } from "../components/StatsCard";

import { Home, FileText, Bell, History, Star } from "lucide-react";

interface Message {
    id: string;
    message: string;
    time: string;
}

const Inicio_inSitu: React.FC = () => {
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
                <Header title="Inicio In Situ" icon={Home} />

                <main className="flex-1 w-full flex flex-col items-center px-8 py-6 space-y-10">
                    <div className="flex flex-wrap justify-center gap-8">
                        {stats.map((s, idx) => (
                            <StatsCard
                                key={s.title}
                                title={s.title}
                                value={s.value}
                                Icon={s.Icon}
                                onClick={() => idx === 3 && setIsValorizacionOpen(true)}
                            />
                        ))}
                    </div>

                    <TicketMessagesCard messages={messages} />
                </main>
            </div>

            <ValorizacionModal
                isOpen={isValorizacionOpen}
                onOpenChange={setIsValorizacionOpen}
                cliente={{ nombre: "Cliente prueba", ubicacion: "Lima" }}
            />
        </div>
    );
};

export default Inicio_inSitu;
