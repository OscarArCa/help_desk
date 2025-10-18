// src/components/TicketsTable.tsx

import React from 'react';
import { Search, Calendar, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
// Importación CORRECTA de Shadcn/ui (asumiendo que instalaste 'select' en src/components/ui)
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const COLOR_NARANJA = '#FFA82E';

// --- Datos Falsos para la Tabla (Basado en la imagen) ---
const tickets = [
    { id: 1, tipo: 'Falla en el Software de pc', usuario: 'Alberto Perez', empresa: 'PEA DH', area: 'TI', sucursal: 'Los Olivos', estado: 'Inactivo', fecha: '04 Ago 2024' },
    { id: 2, tipo: 'Falla en el Software de pc', usuario: 'Jose Hernandez', empresa: 'PEA DH', area: 'TI', sucursal: 'San Isidro', estado: 'Activo', fecha: '04 Ago 2024' },
    { id: 3, tipo: 'Falla en el Software de pc', usuario: 'Alberto Perez', empresa: 'PEA DH', area: 'TI', sucursal: 'Santa Anita', estado: 'Inactivo', fecha: '04 Ago 2024' },
    { id: 4, tipo: 'Falla en el Software de pc', usuario: 'Alberto Perez', empresa: 'PEA DH', area: 'TI', sucursal: 'Los Olivos', estado: 'Activo', fecha: '04 Ago 2024' },
    { id: 5, tipo: 'Falla en el Software de pc', usuario: 'Alberto Perez', empresa: 'PEA DH', area: 'TI', sucursal: 'San Isidro', estado: 'Inactivo', fecha: '18 Feb 2024' },
    { id: 6, tipo: 'Falla en el Software de pc', usuario: 'Jose Hernandez', empresa: 'PEA DH', area: 'TI', sucursal: 'Santa Anita', estado: 'Activo', fecha: '24 Oct 2023' },
    { id: 7, tipo: 'Falla en el Software de pc', usuario: 'Jose Hernandez', empresa: 'PEA DH', area: 'TI', sucursal: 'Los Olivos', estado: 'Inactivo', fecha: '04 Ago 2024' },
    { id: 8, tipo: 'Falla en el Software de pc', usuario: 'Miguel Alvarado', empresa: 'PEA DH', area: 'TI', sucursal: 'San Isidro', estado: 'Activo', fecha: '04 Ago 2024' },
    { id: 9, tipo: 'Falla en el Software de pc', usuario: 'Sara Martinez', empresa: 'PEA DH', area: 'TI', sucursal: 'Santa Anita', estado: 'Inactivo', fecha: '18 Feb 2024' },
    { id: 10, tipo: 'Falla en el Software de pc', usuario: 'Miguel Alvarado', empresa: 'PEA DH', area: 'TI', sucursal: 'Santa Anita', estado: 'Activo', fecha: '24 Oct 2023' },
];

const getEstadoClass = (estado: string) => {
    return estado === 'Activo'
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100 text-red-700';
};

const TicketsTable: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* --- SECCIÓN DE FILTROS --- */}
            <div className="flex flex-wrap items-end gap-4 p-4 rounded-lg border border-gray-200 shadow-sm">

                {/* Tipo de Incidente */}
                <div className="flex-1 min-w-[200px] max-w-[250px] space-y-1">
                    <label className="text-sm font-semibold">Tipo de incidente</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Buscar Tipo de Incidente"
                            className="pl-10 h-10 border-gray-300 focus:border-[${COLOR_NARANJA}]"
                        />
                    </div>
                </div>

                {/* Área y Estado (Selects) */}
                <div className="space-y-1 min-w-[120px]">
                    <label className="text-sm font-semibold">Área</label>
                    <Select>
                        <SelectTrigger className="w-[120px] h-10 border-gray-300 focus:border-[${COLOR_NARANJA}] focus:ring-0">
                            <SelectValue placeholder="Todo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todo">Todo</SelectItem>
                            <SelectItem value="ti">TI</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Rango de Fecha (Inputs con Icono) */}
                <div className="flex gap-2 items-end">
                    <div className="space-y-1 min-w-[120px]">
                        <label className="text-sm font-semibold">Rango de Fecha</label>
                        <div className="relative">
                            <Input
                                defaultValue="17/Abril/2020"
                                className="pr-8 w-[140px] h-10 border-gray-300 focus:border-[${COLOR_NARANJA}]"
                            />
                            <Calendar className={`absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[${COLOR_NARANJA}]`} />
                        </div>
                    </div>
                    <div className="space-y-1 min-w-[120px]">
                        <div className="relative">
                            <Input
                                defaultValue="17/May/2020"
                                className="pr-8 w-[140px] h-10 border-gray-300 focus:border-[${COLOR_NARANJA}]"
                            />
                            <Calendar className={`absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[${COLOR_NARANJA}]`} />
                        </div>
                    </div>
                </div>

                {/* Estado */}
                <div className="space-y-1 min-w-[120px]">
                    <label className="text-sm font-semibold">Estado:</label>
                    <Select>
                        <SelectTrigger className="w-[120px] h-10 border-gray-300 focus:border-[${COLOR_NARANJA}] focus:ring-0">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="activo">Activo</SelectItem>
                            <SelectItem value="inactivo">Inactivo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Búsqueda Final */}
                <div className="min-w-[120px]">
                    <Input
                        placeholder="Buscar"
                        className="w-[120px] h-10 border-gray-300 focus:border-[${COLOR_NARANJA}]"
                    />
                </div>
            </div>

            {/* --- TABLA --- */}
            <div className="overflow-x-auto border rounded-lg shadow-md">
                {/* Cabecera Naranja de la Tabla */}
                <div className={`grid grid-cols-tickets-lg gap-px text-sm font-semibold text-white bg-[${COLOR_NARANJA}]`}>
                    <div className="p-3">Id</div>
                    <div className="p-3">Tipo de incidente</div>
                    <div className="p-3">Usuario</div>
                    <div className="p-3">Empresa</div>
                    <div className="p-3">Area</div>
                    <div className="p-3">Sucursal</div>
                    <div className="p-3">Estado</div>
                    <div className="p-3">Fecha de Reg.</div>
                    <div className="p-3 text-center"></div> {/* Columna de Correo */}
                </div>

                {/* Filas de Datos */}
                {tickets.map((ticket, index) => (
                    <div
                        key={ticket.id}
                        className={`grid grid-cols-tickets-lg gap-px text-sm border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                        <div className="p-3 font-medium text-gray-700">{ticket.id}</div>
                        <div className="p-3">{ticket.tipo}</div>
                        <div className="p-3">{ticket.usuario}</div>
                        <div className="p-3">{ticket.empresa}</div>
                        <div className="p-3">{ticket.area}</div>
                        <div className="p-3">{ticket.sucursal}</div>
                        <div className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getEstadoClass(ticket.estado)}`}>
                                {ticket.estado}
                            </span>
                        </div>
                        <div className="p-3">{ticket.fecha}</div>
                        <div className="p-3 flex justify-center">
                            <Mail className={`w-5 h-5 cursor-pointer text-[${COLOR_NARANJA}] hover:opacity-80`} />
                        </div>
                    </div>
                ))}
            </div>
            {/* Nota: Necesitarás añadir esta configuración personalizada de grid-cols a tu archivo CSS global o tailwind.config.js */}
        </div>
    );
};

export default TicketsTable;