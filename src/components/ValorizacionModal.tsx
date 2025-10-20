import React, { useState, useMemo, type ReactNode } from 'react';
import { ArrowLeft, Star, X, CheckCircle, MinusCircle } from 'lucide-react';
//.

type ClassValue = string | number | boolean | null | undefined;

const cn = (...classes: ClassValue[]): string => {
    return classes.filter(Boolean).join(' ');
};

const COLOR_NARANJA = '#FFA82E';
const COLOR_GRIS_CLARO = '#F9FAFB';
const COLOR_GRIS_MEDIO = '#6B7280';
const COLOR_ROJO = '#EF4444';
const COLOR_AMARILLO = '#F59E0B';
const COLOR_VERDE = '#10B981';
const COLOR_NARANJA_SUAVE = '#FFF7ED';


interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}


const Dialog: React.FC<DialogProps> = ({ open, children }) => {

    return <div data-state={open ? 'open' : 'closed'} className="relative z-50">{children}</div>;
};

const DialogPortal: React.FC<React.PropsWithChildren> = ({ children }) => children as ReactNode;

const DialogOverlay: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
    <div
        className={cn(
            "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
);

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    onOpenChange: (open: boolean) => void;
}

const DialogContent: React.FC<React.PropsWithChildren<DialogContentProps>> = ({
                                                                                  className,
                                                                                  children,
                                                                                  onOpenChange,
                                                                                  ...props
                                                                              }) => (
    <DialogPortal>
        <DialogOverlay />
        <div
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200",
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
                "rounded-xl overflow-hidden max-w-7xl w-[90vw] h-[90vh] p-0", // Modificadores para el tamaño grande
                className
            )}
            {...props}
        >
            {children}
            <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4 text-gray-400 hover:text-gray-700" />
            </div>
        </div>
    </DialogPortal>
);

const Card: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({ className, children, ...props }) => (
    <div className={`rounded-xl border bg-card text-card-foreground shadow-sm p-5 transition-all ${className}`} {...props}>{children}</div>
);


interface Valoracion {
    id: number;
    cliente: string;
    fecha: string;
    nTicket: string;
    prioridad: 'Alta' | 'Media' | 'Baja';
    valoracion: 1 | 2 | 3 | 4 | 5;
}

interface ValoracionModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    cliente: {
        nombre: string;
        ubicacion: string;
    }
}

const valoraciones: Valoracion[] = [
    { id: 1, cliente: 'José Luis R.', fecha: '02/06/2023', nTicket: '#T-0000001', prioridad: 'Alta', valoracion: 5 },
    { id: 2, cliente: 'Periférico S.', fecha: '02/06/2023', nTicket: '#T-0000002', prioridad: 'Media', valoracion: 4 },
    { id: 3, cliente: 'Jorge Mate...', fecha: '02/06/2023', nTicket: '#T-0000003', prioridad: 'Baja', valoracion: 2 },
    { id: 4, cliente: 'Pedro Mart...', fecha: '02/06/2023', nTicket: '#T-0000004', prioridad: 'Alta', valoracion: 3 },
    { id: 5, cliente: 'José Luis R.', fecha: '02/06/2023', nTicket: '#T-0000005', prioridad: 'Media', valoracion: 5 },
    { id: 6, cliente: 'Sara Lima G.', fecha: '02/06/2023', nTicket: '#T-0000006', prioridad: 'Media', valoracion: 5 },
    { id: 7, cliente: 'Tecno Sol C.', fecha: '02/06/2023', nTicket: '#T-0000007', prioridad: 'Alta', valoracion: 1 },
    { id: 8, cliente: 'Mario Diaz A.', fecha: '02/06/2023', nTicket: '#T-0000008', prioridad: 'Baja', valoracion: 4 },
    { id: 9, cliente: 'Jorge Mate...', fecha: '02/06/2023', nTicket: '#T-0000009', prioridad: 'Baja', valoracion: 5 },
    { id: 10, cliente: 'José Luis R.', fecha: '02/06/2023', nTicket: '#T-0000010', prioridad: 'Alta', valoracion: 5 },
    { id: 11, cliente: 'José Luis R.', fecha: '02/06/2023', nTicket: '#T-0000011', prioridad: 'Alta', valoracion: 4 },
    { id: 12, cliente: 'Periférico S.', fecha: '02/06/2023', nTicket: '#T-0000012', prioridad: 'Media', valoracion: 4 },
    { id: 13, cliente: 'Jorge Mate...', fecha: '02/06/2023', nTicket: '#T-0000013', prioridad: 'Baja', valoracion: 3 },
    { id: 14, cliente: 'Pedro Mart...', fecha: '02/06/2023', nTicket: '#T-0000014', prioridad: 'Baja', valoracion: 5 },
    { id: 15, cliente: 'José Luis R.', fecha: '02/06/2023', nTicket: '#T-0000015', prioridad: 'Baja', valoracion: 5 },
];


const getPrioridadColor = (prioridad: Valoracion['prioridad']): string => {
    switch (prioridad) {
        case 'Alta': return COLOR_ROJO;
        case 'Media': return COLOR_AMARILLO;
        case 'Baja': return COLOR_VERDE;
        default: return COLOR_GRIS_MEDIO;
    }
};


interface ValoracionMetrics {
    total: number;
    promotores: number;
    detractores: number;
    porcentajeNPS: string;
    prioridadMetrics: { prioridad: Valoracion['prioridad']; count: number; porcentaje: number }[];
    countsByRating: number[];
    maxRatingCount: number;
    estadoGeneral: 'Excelente' | 'Bueno' | 'Regular';
}

const useValoracionMetrics = (data: Valoracion[]): ValoracionMetrics => {
    const total = data.length;

    return useMemo(() => {
        const countsByRating: number[] = [0, 0, 0, 0, 0];
        const countsByPrioridad: Record<Valoracion['prioridad'], number> = { 'Alta': 0, 'Media': 0, 'Baja': 0 };

        data.forEach((v: Valoracion) => {
            countsByRating[v.valoracion - 1]++;
            countsByPrioridad[v.prioridad]++;
        });

        const promotores: number = countsByRating[3] + countsByRating[4];
        const detractores: number = countsByRating[0] + countsByRating[1];
        // NPS normalizado de 0 a 100
        const porcentajeNPS: number = total > 0 ? ((promotores - detractores) / total) * 100 + 100 : 0;

        const prioridadMetrics = Object.entries(countsByPrioridad).map(([prioridad, count]) => ({
            prioridad: prioridad as Valoracion['prioridad'],
            count,
            porcentaje: total > 0 ? (count / total) * 100 : 0,
        }));

        const maxRatingCount: number = Math.max(...countsByRating);
        const npsValue: number = parseFloat(porcentajeNPS.toFixed(0));

        let estadoGeneral: ValoracionMetrics['estadoGeneral'];
        if (npsValue >= 80) {
            estadoGeneral = 'Excelente';
        } else if (npsValue >= 60) {
            estadoGeneral = 'Bueno';
        } else {
            estadoGeneral = 'Regular';
        }

        return {
            total,
            promotores,
            detractores,
            porcentajeNPS: porcentajeNPS.toFixed(0),
            prioridadMetrics,
            countsByRating,
            maxRatingCount,
            estadoGeneral,
        };
    }, [data, total]);
};

const RatingStarDisplay: React.FC<{ valoracion: Valoracion['valoracion'] }> = ({ valoracion }) => {
    const starColor: string = valoracion >= 4 ? COLOR_VERDE : valoracion >= 3 ? COLOR_AMARILLO : COLOR_ROJO;

    return (
        <div className="flex justify-center items-center space-x-0.5">
            {[...Array(5)].map((_, i: number) => (
                <Star
                    key={i}
                    className="w-3.5 h-3.5 transition-colors"
                    style={{ color: i < valoracion ? starColor : COLOR_GRIS_CLARO }}
                    fill={i < valoracion ? starColor : 'none'}
                    strokeWidth={i < valoracion ? 0 : 1.5}
                />
            ))}
        </div>
    );
};

interface DetailedRatingBarProps {
    rating: number;
    count: number;
    maxCount: number;
    total: number;
}

const DetailedRatingBar: React.FC<DetailedRatingBarProps> = ({ rating, count, maxCount }) => {
    const normalizedWidth: number = maxCount > 0 ? (count / maxCount) * 100 : 0;
    const barColor: string = rating >= 4 ? COLOR_VERDE : rating >= 3 ? COLOR_AMARILLO : COLOR_ROJO;

    return (
        <div className="flex items-center space-x-3 text-sm text-gray-700">
            <span className="font-semibold text-gray-600 w-2 text-right">{rating}</span>
            <Star className="w-4 h-4" style={{ color: barColor }} fill={barColor} strokeWidth={0} />

            <div className="flex-1 bg-gray-200 rounded-full h-3.5 relative overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${normalizedWidth}%`, backgroundColor: barColor }}
                ></div>
            </div>
            <span className="w-8 text-right font-bold text-gray-800">{count}</span>
        </div>
    );
};

export const ValorizacionModal: React.FC<ValoracionModalProps> = ({ isOpen, onOpenChange, cliente }) => {
    const {
        total,
        promotores,
        detractores,
        porcentajeNPS,
        prioridadMetrics,
        countsByRating,
        maxRatingCount,
        estadoGeneral,
    } = useValoracionMetrics(valoraciones);

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-6xl w-[90%] h-[90vh] p-0 flex flex-col"
                onOpenChange={onOpenChange}
            >

                <header className="flex justify-between items-center p-6 border-b border-gray-100 bg-white relative">
                    <div className="flex items-center space-x-4">
                        <ArrowLeft
                            className={`w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-700`}
                            onClick={() => onOpenChange(false)}
                        />
                        <h2 className="text-2xl font-extrabold text-gray-800">
                            Valorización de Satisfacción
                        </h2>
                    </div>
                    <div className="text-right text-sm">
                        <p className="font-bold text-gray-800">{cliente.nombre}</p>
                        <p className="text-xs text-gray-500">{cliente.ubicacion}</p>
                    </div>
                </header>

                <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gray-50">

                    <div className="lg:col-span-2 space-y-4 flex flex-col bg-white p-4 rounded-xl shadow-lg border border-gray-100">

                        <div className="text-lg font-semibold text-gray-700 border-b border-gray-100 pb-3">Histórico de Tickets</div>

                        <div className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr_1fr_1fr_0.8fr] gap-4 px-4 py-2 bg-gray-100 font-bold text-xs uppercase rounded-t-lg text-gray-600 sticky top-0 z-10 shadow-sm">
                            <div>Id</div>
                            <div>Cliente</div>
                            <div>Fecha</div>
                            <div>N° Ticket</div>
                            <div>Prioridad</div>
                            <div className="text-center">Valoración</div>
                            <div className="text-center">Acción</div>
                        </div>

                        <div className="flex-1 space-y-1 overflow-y-auto pr-2">
                            {valoraciones.map((item: Valoracion) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr_1fr_1fr_0.8fr] gap-4 items-center px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <div className="font-mono text-xs text-gray-400">{item.id}</div>
                                    <div className="font-medium text-gray-800 truncate">{item.cliente}</div>
                                    <div className="text-gray-600 text-xs">{item.fecha}</div>
                                    <div className="font-mono text-xs text-gray-500">{item.nTicket}</div>
                                    <div
                                        className={cn(
                                            "text-xs font-semibold px-2 py-0.5 rounded-full w-fit",
                                            item.prioridad === 'Alta' ? 'bg-red-50 text-red-600' :
                                                item.prioridad === 'Media' ? 'bg-yellow-50 text-yellow-600' :
                                                    'bg-green-50 text-green-600'
                                        )}
                                        style={{ color: getPrioridadColor(item.prioridad) }}
                                    >
                                        {item.prioridad}
                                    </div>
                                    <RatingStarDisplay valoracion={item.valoracion} />
                                    <div className="flex justify-center">
                                        <button
                                            className="text-xs font-semibold px-2 py-1 rounded-md transition-colors text-blue-600 hover:bg-blue-50"
                                            onClick={() => console.log(`Ver ticket ${item.nTicket}`)}
                                        >
                                            Ver
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">

                        <Card className={`shadow-lg border-none`} style={{ backgroundColor: COLOR_NARANJA_SUAVE }}>
                            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Categoría</h3>
                            <div className="space-y-3 text-base">
                                <div className="flex justify-between items-center text-gray-700">
                                    <span className="flex items-center space-x-3">
                                        <span className="w-3.5 h-3.5 block rounded-full" style={{ backgroundColor: COLOR_ROJO }}></span>
                                        <span>Ticket Equipo</span>
                                    </span>
                                    <span className="font-bold text-gray-800">33.33%</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-700">
                                    <span className="flex items-center space-x-3">
                                        <span className="w-3.5 h-3.5 block rounded-full" style={{ backgroundColor: COLOR_VERDE }}></span>
                                        <span>Ticket Servicio</span>
                                    </span>
                                    <span className="font-bold text-gray-800">66.67%</span>
                                </div>
                            </div>
                        </Card>

                        <Card className={`shadow-lg border-none`} style={{ backgroundColor: COLOR_NARANJA_SUAVE }}>
                            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                                <h3 className="text-xl font-bold text-gray-800">Valoración:</h3>
                                <span className="text-base font-extrabold" style={{ color: COLOR_VERDE }}>✨ {estadoGeneral}</span>
                            </div>

                            <div className="flex items-center justify-between space-x-6">
                                <div
                                    className={`relative w-32 h-32 flex items-center justify-center rounded-full shadow-lg flex-shrink-0`}
                                    style={{
                                        backgroundImage: `conic-gradient(${COLOR_NARANJA} 0% ${porcentajeNPS}%, ${COLOR_GRIS_CLARO} ${porcentajeNPS}%)`
                                    }}
                                >
                                    <div
                                        className="absolute w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-inner"
                                        style={{ backgroundColor: COLOR_NARANJA_SUAVE }}
                                    >
                                        <p className="text-4xl font-extrabold text-gray-800">{porcentajeNPS}%</p>
                                    </div>
                                </div>

                                <div className="w-full space-y-3 text-sm">
                                    {prioridadMetrics.map((item, index: number) => {
                                        const barColor: string = getPrioridadColor(item.prioridad);
                                        return (
                                            <div key={index} className="flex items-center space-x-2">
                                                <span className="font-semibold text-gray-700 w-12">{item.prioridad}</span>
                                                <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-500"
                                                        style={{
                                                            width: `${item.porcentaje}%`,
                                                            backgroundColor: barColor
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-6 w-full space-y-2 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-gray-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-green-500" /> Positivas (4-5)</p>
                                    <span className="text-xl font-bold text-green-600">{promotores}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-gray-700 flex items-center"><MinusCircle className="w-5 h-5 mr-2 text-red-500" /> Negativas (1-2)</p>
                                    <span className="text-xl font-bold text-red-600">{detractores}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="rounded-xl shadow-lg bg-white border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Distribución Detallada</h3>
                            <div className="space-y-4">
                                {/* Renderiza las barras del 5 al 1 */}
                                {[5, 4, 3, 2, 1].map((rating: number) => (
                                    <DetailedRatingBar
                                        key={rating}
                                        rating={rating}
                                        count={countsByRating[rating - 1]}
                                        maxCount={maxRatingCount}
                                        total={total}
                                    />
                                ))}
                            </div>
                        </Card>

                    </div>

                </div>

                <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
                    <button
                        onClick={() => onOpenChange(false)}
                        className={`px-6 py-2 rounded-lg text-white font-semibold shadow-md transition-colors hover:bg-opacity-90`}
                        style={{ backgroundColor: COLOR_NARANJA }}
                    >
                        Cerrar Resumen
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const ValorizacionDashboardPreview: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const testCliente: ValoracionModalProps['cliente'] = {
        nombre: 'J&P PERIFERICOS S.A.C.',
        ubicacion: 'Los Olivos'
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-8 font-inter">
            <script src="https://cdn.tailwindcss.com"></script>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap'); .font-inter { font-family: 'Inter', sans-serif; }`}</style>

            <h1 className="text-3xl font-bold text-gray-700 mb-6">Prueba del Componente Modal Shadcn/TSX</h1>

            <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-xl hover:bg-blue-700 transition-colors"
            >
                Abrir Modal de Valoración
            </button>

            <ValorizacionModal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                cliente={testCliente}
            />
        </div>
    );
};

export default ValorizacionDashboardPreview;