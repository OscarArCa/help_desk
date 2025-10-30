// src/components/ClientesTable.tsx
import React from 'react';
import { Settings } from 'lucide-react';

const COLOR_NARANJA = '#FFA82E';

const CLIENTES_DATA = [
    { ID: 123, Ruc: '28478654321', Empresa: 'Shop center', Direccion: 'Cercado de Lima', Nombre: 'Alberto Perez', Telefono: '987 782 217', Correo: 'ingsoftware@gmail.com', Plan: 3 },
    { ID: 124, Ruc: '10254897651', Empresa: 'Tecno Soluciones', Direccion: 'San Isidro', Nombre: 'Sara Martinez', Telefono: '954 123 789', Correo: 'sara.m@tsol.com', Plan: 2 },
    { ID: 125, Ruc: '20159874563', Empresa: 'Distribuidora F&G', Direccion: 'Los Olivos', Nombre: 'Jose Hernandez', Telefono: '932 456 120', Correo: 'jhernandez@dfg.com', Plan: 1 },
];

const ClientesTable: React.FC = () => {
    return (
        <div className="space-y-6 mt-6">

            {/* TABLA */}
            <div className="overflow-x-auto border rounded-lg shadow-md">

                {/* CABECERA */}
                <div className="grid grid-cols-[60px_150px_170px_170px_180px_150px_200px_80px_50px] text-sm font-semibold text-white"
                     style={{ backgroundColor: COLOR_NARANJA }}>
                    {['ID','Ruc','Empresa','Dirección','Nombre','Teléfono','Correo','Plan',''].map(text => (
                        <div key={text} className="p-3">{text}</div>
                    ))}
                </div>

                {/* FILAS */}
                {CLIENTES_DATA.map((cliente, index) => (
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

                        {/* PLAN como etiqueta */}
                        <div className="p-1">
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                                {cliente.Plan}
                            </span>
                        </div>

                        {/* ACCIONES */}
                        <div className="p-1 flex justify-center">
                            <Settings className="h-5 w-5 cursor-pointer hover:opacity-80"
                                      style={{ color: COLOR_NARANJA }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientesTable;
