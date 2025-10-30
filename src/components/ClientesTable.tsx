import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ClienteModal from '@/components/ClienteModal';

const COLOR_NARANJA = '#FFA82E';

const CLIENTES_DATA = [
    { ID: 123, Ruc: '28478654321', Empresa: 'Shop center', Direccion: 'Cercado de Lima', Nombre: 'Alberto Perez', Telefono: '987 782 217', Correo: 'ingsoftware@gmail.com', Plan: 3 },
    { ID: 124, Ruc: '10254897651', Empresa: 'Tecno Soluciones', Direccion: 'San Isidro', Nombre: 'Sara Martinez', Telefono: '954 123 789', Correo: 'sara.m@tsol.com', Plan: 2 },
    { ID: 125, Ruc: '20159874563', Empresa: 'Distribuidora F&G', Direccion: 'Los Olivos', Nombre: 'Jose Hernandez', Telefono: '932 456 120', Correo: 'jhernandez@dfg.com', Plan: 1 },
];

const ClientesTable: React.FC = () => {
    const [ruc, setRuc] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(CLIENTES_DATA);
    const [selectedCliente, setSelectedCliente] = useState<any>(null);

    useEffect(() => {
        const result = CLIENTES_DATA.filter((cliente) => {
            const matchesRuc = ruc ? cliente.Ruc.includes(ruc) : true;
            const matchesEmpresa = empresa ? cliente.Empresa.toLowerCase().includes(empresa.toLowerCase()) : true;
            const matchesSearch = search
                ? Object.values(cliente).join(' ').toLowerCase().includes(search.toLowerCase())
                : true;
            return matchesRuc && matchesEmpresa && matchesSearch;
        });
        setFilteredData(result);
    }, [ruc, empresa, search]);

    return (
        <div className="space-y-6 mt-6 ml-[20px] mr-[20px]">
            {/* FILTROS */}
            <div className="flex items-center flex-wrap space-x-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex-1 min-w-[200px] max-w-[300px] m-[10px]">
                    <label className="text-sm font-semibold">Ruc</label>
                    <Input
                        value={ruc}
                        onChange={(e) => setRuc(e.target.value)}
                        placeholder="Ruc"
                        className="w-[120px] h-8 text-sm"
                    />
                </div>

                <div className="flex-1 min-w-[200px] max-w-[300px] m-[10px]">
                    <label className="text-sm font-semibold">Empresa</label>
                    <Input
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        placeholder="Empresa"
                        className="w-[140px] h-8 text-sm"
                    />
                </div>

                <div className="min-w-[120px] max-w-[300px] m-[10px]">
                    <label className="text-sm font-semibold">Buscar</label>
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar..."
                        className="w-[200px] h-8 text-sm"
                    />
                </div>
            </div>

            {/* TABLA */}
            <div className="overflow-x-auto border rounded-lg shadow-md">
                <div
                    className="grid grid-cols-[60px_150px_170px_170px_180px_150px_200px_80px_50px] text-sm font-semibold text-white p-[10px]"
                    style={{ backgroundColor: COLOR_NARANJA }}
                >
                    {['ID', 'Ruc', 'Empresa', 'Dirección', 'Nombre', 'Teléfono', 'Correo', 'Plan', ''].map((text) => (
                        <div key={text} className="p-3">{text}</div>
                    ))}
                </div>

                {filteredData.map((cliente, index) => (
                    <div
                        key={cliente.ID}
                        className={`grid grid-cols-[60px_150px_170px_170px_180px_150px_200px_80px_50px] text-sm border-b p-3 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                    >
                        <div className="p-1 font-medium text-gray-800">{cliente.ID}</div>
                        <div className="p-1">{cliente.Ruc}</div>
                        <div className="p-1">{cliente.Empresa}</div>
                        <div className="p-1">{cliente.Direccion}</div>
                        <div className="p-1">{cliente.Nombre}</div>
                        <div className="p-1">{cliente.Telefono}</div>
                        <div className="p-1 truncate">{cliente.Correo}</div>
                        <div className="p-1">
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                                {cliente.Plan}
                            </span>
                        </div>
                        <div className="p-1 flex justify-center">
                            <Settings
                                className="h-5 w-5 cursor-pointer hover:opacity-80"
                                style={{ color: COLOR_NARANJA }}
                                onClick={() => setSelectedCliente(cliente)}
                            />
                        </div>
                    </div>
                ))}

                {filteredData.length === 0 && (
                    <div className="text-center text-gray-500 text-sm py-4">
                        No se encontraron resultados.
                    </div>
                )}
            </div>

            {/* MODAL CLIENTE */}
            {selectedCliente && (
                <ClienteModal onClose={() => setSelectedCliente(null)} />
            )}
        </div>
    );
};

export default ClientesTable;
