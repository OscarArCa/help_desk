import React, { useState, useEffect } from "react";

interface ClienteModalProps {
    onClose: () => void;
}

const ClienteModal: React.FC<ClienteModalProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<"empresa" | "contacto" | "sucursal" | "acceso">("empresa");

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const tabs: ("empresa" | "contacto" | "sucursal" | "acceso")[] = ["empresa", "contacto", "sucursal", "acceso"];

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn p-4 overflow-y-auto rounded-[20px]">
            {/* Contenedor del modal con tamaño fijo */}
            <div className="relative w-[900px] h-[450px] bg-[#EAEAEA] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] overflow-hidden border border-gray-300 transition-all duration-300 flex flex-col">

                {/* HEADER */}
                <div
                    className="text-center text-xl font-bold py-3 text-gray-800 flex-shrink-0"
                    style={{ backgroundColor: "#F5C986" }}
                >
                    Shop Center
                </div>

                {/* TABS */}
                <div className="flex justify-center gap-3 mt-4 flex-wrap px-4 flex-shrink-0 p-[10px]">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                                activeTab === tab
                                    ? "bg-[#FFA82E] text-white shadow-md"
                                    : "bg-[#F5E6CC] text-gray-800 hover:bg-[#FFD699]"
                            }`}
                        >
                            {tab === "empresa"
                                ? "Empresa"
                                : tab === "contacto"
                                    ? "Contacto"
                                    : tab === "sucursal"
                                        ? "Sucursal"
                                        : "Datos de acceso"}
                        </button>
                    ))}
                </div>

                {/* CONTENIDO: scroll interno */}
                <div className="p-6 flex-1 overflow-y-auto p-[10px]">
                    {activeTab === "empresa" && (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                <div>
                                    <label className="font-semibold text-sm">Nombre Empresa:</label>
                                    <div className="border rounded-md bg-white px-2 py-1 mt-1 shadow-sm">Shop Center</div>
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">RUC:</label>
                                    <div className="border rounded-md bg-white px-2 py-1 mt-1 shadow-sm">28478654321</div>
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">Dirección:</label>
                                    <div className="border rounded-md bg-white px-2 py-1 mt-1 shadow-sm">Cercado de Lima</div>
                                </div>
                            </div>
                            <h3 className="font-semibold mt-6 mb-2">Contactos de referencia:</h3>
                            <table className="w-full border text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead style={{ backgroundColor: "#F5C986" }}>
                                <tr>
                                    <th className="border px-2 py-1">Nombre</th>
                                    <th className="border px-2 py-1">Dirección</th>
                                    <th className="border px-2 py-1">Correo</th>
                                    <th className="border px-2 py-1">Teléfono</th>
                                    <th className="border px-2 py-1">Cargo</th>
                                    <th className="border px-2 py-1">Activo</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="border px-2 py-1">Jimena Gomez</td>
                                    <td className="border px-2 py-1">Calle Arquitecto Eduardo Ordoñez 290, San Borja 15036</td>
                                    <td className="border px-2 py-1">jimena@gmail.com</td>
                                    <td className="border px-2 py-1">987654321</td>
                                    <td className="border px-2 py-1">Atención Cliente</td>
                                    <td className="border px-2 py-1 text-center"><input type="checkbox" checked readOnly /></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "contacto" && (
                        <div>
                            <h3 className="font-semibold mb-2">Contactos de referencia:</h3>
                            <table className="w-full border text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead style={{ backgroundColor: "#F5C986" }}>
                                <tr>
                                    <th className="border px-2 py-1">Nombre</th>
                                    <th className="border px-2 py-1">Dirección</th>
                                    <th className="border px-2 py-1">Correo</th>
                                    <th className="border px-2 py-1">Teléfono</th>
                                    <th className="border px-2 py-1">Cargo</th>
                                    <th className="border px-2 py-1">Activo</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="border px-2 py-1">Jesus Manuel</td>
                                    <td className="border px-2 py-1">Av. Bienavides</td>
                                    <td className="border px-2 py-1">111@gmail.com</td>
                                    <td className="border px-2 py-1">912345679</td>
                                    <td className="border px-2 py-1">Soporte</td>
                                    <td className="border px-2 py-1 text-center"><input type="checkbox" readOnly /></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "sucursal" && (
                        <div>
                            <h3 className="font-semibold mb-2">Sucursales:</h3>
                            <table className="w-full border text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead style={{ backgroundColor: "#F5C986" }}>
                                <tr>
                                    <th className="border px-2 py-1">Sucursal</th>
                                    <th className="border px-2 py-1">Dirección</th>
                                    <th className="border px-2 py-1">Contacto</th>
                                    <th className="border px-2 py-1">Teléfono</th>
                                    <th className="border px-2 py-1">Correo</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="border px-2 py-1">San Isidro</td>
                                    <td className="border px-2 py-1">Av. Javier Prado Este 2465, San Borja 15021</td>
                                    <td className="border px-2 py-1">Ing. Carlos</td>
                                    <td className="border px-2 py-1">987654321</td>
                                    <td className="border px-2 py-1">@@gmail.com</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "acceso" && (
                        <div className="text-center text-gray-500">
                            <p>Datos de acceso (vacío por ahora)</p>
                        </div>
                    )}
                </div>

                {/* BOTÓN VOLVER */}
                <div className="flex justify-center flex-shrink-0 mb-5">
                    <button
                        onClick={onClose}
                        className="px-8 py-2 rounded-full text-white text-sm font-semibold hover:scale-105 transition-transform shadow-md"
                        style={{ backgroundColor: "#FFA82E" }}
                    >
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClienteModal;
