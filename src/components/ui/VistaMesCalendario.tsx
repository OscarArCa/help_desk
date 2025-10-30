import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

interface VistaMesCalendarioProps {
    mesInicial: number;
    anioInicial: number;
    onVolver: () => void;
    onSeleccionarDia: (dia: number, mes: number, anio: number) => void;
}

const VistaMesCalendario: React.FC<VistaMesCalendarioProps> = ({
    mesInicial,
    anioInicial,
    onVolver,
    onSeleccionarDia
}) => {
    const [mesActual, setMesActual] = useState(mesInicial);
    const [anioActual, setAnioActual] = useState(anioInicial);

    const nombresMeses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    const obtenerDiasDelMes = (): { primerDia: number; diasEnMes: number } => {
        const primerDia = new Date(anioActual, mesActual, 1).getDay();
        const diasEnMes = new Date(anioActual, mesActual + 1, 0).getDate();
        return { primerDia, diasEnMes };
    };

    const cambiarMes = (direccion: number): void => {
        let nuevoMes = mesActual + direccion;
        let nuevoAnio = anioActual;

        if (nuevoMes > 11) {
            nuevoMes = 0;
            nuevoAnio++;
        } else if (nuevoMes < 0) {
            nuevoMes = 11;
            nuevoAnio--;
        }

        setMesActual(nuevoMes);
        setAnioActual(nuevoAnio);
    };

    const renderizarCalendario = () => {
        const { primerDia, diasEnMes } = obtenerDiasDelMes();
        const dias: React.ReactNode[] = [];

        // Ajustar primerDia para que lunes sea 0
        const primerDiaAjustado = primerDia === 0 ? 6 : primerDia - 1;

        // Días vacíos antes del primer día
        for (let i = 0; i < primerDiaAjustado; i++) {
            dias.push(<div key={`vacio-${i}`} className="vista-mes-dia-vacio"></div>);
        }

        // Días del mes
        const hoy = new Date();
        const esHoy = (dia: number) =>
            dia === hoy.getDate() &&
            mesActual === hoy.getMonth() &&
            anioActual === hoy.getFullYear();

        for (let dia = 1; dia <= diasEnMes; dia++) {
            dias.push(
                <div
                    key={dia}
                    onClick={() => onSeleccionarDia(dia, mesActual, anioActual)}
                    className={`vista-mes-dia ${esHoy(dia) ? 'hoy' : ''}`}
                >
                    <span className="vista-mes-numero-dia">{dia}</span>
                </div>
            );
        }

        return dias;
    };

    return (
        <div className="vista-mes-calendario">
            {/* Header */}
            <div className="vista-mes-header">
                <button onClick={onVolver} className="vista-mes-boton-volver">
                    <ArrowLeft size={20} />
                </button>
                <div className="vista-mes-header-contenido">
                    <h2 className="vista-mes-titulo">Calendario Mensual</h2>
                </div>
            </div>

            {/* Navegación del Mes */}
            <div className="vista-mes-navegacion">
                <button
                    onClick={() => cambiarMes(-1)}
                    className="vista-mes-boton-nav"
                >
                    <ChevronLeft size={24} />
                </button>
                <h3 className="vista-mes-nombre">
                    {nombresMeses[mesActual]} {anioActual}
                </h3>
                <button
                    onClick={() => cambiarMes(1)}
                    className="vista-mes-boton-nav"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Calendario */}
            <div className="vista-mes-grid-container">
                {/* Días de la semana */}
                <div className="vista-mes-dias-semana">
                    {diasSemana.map(dia => (
                        <div key={dia} className="vista-mes-dia-semana">
                            {dia}
                        </div>
                    ))}
                </div>

                {/* Grid de días */}
                <div className="vista-mes-grid-dias">
                    {renderizarCalendario()}
                </div>
            </div>
        </div>
    );
};

export default VistaMesCalendario;