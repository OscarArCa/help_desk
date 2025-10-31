import React from 'react';
import Sidebar from '../components/ui/Sidebar';
import VistaChatTicket from '../components/ui/VistaChatTicket';
import '../VistaChatTicket.css';

const Tickets: React.FC = () => {
    // ✅ Coincide con la interfaz TicketInfo del componente
    const ticketInfo: {
        numero: string;
        motivo: string;
        estado: 'Inactivo' | 'Activo' | 'Pendiente';
        comportamiento: string;
        departamento: string;
        fechaEnvio: string;
        ultimaActualizacion: string;
    } = {
        numero: 'TCK-0001',
        motivo: 'Error en el sistema de impresión',
        estado: 'Activo',
        comportamiento: 'No imprime correctamente después de actualizar el driver',
        departamento: 'Soporte Técnico',
        fechaEnvio: '2025-10-31',
        ultimaActualizacion: '2025-10-31',
    };

    // ✅ Coincide con la interfaz Mensaje
    const mensajes = [
        {
            id: '1',
            remitente: 'Juan Pérez',
            email: 'juan@jpperifericos.com',
            contenido: 'El problema persiste a pesar de reiniciar el sistema.',
            fecha: '2025-10-31',
            hora: '10:45 AM',
        },
        {
            id: '2',
            remitente: 'Soporte J&P',
            email: 'soporte@jpperifericos.com',
            contenido: 'Estamos revisando la configuración del controlador.',
            fecha: '2025-10-31',
            hora: '11:05 AM',
        },
    ];

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <VistaChatTicket
                    ticketInfo={ticketInfo}
                    mensajes={mensajes}
                    usuarioActual={{ nombre: 'Alberto Perez', rol: 'Trabajador', email: 'alberto@jpperifericos.com' }}
                    empresa={{ nombre: 'J&P PERIFERICOS S.A.C.', ubicacion: 'Los Olivos' }}
                />
            </div>
        </div>
    );
};

export default Tickets;
