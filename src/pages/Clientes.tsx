import React from 'react';
import { Users } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ClientesTable from '@/components/ClientesTable';

const Clientes: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-white relative">
            <Sidebar />
            <main className="flex-1 ml-[240px] p-8 bg-gray-50 relative">
                <Header title="Clientes" icon={Users} />
                <ClientesTable />
            </main>
        </div>
    );
};

export default Clientes;


