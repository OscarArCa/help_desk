import React, { useState } from 'react'; // Agregar useState
import { Ticket, Monitor } from 'lucide-react';
import Sidebar from '../components/ui/Sidebar';
import Header from '../components/ui/Header';
import CardInfo from '../components/ui/CardInfo';
import TicketMessages from '../components/ui/TicketMessages';
import ProgressBox from '../components/ui/ProgressBox';
import CalendarBox from '../components/ui/CalendarBox';
import VistaDiaCalendario from '../components/ui/VistaDiaCalendario'; // AGREGAR
import VistaMesCalendario from '../components/ui/VistaMesCalendario'; // AGREGAR
import '../Dashboard.css';
import '../VistaDiaCalendario.css'; // AGREGAR
import '../VistaMesCalendario.css'; // AGREGAR

const Inicio: React.FC = () => {
    // AGREGAR ESTOS ESTADOS
    const [mostrarVistaDia, setMostrarVistaDia] = useState(false);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(13);

    const tickets = [
        { id: '#T-0000001', formattedSupport: 'Formatos-Soporte', time: 'hace 20 min', status: '???????' },
        { id: '#T-', formattedSupport: 'Tu razon 75 mins', time: 'hace 20 min', status: '???????' },
        { id: '#T-', formattedSupport: 'Tu razon 75 mins', time: 'hace 20 min', status: '???????' },
        { id: '#T-', formattedSupport: 'Tu razon 75 mins', time: 'hace 20 min', status: '-???????' },
    ];

    // AGREGAR ESTOS EVENTOS DE EJEMPLO
    const eventosCalendario = [
        {
            id: '1',
            titulo: 'Ticket generado por falla en el equipo',
            horaInicio: '8:00',
            horaFin: '10:00',
            color: 'naranja' as const
        },
        {
            id: '2',
            titulo: 'Ticket registrado por falla en el equipo',
            horaInicio: '10:00',
            horaFin: '12:00',
            color: 'naranja-claro' as const
        },
        {
            id: '3',
            titulo: '',
            horaInicio: '12:00',
            horaFin: '14:00',
            color: 'naranja-claro' as const
        }
    ];

    // AGREGAR ESTAS FUNCIONES
    const manejarClicFecha = (fecha: number) => {
        setFechaSeleccionada(fecha);
        setMostrarVistaDia(true);
    };

    const volverAlDashboard = () => {
        setMostrarVistaDia(false);
    };

    // AGREGAR ESTA CONDICIÓN
    if (mostrarVistaDia) {
        return (
            <div className="dashboard-container">
                <Sidebar />
                <div className="main-content">
                    <VistaDiaCalendario
                        fechaSeleccionada={fechaSeleccionada}
                        diaSemana="Sáb"
                        eventos={eventosCalendario}
                        onVolver={volverAlDashboard}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <Sidebar />

            <div className="main-content">
                <Header />

                <div className="content-area">
                    {/* Top Cards */}
                    <div className="cards-grid">
                        <CardInfo
                            title="Tickets"
                            subtitle="Generados"
                            value={10}
                            icon={<Ticket size={40} />}
                        />
                        <CardInfo
                            title="Tickets"
                            subtitle="Resueltos"
                            value={25}
                            icon={<Ticket size={40} />}
                        />
                        <CardInfo
                            title="Cantidad de"
                            subtitle="Equipos"
                            value={10}
                            icon={<Monitor size={40} />}
                        />
                    </div>

                    {/* Main Grid */}
                    <div className="main-grid">
                        {/* Left Column */}
                        <div className="left-column">
                            <TicketMessages tickets={tickets} newMessagesCount={1} />

                            <div className="progress-grid">
                                <ProgressBox
                                    title="Tickets"
                                    subtitle="en Proceso"
                                    value={25}
                                    type="proceso"
                                />
                                <ProgressBox
                                    title="Tickets"
                                    subtitle="Resueltos"
                                    value={80}
                                    type="resueltos"
                                />
                            </div>
                        </div>

                        {/* Right Column - MODIFICAR ESTA LÍNEA */}
                        <CalendarBox onDateClick={manejarClicFecha} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;