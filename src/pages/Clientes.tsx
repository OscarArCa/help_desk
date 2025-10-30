// src/pages/Clientes.tsx

import React from 'react';
import { Users, Search } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ClientesTable from '@/components/ClientesTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const COLOR_NARANJA = '#FFA82E';

const Clientes: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Sidebar fijo a la izquierda */}
            <Sidebar />

            {/* Contenedor principal desplazado por Sidebar */}
            <main className="ml-[240px] flex-1 p-8 bg-gray-50">

                {/* Header arriba */}
                <Header
                    title="Clientes"
                    icon={Users}
                />

                {/* Filtros */}
                <div className="mt-6 space-y-6">

                    <div className="flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                        {/* RUC */}
                        <div className="flex items-center space-x-1 text-sm">
                            <label className="font-medium">Ruc:</label>
                            <Input placeholder="Ruc" className="w-[120px] h-8 text-sm" />
                        </div>

                        {/* Empresa */}
                        <div className="flex items-center space-x-1 text-sm">
                            <label className="font-medium">Empresa:</label>
                            <Input placeholder="Empresa" className="w-[140px] h-8 text-sm" />
                        </div>

                        {/* Botón de búsqueda */}
                        <Button className="h-8 w-8 p-0" style={{ backgroundColor: COLOR_NARANJA }}>
                            <Search className="h-4 w-4 text-white" />
                        </Button>

                        {/* Search general */}
                        <Input placeholder="Buscar" className="flex-1 h-8 text-sm" />
                    </div>

                    {/* Tabla de Clientes debajo */}
                    <ClientesTable />
                </div>
            </main>
        </div>
    );
};

export default Clientes;
