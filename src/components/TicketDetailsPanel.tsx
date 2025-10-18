import React from 'react';

// --- Códigos de Color ---
const COLOR_NARANJA = '#FFA82E';
const COLOR_ESTADO_ACTIVO = '#90EE90';

/**
 * Componente que muestra los detalles de un ticket específico y la información del cliente.
 * Este panel se coloca inmediatamente al lado del Sidebar.
 */
const TicketDetailsPanel: React.FC = () => (
    // Este panel tiene un ancho fijo y un borde derecho para separarlo del chat
    <div className="w-[300px] bg-white flex flex-col h-full border-r border-gray-200">

        {/* SECCIÓN 1: ENCABEZADO DEL TICKET (Fondo Gris Claro) */}
        <div className="bg-gray-50 p-4 border-b">
            <div className="text-sm mb-1">
                <span className="font-semibold text-gray-800">#T-0000001</span>
            </div>
            <p className="text-xs text-gray-600">Motivo: Problema en el encendido</p>
            <p className="text-sm font-bold text-gray-900">Asunto: Fallo en el encendido de la Laptop</p>
            <span className={`px-2 py-1 mt-2 inline-block rounded text-sm font-bold`} style={{ backgroundColor: COLOR_ESTADO_ACTIVO, color: '#1B5E20' }}>
                Activo
            </span>
        </div>

        {/* SECCIÓN 2: INFORMACIÓN DEL CLIENTE (Fondo Blanco) */}
        <div className="bg-white p-4 border-b">
            <h3 className="text-lg font-extrabold text-gray-800 mb-3 text-center">Informacion de Cliente</h3>
            <div className="text-sm space-y-2 text-gray-600">
                <p>Nombre Cliente: <span className="font-medium text-gray-800">Alberto Perez</span></p>
                <p>Empresa: <span className="font-medium text-gray-800">YYYY</span></p>
                <p>Sucursal: <span className="font-medium text-gray-800">Jesus Maria</span></p>
                <p>Area: <span className="font-medium text-gray-800">Administracion</span></p>
            </div>
        </div>

        {/* SECCIÓN 3: DETALLES TÉCNICOS (Fondo Blanco, separado por línea) */}
        <div className="bg-white p-4 border-b">
            <div className="text-sm space-y-2 text-gray-600">
                <p>Equipo: <span className="font-medium text-gray-800">Laptop</span></p>
                <p>Prioridad: <span className="font-medium text-gray-800" style={{ color: 'red' }}>Alta</span></p>
            </div>
        </div>

        {/* SECCIÓN 4: PIN DE USUARIO (Fondo Gris Claro) */}
        <div className="bg-gray-50 p-4 border-b">
            <h3 className="text-lg font-extrabold text-gray-800 text-center mb-3">Pin de Usuario</h3>
            <div className="bg-white p-3 rounded-lg text-2xl font-mono tracking-widest text-center shadow-inner text-gray-700 border border-gray-200">
                9 8 7 6 5 4 3
            </div>
        </div>

        {/* SECCIÓN 5: BOTÓN DE ACCIÓN (Soporte In Situ) */}
        <div className="p-4 mt-auto">

            <button className="w-full text-white text-xl font-bold shadow-lg h-14 rounded-md" style={{ backgroundColor: COLOR_NARANJA }}>
                Soporte In Situ
            </button>
        </div>
    </div>
);

export default TicketDetailsPanel;
