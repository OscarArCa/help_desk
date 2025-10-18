// src/pages/Tickets.tsx

import React from 'react';
import { History } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header'; // Importamos el nuevo Header
import TicketsTable from '@/components/TicketsTable'; // Importamos la nueva Tabla

const Tickets: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Sidebar />

            {/* Aplicamos el margen ml-[240px] para compensar el Sidebar fijo */}
            <main className="ml-[240px] flex-1 p-8 bg-gray-50">

                {/* Nuevo Header Reutilizable: Muestra "Historial de Tickets" con el ícono History */}
                <Header
                    title="Historial de Tickets"
                    icon={History} // Usamos el ícono de Historia como se ve en el diseño
                />

                {/* Nuevo Componente de Tabla (con filtros y datos) */}
                <TicketsTable />

            </main>
        </div>
    );
};

export default Tickets;