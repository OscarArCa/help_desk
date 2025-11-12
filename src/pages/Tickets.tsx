import React from 'react';
import { History } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TicketsTable from '@/components/TicketsTable';

const Tickets: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />

            <main className="flex-1 ml-[240px] p-8 bg-gray-50">
                <Header
                    title="Historial de Tickets"
                    icon={History}
                />
                <TicketsTable />
            </main>
        </div>
    );
};

export default Tickets;