import React from 'react';
import { MapPin } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TicketsInSituTable from '@/components/TicketsTable';

const Tickets_inSitu: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />

            <main className="flex-1 ml-[240px] p-8 bg-gray-50">
                <Header
                    title="Tickets In Situ"
                    icon={MapPin}
                />
                <TicketsInSituTable />
            </main>
        </div>
    );
};

export default Tickets_inSitu;