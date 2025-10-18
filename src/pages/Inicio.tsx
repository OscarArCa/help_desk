import React, { useState, useMemo } from 'react';
import { Home, FileText, Bell, History, Star, MessageSquare, ArrowLeft, CheckCircle, X, User, LogOut, Users, MinusCircle } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

// --- CÓDIGOS DE COLOR DEFINITIVOS ---
const COLOR_NARANJA = '#FFA82E'; // Botones, acentos principales
const COLOR_GRIS_ACTIVO = '#EBEBEB'; // Hover en Sidebar
const COLOR_NEGRO_TEXTO = '#000000'; // Texto principal

// Colores del Modal
const COLOR_GRIS_CLARO = '#F9F9F9';
const COLOR_GRIS_MEDIO = '#979797';
const COLOR_ROJO = '#EF4444'; // Valoración 1-2 / Prioridad Alta
const COLOR_AMARILLO = '#F59E0B'; // Valoración 3 / Prioridad Media
const COLOR_VERDE = '#10B981'; // Valoración 4-5 / Prioridad Baja
const COLOR_NARANJA_SUAVE = '#FFE0B2'; // Fondo de tarjetas de métricas

// --- HELPERS ---

// Definición de tipos para la utilidad de concatenación de clases
type ClassValue = string | number | boolean | null | undefined;
const cn = (...classes: ClassValue[]): string => {
    return classes.filter(Boolean).join(' ');
};

// --- SIMULACIÓN DE COMPONENTES DE UI ---

const Card: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({ className, children, ...props }) => (
    <div className={`bg-white rounded-xl p-4 shadow-lg ${className}`} {...props}>{children}</div>
);
const CardHeader: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({ className, children, ...props }) => (
    <div className={`flex flex-col space-y-1.5 ${className}`} {...props}>{children}</div>
);
const CardTitle: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>> = ({ className, children, ...props }) => (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>{children}</h3>
);
const CardContent: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({ className, children, ...props }) => (
    <div className={`p-0 ${className}`} {...props}>{children}</div>
);
const Button: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>> = ({ className, children, ...props }) => (
    <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 ${className}`} {...props}>{children}</button>
);


// --- COMPONENTES DIALOG BASE (Integrados usando Radix) ---
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn( // className se incluye aquí
            "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] border bg-white shadow-2xl duration-200 sm:rounded-xl overflow-hidden w-[90vw] h-[90vh] max-w-none",
                className
            )}
            style={{ backgroundColor: '#FFFFFF' }}
            {...props}
        >
            {children}
            {/* Botón de cierre `X` del modal */}
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                <X className="h-6 w-6 text-gray-400 hover:text-gray-700" />
                <span className="sr-only">Cerrar</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;


// --- COMPONENTE SIDEBAR ---

interface NavItemProps {
    to: string;
    icon: React.ElementType;
    label: string;
    active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, active }) => {

    const baseClasses = `flex items-center space-x-3 transition-colors cursor-pointer text-[0.9375rem] py-[0.75rem] px-3 border-l-4`;

    if (active) {
        return (
            // Uso de <a> en lugar de <Link> para evitar dependencia estricta de react-router-dom
            <a
                href={to}
                className={cn(
                    baseClasses,
                    "font-medium"
                )}
                style={{
                    backgroundColor: COLOR_GRIS_ACTIVO,
                    borderColor: COLOR_NARANJA,
                    color: COLOR_NEGRO_TEXTO
                }}
            >
                <Icon className="w-5 h-5" style={{ color: COLOR_NEGRO_TEXTO }} />
                <span className="text-sm">{label}</span>
            </a>
        );
    }

    return (
        // Uso de <a> en lugar de <Link> para evitar dependencia estricta de react-router-dom
        <a
            href={to}
            className={cn(
                baseClasses,
                "border-transparent",
                `text-gray-700 hover:bg-gray-100`
            )}
        >
            <Icon className="w-5 h-5 text-gray-700" />
            <span className="text-sm">{label}</span>
        </a>
    );
};

const Sidebar: React.FC = () => {
    return (
        <nav className={`fixed left-0 top-0 h-full w-[240px] bg-white text-gray-900 shadow-xl z-40 flex flex-col font-inter`}>

            {/* 1. SECCIÓN DE PERFIL (Fondo Naranja) */}
            <div className="p-6 text-white flex flex-col items-center h-[180px] justify-center" style={{ backgroundColor: COLOR_NARANJA }}>
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2">
                    <User className="w-10 h-10" style={{ color: COLOR_NEGRO_TEXTO }} />
                </div>
                <p className="font-bold text-lg">Alberto Perez</p>
                <p className="text-sm font-light opacity-90">Soporte TI</p>
            </div>

            {/* 2. SECCIÓN DE NAVEGACIÓN PRINCIPAL */}
            <div className="flex-1 p-3 space-y-1">
                <NavItem to="/" icon={Home} label="Inicio" active={true} />
                <NavItem to="/tickets" icon={FileText} label="Tickets" active={false} />
                <NavItem to="/clientes" icon={Users} label="Cliente" active={false} />
            </div>

            {/* 3. SECCIÓN INFERIOR (Perfil y Cerrar Sesión) */}
            <div className="p-3 border-t mt-auto space-y-1">
                <NavItem to="/perfil" icon={User} label="Perfil" active={false} />
                <NavItem to="/logout" icon={LogOut} label="Cerrar Sesión" active={false} />
            </div>
        </nav>
    );
};


// --- COMPONENTES PRINCIPALES INTEGRADOS (Header) ---
interface HeaderProps {
    title: string;
    icon: React.ElementType;
}

const Header: React.FC<HeaderProps> = ({ title, icon: Icon }) => (
    <div className="flex items-center justify-between pb-4 mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center space-x-3">
            <Icon className={`w-8 h-8`} style={{ color: COLOR_NARANJA }} />
            <span>{title}</span>
        </h1>
    </div>
);


// --- DATOS Y COMPONENTE MODAL DE VALORACIÓN ---
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
    onClose: () => void;
}

// Datos Falsos
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

const getValoracionColor = (valor: 1 | 2 | 3 | 4 | 5) => {
    if (valor <= 2) return COLOR_ROJO;
    if (valor === 3) return COLOR_AMARILLO;
    return COLOR_VERDE;
};

// Componente para la barra de distribución de ratings (5 a 1)
const RatingBar: React.FC<{ rating: number, count: number, maxCount: number }> = ({ rating, count, maxCount }) => {
    const normalizedWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;
    let barColor = COLOR_VERDE;
    if (rating <= 2) barColor = COLOR_ROJO;
    else if (rating === 3) barColor = COLOR_AMARILLO;

    return (
        <div className="flex items-center space-x-2 text-sm text-gray-700">
            <span className="font-semibold w-12 flex items-center justify-end">{rating} <Star className="w-4 h-4 ml-1" fill={barColor} style={{ color: barColor }} /></span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ width: `${normalizedWidth}%`, backgroundColor: barColor }}
                ></div>
            </div>
            <span className="w-10 text-right font-medium">{count}</span>
        </div>
    );
};

// Componente para mostrar las estrellas en la tabla
const RatingStarDisplay: React.FC<{ valoracion: Valoracion['valoracion'] }> = ({ valoracion }) => {
    const starColor = getValoracionColor(valoracion);

    return (
        <div className="flex justify-center items-center space-x-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className="w-3.5 h-3.5 transition-colors"
                    style={{ color: i < valoracion ? starColor : COLOR_GRIS_MEDIO }}
                    fill={i < valoracion ? starColor : 'none'}
                    strokeWidth={i < valoracion ? 0 : 1.5}
                />
            ))}
        </div>
    );
};


// El componente que el usuario quiere llamar 'Valorizacion Modal'
const ValoracionModalContent: React.FC<ValoracionModalProps> = ({ isOpen, onClose }) => {

    const { valoraciones5y4, porcentajeSatisfaccion, valoraciones1y2, countByRating, maxRatingCount, prioridadCounts } = useMemo(() => {
        const totalValoraciones = valoraciones.length;
        const valoraciones5y4 = valoraciones.filter(v => v.valoracion >= 4).length;
        // La variable totalValoraciones se usa aquí para calcular porcentajeSatisfaccion
        const porcentajeSatisfaccion = ((valoraciones5y4 / totalValoraciones) * 100).toFixed(0);
        const valoraciones1y2 = valoraciones.filter(v => v.valoracion <= 2).length;

        const countByRating = [0, 0, 0, 0, 0];
        valoraciones.forEach(v => {
            countByRating[v.valoracion - 1]++;
        });
        const maxRatingCount = Math.max(...countByRating);

        const prioridadCounts = valoraciones.reduce((acc, curr) => {
            acc[curr.prioridad] = (acc[curr.prioridad] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // totalValoraciones no se devuelve para evitar el error de variable no utilizada
        return { valoraciones5y4, porcentajeSatisfaccion, valoraciones1y2, countByRating, maxRatingCount, prioridadCounts };
    }, []);

    const estadoGeneral = parseInt(porcentajeSatisfaccion) >= 80 ? 'Excelente' : parseInt(porcentajeSatisfaccion) >= 50 ? 'Bueno' : 'Regular';
    const priorities = ['Alta', 'Media', 'Baja'];
    const priorityCountsArray = priorities.map(p => prioridadCounts[p] || 0);
    const maxPriorityCount = Math.max(...priorityCountsArray);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl w-[90%] h-[90vh] p-0 flex flex-col font-inter">

                {/* 1. HEADER DEL MODAL */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white relative">
                    <div className="flex items-center space-x-4">
                        <ArrowLeft className={`w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-700`} onClick={onClose} />
                        <h2 className="text-2xl font-bold text-gray-800">
                            Valorización de Satisfacción
                        </h2>
                    </div>
                    {/* Info del Cliente */}
                    <div className="text-right text-sm">
                        <p className="font-semibold text-gray-800">J&P PERIFERICOS S.A.C.</p>
                        <p className="text-xs text-gray-500">Los Olivos</p>
                    </div>
                </div>

                {/* 2. CONTENIDO: GRID DE 3 COLUMNAS (2 para tabla, 1 para métricas) */}
                <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gray-50">

                    {/* COLUMNA 1 & 2: DETALLE DE VALORACIONES (Tabla) - IZQUIERDA */}
                    <div className="lg:col-span-2 space-y-4 flex flex-col bg-white p-4 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Detalle de Valoraciones Recientes</h3>

                        {/* Headers de la tabla */}
                        <div className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr_1fr_1fr_0.8fr] gap-4 p-3 bg-gray-100 font-semibold text-sm rounded-t-lg text-gray-600 sticky top-0 z-10 shadow-sm">
                            <div className="col-span-1">Id</div>
                            <div className="col-span-1">Cliente</div>
                            <div>Fecha</div>
                            <div>N° Ticket</div>
                            <div>Prioridad</div>
                            <div className="text-center">Valoración</div>
                            <div className="text-center">Acción</div>
                        </div>

                        {/* Filas de la tabla (Scrollable) */}
                        <div className="flex-1 space-y-2 overflow-y-auto pr-2">
                            {valoraciones.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr_1fr_1fr_0.8fr] gap-4 items-center p-3 text-sm border-b hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <div className="col-span-1 font-mono text-xs text-gray-500">{item.id}</div>
                                    <div className="col-span-1 font-medium text-gray-800 truncate">{item.cliente}</div>
                                    <div className="text-gray-600 text-xs">{item.fecha}</div>
                                    <div className="font-mono text-xs text-gray-500">{item.nTicket}</div>
                                    <div
                                        className={cn(
                                            "text-xs font-semibold px-2 py-0.5 rounded-full w-fit",
                                            item.prioridad === 'Alta' ? 'bg-red-100 text-red-600' :
                                                item.prioridad === 'Media' ? 'bg-yellow-100 text-yellow-600' :
                                                    'bg-green-100 text-green-600'
                                        )}
                                    >
                                        {item.prioridad}
                                    </div>
                                    <RatingStarDisplay valoracion={item.valoracion} />
                                    <div className="flex justify-center">
                                        <Button
                                            style={{ color: '#3B82F6' }}
                                            className="h-7 text-xs p-1 bg-transparent hover:bg-blue-50/70"
                                            onClick={() => console.log(`Ver detalles del ticket ${item.nTicket}`)}
                                        >
                                            Ver Ticket
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* COLUMNA 3: MÉTRICAS CLAVE Y DISTRIBUCIÓN - DERECHA */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Tarjeta 1 (ARRIBA): Categoría - Fondo Naranja Suave */}
                        <Card className={`rounded-xl shadow-lg p-6`} style={{ backgroundColor: COLOR_NARANJA_SUAVE }}>
                            <CardTitle className="text-xl font-bold text-gray-800 mb-4">Categoría</CardTitle>
                            <div className="space-y-2 text-sm">
                                {/* Simulación de datos de categoría */}
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center space-x-2">
                                        <span className="w-3 h-3 block rounded-full" style={{ backgroundColor: COLOR_ROJO }}></span>
                                        <span>Ticket Equipo</span>
                                    </span>
                                    <span className="font-semibold text-gray-700">33.33%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center space-x-2">
                                        <span className="w-3 h-3 block rounded-full" style={{ backgroundColor: COLOR_VERDE }}></span>
                                        <span>Ticket Servicio</span>
                                    </span>
                                    <span className="font-semibold text-gray-700">66.67%</span>
                                </div>
                            </div>
                        </Card>

                        {/* Tarjeta 2 (MEDIO): Valorización - Gráfico Circular y Barras de Distribución - Fondo Naranja Suave */}
                        <Card className={`rounded-xl shadow-lg p-6`} style={{ backgroundColor: COLOR_NARANJA_SUAVE }}>
                            <CardTitle className="text-xl font-bold text-gray-800 mb-4 flex justify-between items-center">
                                <span>Valoración:</span>
                                <span className="text-base font-extrabold" style={{ color: COLOR_VERDE }}>✨ {estadoGeneral}</span>
                            </CardTitle>

                            {/* Contenedor del Gráfico Circular y Barras de Prioridad */}
                            <div className="flex items-center justify-between space-x-4">

                                {/* Gráfico Circular NPS */}
                                <div
                                    className={`relative w-28 h-28 flex items-center justify-center rounded-full bg-white shadow-xl flex-shrink-0`}
                                    style={{
                                        // Usamos VERDE para la satisfacción / NARANJA para el fondo de la métrica
                                        backgroundImage: `conic-gradient(${COLOR_VERDE} ${porcentajeSatisfaccion}%, ${COLOR_GRIS_CLARO} ${porcentajeSatisfaccion}%)`
                                    }}
                                >
                                    <div className="absolute w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                                        <p className="text-3xl font-extrabold" style={{ color: COLOR_VERDE }}>{porcentajeSatisfaccion}%</p>
                                        <p className="text-xs text-gray-500">Satisfacción</p>
                                    </div>
                                </div>

                                {/* Barras de Prioridad */}
                                <div className="w-full space-y-2">
                                    {priorities.map((label, index) => {
                                        const count = prioridadCounts[label] || 0;
                                        const color = label === 'Alta' ? COLOR_ROJO : label === 'Media' ? COLOR_AMARILLO : COLOR_VERDE;
                                        const normalizedWidth = maxPriorityCount > 0 ? (count / maxPriorityCount) * 100 : 0;

                                        return (
                                            <div key={index} className="flex items-center space-x-2 text-sm">
                                                <span className="font-semibold text-gray-700 w-10">{label}</span>
                                                <div className="flex-1 bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className="h-3 rounded-full transition-all duration-500"
                                                        style={{
                                                            width: `${normalizedWidth}%`,
                                                            backgroundColor: color
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Contadores Clave (Parte Inferior de la Tarjeta) */}
                            <div className="mt-6 w-full space-y-2 pt-2 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-gray-700 flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-500" /> Positivas (4-5)</p>
                                    <span className="text-lg font-bold text-green-600">{valoraciones5y4}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-gray-700 flex items-center"><MinusCircle className="w-4 h-4 mr-1 text-red-500" /> Negativas (1-2)</p>
                                    <span className="text-lg font-bold text-red-600">{valoraciones1y2}</span>
                                </div>
                            </div>
                        </Card>

                        {/* Tarjeta 3 (ABAJO): Distribución por Rating Detallado - Fondo Blanco */}
                        <Card className="rounded-xl shadow-lg p-6">
                            <CardTitle className="text-xl font-bold text-gray-800 mb-4">Distribución por Rating</CardTitle>
                            <div className="space-y-3">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <RatingBar
                                        key={rating}
                                        rating={rating as 1 | 2 | 3 | 4 | 5}
                                        count={countByRating[rating - 1]}
                                        maxCount={maxRatingCount}
                                    />
                                ))}
                            </div>
                        </Card>

                    </div> {/* Fin Columna 3 */}

                </div> {/* Fin Grid */}

                {/* 3. FOOTER DEL MODAL (Botón Cerrar Resumen) */}
                <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
                    <Button
                        onClick={onClose}
                        className={`hover:bg-orange-600 text-white font-semibold`}
                        style={{ backgroundColor: COLOR_NARANJA }}
                    >
                        Cerrar Resumen
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};


// --- COMPONENTES REUTILIZABLES (StatsCard) ---
interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    navigateTo?: string;
    onAction?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, navigateTo, onAction }) => (
    <Card className={`rounded-xl shadow-md p-4 flex flex-col justify-between h-40 cursor-pointer`} style={{ backgroundColor: COLOR_NARANJA }} onClick={onAction || (() => window.location.href = navigateTo || '#')}>
        <CardHeader className="p-0 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold" style={{ color: COLOR_NEGRO_TEXTO }}>{title}</CardTitle>
            <Icon className={`w-8 h-8`} style={{ color: COLOR_NEGRO_TEXTO }} />
        </CardHeader>
        <CardContent className="p-0 flex justify-between items-end">
            <p className="text-5xl font-extrabold" style={{ color: COLOR_NEGRO_TEXTO }}>{value}</p>
            {/* El botón se simplifica si toda la tarjeta es clickeable */}
            <Button
                className={`bg-white border-none font-bold shadow-sm hover:bg-gray-100`}
                style={{ color: COLOR_NEGRO_TEXTO }}
                onClick={(e) => {
                    e.stopPropagation(); // Previene que el click en el botón active el click en la tarjeta si tienen diferente acción
                    // FIX: Reestructuramos la lógica para evitar 'no-unused-expressions'
                    if (onAction) {
                        onAction();
                    } else if (navigateTo) {
                        window.location.href = navigateTo;
                    } else {
                        window.location.href = '#';
                    }
                }}
            >
                Ver
            </Button>
        </CardContent>
    </Card>
);

const MessageRow: React.FC<{ id: string; sender?: string; message: string; time: string; active?: boolean }> = ({ id, sender, message, time, active }) => (
    <div className={`flex justify-between items-center p-2 text-sm ${active ? 'bg-orange-50 rounded' : ''}`}>
        <div className="flex space-x-2">
            <span className={`font-mono`} style={{ color: COLOR_GRIS_MEDIO }}>{id}</span>
            <span className="text-gray-800 font-medium">{sender}</span>
            <span className="text-gray-600 truncate max-w-xs">{message}</span>
        </div>
        <span className={`text-xs ${active ? 'text-orange-500' : 'text-gray-500'}`} style={active ? {color: COLOR_NARANJA} : {color: COLOR_GRIS_MEDIO}}>{time}</span>
    </div>
);

// --- 4. Componente Principal Inicio (Orquestador de Modales) ---

const Inicio: React.FC = () => {
    // Estado para controlar la apertura/cierre del modal
    const [isValoracionModalOpen, setIsValoracionModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex font-inter">
            {/* Importación de Tailwind y Fuente Inter */}
            <script src="https://cdn.tailwindcss.com"></script>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap'); .font-inter { font-family: 'Inter', sans-serif; }`}</style>

            <Sidebar />

            <main className="flex-1 p-8 ml-[240px]">
                {/* Contenedor Principal de la Vista */}
                <Card className="p-8 w-full min-h-[calc(100vh-64px)]">

                    <Header title="Inicio" icon={Home} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard title="Tickets Activos" value={5} icon={FileText} navigateTo="/tickets" />
                        <StatsCard title="Tickets Urgentes" value={2} icon={Bell} navigateTo="/tickets" />
                        <StatsCard title="Historial de Tickets" value={25} icon={History} navigateTo="/tickets" />

                        {/* TARJETA PARA ABRIR EL MODAL */}
                        <StatsCard
                            title="Valorización de Satisfacción"
                            value={"90%"}
                            icon={Star}
                            onAction={() => setIsValoracionModalOpen(true)} // Acción correcta
                        />
                    </div>

                    <Card className="mt-10 rounded-xl shadow-lg w-full max-w-4xl mx-auto bg-white">
                        <CardHeader className="flex flex-row items-center space-x-2 border-b p-4">
                            <MessageSquare className="w-6 h-6" style={{ color: COLOR_NARANJA }} />
                            <CardTitle className="text-xl font-bold">Mensajes de Tickets</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                            <MessageRow
                                id="#T-0000001"
                                sender="Fernandes - Soporte."
                                message="Te envío un..."
                                time="hace 20 min"
                                active={true}
                            />
                            {[...Array(3)].map((_, index) => (
                                <MessageRow
                                    key={index}
                                    id={`#T-000000${index + 2}`}
                                    message="Actualización de estado."
                                    time="hace 1 hora"
                                />
                            ))}
                        </CardContent>
                        <div className="p-3 text-center border-t">
                            <p className={`font-semibold`} style={{ color: COLOR_NARANJA }}>Tienes 1 mensaje nuevo por leer</p>
                        </div>
                    </Card>
                </Card>
            </main>

            {/* Renderizado del Modal de Valoración: Es esencial que esté al final del renderizado para la superposición Z-index */}
            <ValoracionModalContent
                isOpen={isValoracionModalOpen}
                onClose={() => setIsValoracionModalOpen(false)} // Función correcta para cerrar
            />
        </div>
    );
};

// Exportamos 'Inicio' como 'App' para cumplir con la estructura de un componente principal de React.
export default Inicio;
