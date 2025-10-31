import React from 'react';
import Sidebar from '../components/ui/Sidebar';
import { Monitor, Printer, Search, SlidersHorizontal } from 'lucide-react';
import '../VistaChatTicket.css';
import '../Dashboard.css';

const Equipos: React.FC = () => {
    const equipos = [
        {
            id: 1,
            nombre: 'Laptop - Lenovo',
            area: 'Administración',
            icono: <Monitor size={70} />,
        },
        {
            id: 2,
            nombre: 'Impresora - HP',
            area: 'Administración',
            icono: <Printer size={70} />,
        },
    ];

    return (
        <div className="dashboard-container">
            <Sidebar />

            <div className="main-content">
                {/* ====== ENCABEZADO ====== */}
                <div className="equipos-header">
                    <div className="equipos-header-left">
                        <Monitor size={36} color="#000" />
                        <h2 className="equipos-title">Lista de Equipos</h2>
                    </div>

                    <div className="equipos-header-right">
                        <div className="empresa-info">
                            <p className="empresa-nombre">J&P PERIFERICOS S.A.C.</p>
                            <p className="empresa-ubicacion">Los Olivos</p>
                        </div>
                        <div className="usuario-info">
                            <div className="usuario-avatar">
                                <div className="avatar-circulo">A</div>
                                <span className="usuario-estado-online"></span>
                            </div>
                            <div className="usuario-detalles">
                                <p className="usuario-nombre">Alberto Perez</p>
                                <p className="usuario-rol">Trabajador</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ====== FILTROS ====== */}
                <div className="filtros-container">
                    <div className="ordenar-por">
                        <label htmlFor="ordenar">Ordenar por:</label>
                        <select id="ordenar">
                            <option>Nombre</option>
                            <option>Área</option>
                        </select>
                    </div>

                    <div className="buscar-equipos">
                        <Search className="buscar-icono" size={18} />
                        <input type="text" placeholder="Buscar" />
                        <SlidersHorizontal className="filtro-icono" size={20} />
                    </div>
                </div>

                {/* ====== LISTA DE EQUIPOS ====== */}
                <div className="equipos-grid">
                    {equipos.map((equipo) => (
                        <div className="equipo-card" key={equipo.id}>
                            {equipo.icono}
                            <div className="equipo-info">
                                <h3>{equipo.nombre}</h3>
                                <p><strong>Área:</strong> {equipo.area}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Equipos;
