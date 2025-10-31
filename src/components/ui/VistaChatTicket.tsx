import React, { useState } from 'react';
import { MessageSquare, Phone, Menu, Lock, Edit, Plus } from 'lucide-react';

interface Mensaje {
    id: string;
    remitente: string;
    email: string;
    contenido: string;
    fecha: string;
    hora: string;
}

interface TicketInfo {
    numero: string;
    motivo: string;
    estado: 'Inactivo' | 'Activo' | 'Pendiente';
    comportamiento: string;
    departamento: string;
    fechaEnvio: string;
    ultimaActualizacion: string;
}

interface VistaChatTicketProps {
    ticketInfo: TicketInfo;
    mensajes: Mensaje[];
    usuarioActual: {
        nombre: string;
        rol: string;
        email?: string;
    };
    empresa: {
        nombre: string;
        ubicacion: string;
    };
}

const VistaChatTicket: React.FC<VistaChatTicketProps> = ({
    ticketInfo,
    mensajes,
    usuarioActual,
    empresa
}) => {

    const [estadoTicket, setEstadoTicket] = useState(ticketInfo.estado);



    const toggleEstado = () => {
        setEstadoTicket((prev) => (prev === 'Activo' ? 'Inactivo' : 'Activo'));
    };

    const obtenerColorEstado = () => {
        switch (estadoTicket) {
            case 'Activo':
                return '#10b981'; // verde
            case 'Inactivo':
                return '#ef4444'; // rojo
            case 'Pendiente':
                return '#f59e0b';
            default:
                return '#6b7280';
        }
    };

    return (
        <div className="vista-chat-container">
            {/* Header */}
            <div className="chat-header">
                <div className="chat-header-left">
                    <MessageSquare size={32} />
                    <h1 className="chat-titulo">Chat</h1>
                </div>
                <div className="chat-header-right">
                    <div className="chat-empresa-info">
                        <div className="chat-empresa-nombre">{empresa.nombre}</div>
                        <div className="chat-empresa-ubicacion">{empresa.ubicacion}</div>
                    </div>
                    <div className="chat-usuario-info">
                        <div className="chat-usuario-avatar">
                            <div className="avatar-circulo">
                                {usuarioActual.nombre.charAt(0)}
                            </div>
                            <span className="usuario-estado-online"></span>
                        </div>
                        <div className="chat-usuario-detalles">
                            <div className="chat-usuario-nombre">{usuarioActual.nombre}</div>
                            <div className="chat-usuario-rol">{usuarioActual.rol}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="chat-botones-accion">
                <button className="chat-boton-soporte">
                    <MessageSquare size={18} />
                    Chat de Soporte
                </button>
                <button className="chat-boton-telefono">
                    <Phone size={18} />
                    1 (822)-34332
                </button>
                <button className="chat-boton-menu">
                    <Menu size={24} />
                </button>
            </div>

            {/* Contenido Principal */}
            <div className="chat-contenido-principal">
                {/* Panel Izquierdo */}
                <div className="chat-panel-izquierdo">
                    <div className="ticket-info-card">
                        <div className="ticket-info-header">
                            <MessageSquare size={20} />
                            <h3>Información de entradas</h3>
                        </div>

                        <div className="ticket-detalle">
                            <strong>{ticketInfo.numero}</strong>
                            <div className="ticket-motivo">Motivo: {ticketInfo.motivo}</div>
                        </div>

                        <div className="ticket-estado-container">
                            <span className="ticket-estado-label">Estado:</span>
                            <span
                                className="ticket-estado-badge"
                                style={{ backgroundColor: obtenerColorEstado() }}
                            >
                                {estadoTicket}
                            </span>
                        </div>

                        <div className="ticket-campo">
                            <span className="ticket-campo-label">Comportamiento:</span>
                            <button
                                className="ticket-activar-button"
                                onClick={toggleEstado}
                                style={{
                                    backgroundColor:
                                        estadoTicket === 'Activo' ? '#10b981' : '#ef4444'
                                }}
                            >
                                {estadoTicket === 'Activo' ? 'Desactivar ticket' : 'Activar ticket'}
                            </button>
                        </div>

                        <div className="ticket-campo">
                            <span className="ticket-campo-label">Departamento:</span>
                            <span className="ticket-campo-valor">{ticketInfo.departamento}</span>
                        </div>

                        <div className="ticket-campo">
                            <span className="ticket-campo-label">Fecha de envío:</span>
                            <span className="ticket-campo-valor">{ticketInfo.fechaEnvio}</span>
                        </div>

                        <div className="ticket-campo">
                            <span className="ticket-campo-label">Última actualización:</span>
                            <span className="ticket-campo-valor">{ticketInfo.ultimaActualizacion}</span>
                        </div>
                    </div>

                    <div className="pin-usuario-card">
                        <div className="pin-header">
                            <Lock size={20} />
                            <h3>Pin de Usuario</h3>
                        </div>
                        <div className="pin-numeros">9 8 7 6 5 4 3</div>
                    </div>
                </div>

                {/* Panel Derecho */}
                <div className="chat-panel-derecho">
                    <div className="chat-responder-header">
                        <Edit size={20} />
                        <h3>Responder</h3>
                        <button className="chat-boton-agregar">
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="chat-mensajes-container">
                        {mensajes.map((mensaje) => (
                            <div key={mensaje.id} className="chat-mensaje">
                                <div className="mensaje-avatar">
                                    <div className="avatar-inicial">
                                        {mensaje.remitente.charAt(0)}
                                    </div>
                                </div>
                                <div className="mensaje-contenido">
                                    <div className="mensaje-header">
                                        <div className="mensaje-remitente-info">
                                            <strong>{mensaje.remitente}</strong>
                                            <span className="mensaje-email">{mensaje.email}</span>
                                        </div>
                                        <div className="mensaje-fecha-hora">
                                            <span>{mensaje.fecha}</span>
                                            <span>{mensaje.hora}</span>
                                        </div>
                                    </div>
                                    <p className="mensaje-texto">{mensaje.contenido}</p>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default VistaChatTicket;
