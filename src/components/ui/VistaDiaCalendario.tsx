import React from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';

interface EventoCalendario {
    id: string;
    titulo: string;
    horaInicio: string;
    horaFin: string;
    color: 'naranja' | 'naranja-claro';
}

interface VistaDiaCalendarioProps {
    fechaSeleccionada: number;
    diaSemana: string;
    eventos: EventoCalendario[];
    onVolver: () => void;
}

const VistaDiaCalendario: React.FC<VistaDiaCalendarioProps> = ({
    fechaSeleccionada,
    diaSemana,
    eventos,
    onVolver
}) => {
    const horas = [
        '8:00', '9:00', '10:00', '11:00', '12:00', '13:00',
        '14:00', '15:00', '16:00', '17:00', '18:00'
    ];

    const obtenerEstiloEvento = (evento: EventoCalendario) => {
        const horaInicio = parseInt(evento.horaInicio.split(':')[0]);
        const horaFin = parseInt(evento.horaFin.split(':')[0]);
        const duracion = horaFin - horaInicio;
        const posicionInicio = (horaInicio - 8) * 100; // 8:00 es la hora de inicio

        return {
            top: `${posicionInicio}px`,
            height: `${duracion * 100}px`
        };
    };

    return (
        <div className="vista-dia-calendario">
            {/* Header */}
            <div className="calendario-dia-header">
                <button onClick={onVolver} className="calendario-boton-volver">
                    <ArrowLeft size={20} />
                </button>
                <div className="calendario-dia-header-contenido">
                    <Calendar size={32} />
                    <h2 className="calendario-dia-titulo">Calendario</h2>
                </div>
            </div>

            {/* Tarjeta de Fecha */}
            <div className="calendario-tarjeta-fecha">
                <div className="calendario-info-fecha">
                    <div className="calendario-nombre-dia">{diaSemana.toUpperCase()}</div>
                    <div className="calendario-numero-dia">{fechaSeleccionada}</div>
                </div>
                <button className="calendario-boton-agregar">Agregar</button>
            </div>

            {/* Línea de Tiempo */}
            <div className="calendario-linea-tiempo">
                <div className="calendario-horas">
                    {horas.map((hora, index) => (
                        <div key={index} className="calendario-ranura-hora">
                            <span className="calendario-etiqueta-hora">{hora}</span>
                        </div>
                    ))}
                </div>
                <div className="calendario-eventos">
                    {eventos.map((evento) => (
                        <div
                            key={evento.id}
                            className={`calendario-evento ${evento.color}`}
                            style={obtenerEstiloEvento(evento)}
                        >
                            <span className="calendario-titulo-evento">{evento.titulo}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VistaDiaCalendario;