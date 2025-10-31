import React, { useState } from "react";
import { Monitor, Search, SlidersHorizontal, Laptop } from "lucide-react";
import "../../pages/Dashboard.css";

interface Equipo {
    id: number;
    nombre: string;
    area: string;
    icono: "laptop" | "impresora";
}

interface VistaEquiposProps {
    usuario: {
        nombre: string;
        rol: string;
    };
    empresa: {
        nombre: string;
        ubicacion: string;
    };
}

const VistaEquipos: React.FC<VistaEquiposProps> = ({ usuario, empresa }) => {
    const [orden, setOrden] = useState("Nombre");
    const [busqueda, setBusqueda] = useState("");

    const equipos: Equipo[] = [
        { id: 1, nombre: "Laptop - Lenovo", area: "Administración", icono: "laptop" },
        { id: 2, nombre: "Impresora - HP", area: "Administración", icono: "impresora" },
    ];

    const equiposFiltrados = equipos.filter((e) =>
        e.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="equipos-container">
            {/* Encabezado */}
            <div className="equipos-header">
                <div className="equipos-header-left">
                    <Monitor size={32} />
                    <h2>Lista de Equipos</h2>
                </div>

                <div className="equipos-header-right">
                    <div className="empresa-info">
                        <p>{empresa.nombre}</p>
                        <span>{empresa.ubicacion}</span>
                    </div>
                    <div className="usuario-info">
                        <div className="usuario-avatar">
                            <div className="avatar-inicial">{usuario.nombre.charAt(0)}</div>
                            <span className="estado-online"></span>
                        </div>
                        <div className="usuario-detalles">
                            <p>{usuario.nombre}</p>
                            <span>{usuario.rol}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filtro y búsqueda */}
            <div className="equipos-filter">
                <div className="ordenar">
                    <span>Ordenar por:</span>
                    <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                        <option value="Nombre">Nombre</option>
                        <option value="Área">Área</option>
                    </select>
                </div>

                <div className="buscador">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <SlidersHorizontal size={18} />
                </div>
            </div>

            {/* Tarjetas */}
            <div className="equipos-grid">
                {equiposFiltrados.map((equipo) => (
                    <div key={equipo.id} className="equipo-card">
                        {equipo.icono === "laptop" ? (
                            <Laptop size={60} />
                        ) : (
                            <Monitor size={60} />
                        )}
                        <h3>{equipo.nombre}</h3>
                        <p>Área: {equipo.area}</p>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <div className="equipos-footer">
                <p>del 1 al 10 de 20 resultados</p>
                <div className="pagination">
                    <button>{"<"}</button>
                    <span className="page-number">1</span>
                    <button>{">"}</button>
                </div>
            </div>
        </div>
    );
};

export default VistaEquipos;
