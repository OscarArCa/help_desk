import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';

// ===============================================
// 1. INTERFACES Y CONSTANTES
// ===============================================

interface Cliente {
    ID: number;
    Ruc: string;
    Empresa: string;
    Direccion: string;
    Nombre: string;
    Telefono: string;
    Correo: string;
    Plan: number;
}

const COLOR_NARANJA = '#FFA82E';
const COLOR_HEADER = '#F5C986';

const CLIENTES_DATA: Cliente[] = [
    { ID: 123, Ruc: '28478654321', Empresa: 'Shop center', Direccion: 'Cercado de Lima', Nombre: 'Alberto Perez', Telefono: '987 782 217', Correo: 'ingsoftware@gmail.com', Plan: 3 },
    { ID: 124, Ruc: '10254897651', Empresa: 'Tecno Soluciones', Direccion: 'San Isidro', Nombre: 'Sara Martinez', Telefono: '954 123 789', Correo: 'sara.m@tsol.com', Plan: 2 },
    { ID: 125, Ruc: '20159874563', Empresa: 'Distribuidora F&G', Direccion: 'Los Olivos', Nombre: 'Jose Hernandez', Telefono: '932 456 120', Correo: 'jhernandez@dfg.com', Plan: 1 },
];

// ===============================================
// 2. COMPONENTE SIMULADO: Input
// ===============================================
const Input = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        {...props}
        className={`border border-gray-300 rounded-md px-2 py-1 transition-all focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    />
);

// ===============================================
// 3. COMPONENTE ClienteModal (SIN CAMBIOS)
// ===============================================

interface ClienteModalProps {
    onClose: () => void;
    clienteData: Cliente; // Prop para recibir los datos del cliente
}

const ClienteModal: React.FC<ClienteModalProps> = ({ onClose, clienteData }) => {
    const [activeTab, setActiveTab] = useState<"empresa" | "contacto" | "area" | "acceso">("empresa");

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const tabs: ("empresa" | "contacto" | "area" | "acceso")[] = ["empresa", "contacto", "area", "acceso"];

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-[9999]"
                onClick={onClose}
            />

            {/* Modal centrado */}
            <div
                className="fixed z-[10000] w-[900px] max-w-[95vw] h-[550px] max-h-[90vh] bg-[#EAEAEA] rounded-[20px] shadow-lg overflow-hidden flex flex-col"
                style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                {/* HEADER */}
                <div
                    className="text-center text-xl font-bold py-3 text-gray-800 p-[20px]"
                    style={{ backgroundColor: COLOR_HEADER }}
                >
                    {clienteData.Empresa}
                </div>

                {/* TABS */}
                <div className="flex justify-center gap-3 mt-4 flex-wrap px-4 p-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-[10px] w-[180px] font-semibold text-sm transition-all duration-200  m-[10px] ${
                                activeTab === tab
                                    ? "bg-[#FFA82E] text-white shadow-md"
                                    : "bg-[#F5E6CC] text-gray-800 hover:bg-[#FFD699]"
                            }`}
                        >
                            {tab === "empresa"
                                ? "Empresa"
                                : tab === "contacto"
                                    ? "Contacto"
                                    : tab === "area"
                                        ? "Area"
                                        : "Datos de acceso"}
                        </button>
                    ))}
                </div>

                {/* CONTENIDO CON SCROLL */}
                <div className="p-4 overflow-y-auto flex-1  p-[20px]">
                    {activeTab === "empresa" && (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

                                <div>
                                    <label className="font-semibold text-sm">Nombre Empresa:</label>
                                    <div className="border border-gray-300 rounded-md bg-white h-10 flex items-center mt-1 shadow-sm pr-[25px] pl-[25px]">{clienteData.Empresa}</div>
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">RUC:</label>
                                    <div className="border border-gray-300 rounded-md bg-white h-10 flex items-center mt-1 shadow-sm pr-[25px] pl-[25px]">{clienteData.Ruc}</div>
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">Dirección:</label>
                                    <div className="border border-gray-300 rounded-md bg-white h-10 flex items-center mt-1 shadow-sm pr-[25px] pl-[25px]">{clienteData.Direccion}</div>
                                </div>
                            </div>
                            <h3 className="font-semibold mt-4 mb-2">Contactos de referencia:</h3>
                            <table className="w-full border text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead style={{ backgroundColor: COLOR_HEADER}}>
                                <tr>
                                    <th className="border px-2 py-1 rounded-[10px]">Nombre</th>
                                    <th className="border px-2 py-1 rounded-[10px]">Dirección</th>
                                    <th className="border px-2 py-1 rounded-[10px]">Correo</th>
                                    <th className="border px-2 py-1 rounded-[10px]">Teléfono</th>
                                    <th className="border px-2 py-1 rounded-[10px]">Cargo</th>
                                    <th className="border px-2 py-1 rounded-[10px]">Activo</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="border px-2 py-1">Carlos daniel</td>
                                    <td className="border px-2 py-1">Av. Mexico con la union dptm 1405</td>
                                    <td className="border px-2 py-1">@@gmail.com</td>
                                    <td className="border px-2 py-1">987654321</td>
                                    <td className="border px-2 py-1">Administracion</td>
                                    <td className="border px-2 py-1 text-center"><input type="checkbox" checked readOnly /></td>
                                </tr>
                                <tr>
                                    <td className="border px-2 py-1">Aaaaa</td>
                                    <td className="border px-2 py-1">Av. ffffff</td>
                                    <td className="border px-2 py-1">tttt@gmail.com</td>
                                    <td className="border px-2 py-1">9123221345</td>
                                    <td className="border px-2 py-1">Atencion Cliente</td>
                                    <td className="border px-2 py-1 text-center"><input type="checkbox" readOnly /></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "contacto" && (
                        <div>
                            <h3 className="font-semibold mb-2">Contactos de referencia:</h3>
                            <table className="w-full border text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead style={{ backgroundColor: COLOR_HEADER }}>
                                <tr>
                                    <th className="border px-2 py-1 rounded-[10px]">Nombre</th>
                                    <th className="border px-2 py-1 rounded-[10px]">Dirección</th>
                                    <th className="border px-2 py-1 rounded-[10px]">Correo</th>
                                    <th className="border px-2 py-1 rounded-[10px]">Teléfono</th>
                                    <th className="border px-2 py-1 rounded-[10px]">Cargo</th>
                                    <th className="border px-2 py-1 rounded-[10px]">Activo</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="border px-2 py-1">Luis manuel</td>
                                    <td className="border px-2 py-1">Av. sa</td>
                                    <td className="border px-2 py-1">ttttt@gmail.com</td>
                                    <td className="border px-2 py-1">912345678</td>
                                    <td className="border px-2 py-1">Soporte</td>
                                    <td className="border px-2 py-1 text-center"><input type="checkbox" checked readOnly /></td>
                                </tr>
                                <tr>
                                    <td className="border px-2 py-1">Edu matias</td>
                                    <td className="border px-2 py-1">Avv ilnce</td>
                                    <td className="border px-2 py-1">ttttt@gmail.com</td>
                                    <td className="border px-2 py-1">9123221345</td>
                                    <td className="border px-2 py-1">Atencion Cliente</td>
                                    <td className="border px-2 py-1 text-center"><input type="checkbox" checked readOnly /></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "area" && (
                        <div>
                            <h3 className="font-semibold mb-2">Agregar Sucursales:</h3>
                            <table className="w-full border text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead style={{ backgroundColor: COLOR_HEADER }}>
                                <tr>
                                    <th className="border px-2 py-1 rounded-[10px]">Area</th>
                                    <th className="border px-2 py-1 rounded-[10px]">Contacto</th>
                                    <th className="border px-2 py-1 rounded-[10px]">Telefono</th>
                                    <th className="border px-2 py-1 rounded-[10px]">Correo</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="border px-2 py-1">Administracion</td>
                                    <td className="border px-2 py-1">Adrian</td>
                                    <td className="border px-2 py-1">975645321</td>
                                    <td className="border px-2 py-1 text-blue-600">aaaaa@</td>
                                </tr>
                                <tr>
                                    <td className="border px-2 py-1">Diseño</td>
                                    <td className="border px-2 py-1">Maria</td>
                                    <td className="border px-2 py-1">964532121</td>
                                    <td className="border px-2 py-1">eeeee@</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "acceso" && (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                                <div>
                                    <label className="font-semibold text-sm block mb-2">Correo Electrónico:</label>
                                    <input
                                        type="email"
                                        placeholder="Correo Electronico"
                                        className=" w-[200px] border border-gray-300 rounded-md bg-white h-10 shadow-sm focus:outline-none focus:ring-0 focus:border-[#FFA82E] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm block mb-2">Contraseña:</label>
                                    <input
                                        type="password"
                                        value="********************"
                                        readOnly
                                        className="w-[200px] border border-gray-300 rounded-md bg-white h-10 shadow-sm p-[10px]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* BOTÓN VOLVER */}
                <div className="flex justify-center p-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full text-white font-semibold hover:scale-105 transition-transform shadow-md"
                        style={{ backgroundColor: COLOR_NARANJA }}
                    >
                        Volver
                    </button>
                </div>
            </div>
        </>
    );
};
// ===============================================
// 4. COMPONENTE PRINCIPAL: ClientesTable
// ===============================================

const ClientesTable: React.FC = () => {
    const [ruc, setRuc] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(CLIENTES_DATA);
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

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
            {/* FILTROS - ACTUALIZADO CON ESTILO DE TICKETS */}
            <div className="flex flex-wrap justify-start items-end gap-4 p-4 rounded-lg border border-gray-200 shadow-sm p-[10px] mb-[10px]">
                <div className="min-w-[200px] max-w-[300px]">
                    <p className="text-sm font-semibold mb-1">Ruc</p>
                    <Input
                        value={ruc}
                        onChange={(e) => setRuc(e.target.value)}
                        placeholder="Ruc"
                        className="w-[120px] h-10 text-sm border-gray-300 pr-[25px] pl-[25px] pt-[10px] pb-[10px]"
                    />
                </div>

                <div className="min-w-[200px] max-w-[300px]">
                    <p className="text-sm font-semibold mb-1">Empresa</p>
                    <Input
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        placeholder="Empresa"
                        className="w-[140px] h-10 text-sm border-gray-300 pr-[25px] pl-[25px] pt-[10px] pb-[10px]"
                    />
                </div>

                <div className="min-w-[120px] max-w-[300px]">
                    <p className="text-sm font-semibold mb-1">Buscar</p>
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar..."
                        className="w-[200px] h-10 text-sm border-gray-300 pr-[25px] pl-[25px] pt-[10px] pb-[10px]"
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
                        className={` p-[10px] grid grid-cols-[60px_150px_170px_170px_180px_150px_200px_80px_50px] text-sm border-b p-3 ${
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
                <ClienteModal
                    onClose={() => setSelectedCliente(null)}
                    clienteData={selectedCliente}
                />
            )}
        </div>
    );
};

export default ClientesTable