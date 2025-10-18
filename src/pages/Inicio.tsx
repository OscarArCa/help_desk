import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, Bell, History, Star, MessageSquare, ArrowLeft, CheckCircle, X, User, LogOut, Users } from 'lucide-react';

// --- SIMULACIÓN DE COMPONENTES DE UI (Para el entorno de un solo archivo) ---
const Card: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({ className, children, ...props }) => (
    <div className={`bg-white rounded-xl p-4 ${className}`} {...props}>{children}</div>
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


// --- LIBRERÍAS DE DIALOGO (Incluidas aquí para simplificar) ---
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

// --- Códigos de Color (VERIFICADOS y Correctos) ---
const COLOR_NARANJA = '#FFA82E';
const COLOR_GRIS_CLARO = '#F9F9F9';      // Fondo de las Cards de estadísticas
const COLOR_GRIS_MEDIO = '#979797';

const COLOR_ROJO = '#EF4444';
const COLOR_AMARILLO = '#F59E0B';
const COLOR_VERDE = '#10B981';

// --- 1. UTILIDAD DE CLASES (cn) ---
function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

// --- 2. COMPONENTES DIALOG BASE (Integrados) ---
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
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
                "fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white shadow-2xl duration-200 sm:rounded-xl overflow-hidden w-[90vw] h-[90vh] max-w-none",
                className
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-6 w-6 text-gray-400 hover:text-gray-700" />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;


// --- COMPONENTES PRINCIPALES INTEGRADOS (Header y Sidebar) ---

// Componente Header Integrado
interface HeaderProps {
    title: string;
    icon: React.ElementType;
}

const Header: React.FC<HeaderProps> = ({ title, icon: Icon }) => (
    <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center space-x-3">
            <Icon className={`w-8 h-8`} style={{ color: COLOR_NARANJA }} />
            <span>{title}</span>
        </h1>
    </div>
);

// Componente Sidebar Integrado (CON PERFIL Y COLORES DEFINITIVOS)
const Sidebar: React.FC = () => {
    // Definimos el color activo en Tailwind para el borde
    const activeBorderColor = `border-[${COLOR_NARANJA}]`;

    // Función auxiliar para un ítem de navegación
    const NavItem: React.FC<{ to: string, icon: React.ElementType, label: string, active?: boolean }> = ({ to, icon: Icon, label, active }) => (
        <Link
            to={to}
            className={cn(
                "flex items-center space-x-3 p-3 rounded-lg text-gray-700 transition-all duration-150",
                "hover:bg-gray-100/80 border-l-4 border-transparent", // Estilo base de inactivo
                {
                    'bg-gray-100 font-semibold border-l-4': active,
                    [activeBorderColor]: active, // Borde activo con color naranja
                }
            )}
        >
            <Icon className="w-5 h-5 text-gray-700" />
            <span className="text-sm">{label}</span>
        </Link>
    );

    return (
        // Utilizamos el color blanco para el fondo principal del Sidebar según la imagen más reciente
        <nav className={`fixed left-0 top-0 h-full w-[240px] bg-white text-gray-900 shadow-xl z-40 flex flex-col`}>

            {/* 1. SECCIÓN DE PERFIL (Fondo Naranja) */}
            <div className="p-6 text-white flex flex-col items-center" style={{ backgroundColor: COLOR_NARANJA }}>
                {/* Icono de usuario grande */}
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2">
                    <User className="w-10 h-10" style={{ color: COLOR_NARANJA }} />
                </div>
                <p className="font-bold text-lg">Alberto Perez</p>
                <p className="text-sm font-light">Soporte TI</p>
            </div>

            {/* 2. SECCIÓN DE NAVEGACIÓN PRINCIPAL */}
            <div className="flex-1 p-3 space-y-1">
                {/* Nota: En tu imagen, 'Tickets' está activo, así que lo marco como activo */}
                <NavItem to="/" icon={Home} label="Inicio" />
                <NavItem to="/tickets" icon={FileText} label="Tickets" active={true} />
                <NavItem to="/clientes" icon={Users} label="Cliente" />
            </div>

            {/* 3. SECCIÓN INFERIOR (Perfil y Cerrar Sesión) */}
            <div className="p-3 border-t mt-auto space-y-1">
                <NavItem to="/perfil" icon={User} label="Perfil" />
                <NavItem to="/logout" icon={LogOut} label="Cerrar Sesión" />
            </div>
        </nav>
    );
};


// --- 3. COMPONENTE VALORACION MODAL (Contenido y Lógica) ---

// Tipado de Datos
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
    if (valor <= 3) return COLOR_AMARILLO;
    return COLOR_VERDE;
};

const ValoracionModalContent: React.FC<ValoracionModalProps> = ({ isOpen, onClose }) => {
    const totalValoraciones = valoraciones.length;
    const valoraciones5y4 = valoraciones.filter(v => v.valoracion >= 4).length;
    const porcentajeSatisfaccion = ((valoraciones5y4 / totalValoraciones) * 100).toFixed(0);
    const valoraciones1y2 = valoraciones.filter(v => v.valoracion <= 2).length;

    const countByRating = [0, 0, 0, 0, 0];
    valoraciones.forEach(v => {
        countByRating[v.valoracion - 1]++;
    });
    const maxRatingCount = Math.max(...countByRating);


    const RatingBar: React.FC<{ rating: number, count: number, total: number }> = ({ rating, count }) => {
        const normalizedWidth = maxRatingCount > 0 ? (count / maxRatingCount) * 100 : 0;
        let barColor = COLOR_VERDE;
        if (rating <= 2) barColor = COLOR_ROJO;
        else if (rating === 3) barColor = COLOR_AMARILLO;

        return (
            <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span className="font-semibold">{rating} <Star className="w-4 h-4 inline" fill={COLOR_NARANJA} style={{ color: COLOR_NARANJA }} /></span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                        className="h-3 rounded-full"
                        style={{ width: `${normalizedWidth}%`, backgroundColor: barColor }}
                    ></div>
                </div>
                <span className="w-10 text-right font-medium">{count}</span>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl w-[90%] h-[90vh] p-0 flex flex-col">
                <div className="flex justify-between items-center p-6 border-b">
                    <div className="flex items-center space-x-4">
                        <ArrowLeft className={`w-6 h-6 text-gray-400 cursor-pointer`} onClick={onClose} />
                        <h2 className="text-2xl font-bold text-gray-800">
                            Valorización de Satisfacción
                        </h2>
                    </div>
                    <div className="text-right text-sm">
                        <p className="font-semibold text-gray-800">J&P PERIFERICOS S.A.C.</p>
                        <p className="text-xs text-gray-500">Los Olivos</p>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 space-y-4 flex flex-col">
                        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Detalle de Valoraciones Recientes</h3>

                        <div className="grid grid-cols-7 gap-4 p-3 bg-gray-100 font-semibold text-sm rounded-t-lg text-gray-600 border-b">
                            <div className="col-span-1">ID</div>
                            <div className="col-span-1">Cliente</div>
                            <div>Fecha</div>
                            <div>N° Ticket</div>
                            <div>Prioridad</div>
                            <div className="text-center">Valoración</div>
                            <div className="text-center">Acción</div>
                        </div>

                        <div className="flex-1 space-y-2 overflow-y-auto pr-2">
                            {valoraciones.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-7 gap-4 items-center p-3 text-sm border-b hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <div className="col-span-1 font-mono text-xs text-gray-500">{item.id}</div>
                                    <div className="col-span-1 font-medium text-gray-800 truncate">{item.cliente}</div>
                                    <div className="text-gray-600 text-xs">{item.fecha}</div>
                                    <div className="font-mono text-xs text-gray-500">{item.nTicket}</div>
                                    <div
                                        className={cn("text-xs font-semibold px-2 py-0.5 rounded-full w-fit", {
                                            'bg-red-100 text-red-600': item.prioridad === 'Alta',
                                            'bg-yellow-100 text-yellow-600': item.prioridad === 'Media',
                                            'bg-green-100 text-green-600': item.prioridad === 'Baja',
                                        })}
                                    >
                                        {item.prioridad}
                                    </div>
                                    <div className="flex justify-center items-center space-x-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-3.5 h-3.5"
                                                style={{ color: i < item.valoracion ? getValoracionColor(item.valoracion) : COLOR_GRIS_MEDIO }}
                                                fill={i < item.valoracion ? getValoracionColor(item.valoracion) : 'none'}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-center">
                                        <Button
                                            style={{ color: '#3B82F6' }} // Azul Tailwind 500
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

                    <div className="lg:col-span-1 space-y-6">
                        <Card className={`rounded-xl shadow-lg p-6 border-t-4`} style={{ borderColor: COLOR_NARANJA }}>
                            <CardTitle className="text-xl font-bold text-gray-800 mb-4">Métricas Clave</CardTitle>

                            <div
                                className={`relative w-40 h-40 flex items-center justify-center rounded-full bg-white shadow-xl mx-auto`}
                                style={{
                                    backgroundImage: `conic-gradient(${COLOR_VERDE} ${porcentajeSatisfaccion}%, ${COLOR_GRIS_CLARO} ${porcentajeSatisfaccion}%)`
                                }}
                            >
                                <div className="absolute w-36 h-36 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                                    <p className="text-5xl font-extrabold" style={{ color: COLOR_VERDE }}>{porcentajeSatisfaccion}%</p>
                                    <p className="text-xs text-gray-500">NPS General</p>
                                </div>
                            </div>

                            <div className="mt-6 w-full space-y-2">
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-gray-700 flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-500" /> Positivas (4-5)</p>
                                    <span className="text-lg font-bold text-green-600">{valoraciones5y4}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-gray-700 flex items-center"><X className="w-4 h-4 mr-1 text-red-500" /> Negativas (1-2)</p>
                                    <span className="text-lg font-bold text-red-600">{valoraciones1y2}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t">
                                    <p className="font-medium text-gray-700">Total Valoraciones</p>
                                    <span className="text-lg font-bold text-gray-800">{totalValoraciones}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="rounded-xl shadow-lg p-6">
                            <CardTitle className="text-xl font-bold text-gray-800 mb-4">Distribución por Rating</CardTitle>
                            <div className="space-y-3">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <RatingBar
                                        key={rating}
                                        rating={rating as 1 | 2 | 3 | 4 | 5}
                                        count={countByRating[rating - 1]}
                                        total={totalValoraciones}
                                    />
                                ))}
                            </div>
                        </Card>
                    </div>

                </div>

                <div className="p-4 border-t flex justify-end bg-gray-50">
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


// --- Componentes Reutilizables ---

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    navigateTo?: string; // Opcional para navegación normal
    onAction?: () => void; // Prop para acciones (como abrir modal)
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, navigateTo, onAction }) => (
    // Card con fondo gris claro y sombra suave
    <Card className={`rounded-xl shadow-md p-4 flex flex-col justify-between h-40`} style={{ backgroundColor: COLOR_GRIS_CLARO }}>
        <CardHeader className="p-0 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-800">{title}</CardTitle>
            <Icon className={`w-8 h-8`} style={{ color: COLOR_NARANJA }} />
        </CardHeader>
        <CardContent className="p-0 flex justify-between items-end">
            <p className="text-5xl font-extrabold text-gray-900">{value}</p>
            {/* Botón de acción/navegación */}
            {navigateTo ? (
                <Link to={navigateTo}>
                    <Button
                        className={`bg-white border-none font-bold shadow-sm hover:bg-gray-100`}
                        style={{ color: COLOR_NARANJA }}
                    >
                        Ver
                    </Button>
                </Link>
            ) : (
                <Button
                    className={`bg-white border-none font-bold shadow-sm hover:bg-gray-100`}
                    style={{ color: COLOR_NARANJA }}
                    onClick={onAction}
                >
                    Ver
                </Button>
            )}
        </CardContent>
    </Card>
);

const MessageRow: React.FC<{ id: string; sender?: string; message: string; time: string; active?: boolean }> = ({ id, sender, message, time, active }) => (
    <div className={`flex justify-between items-center p-2 text-sm ${active ? `bg-orange-50 rounded` : ''}`}>
        <div className="flex space-x-2">
            <span className={`font-mono text-[${COLOR_GRIS_MEDIO}]`}>{id}</span>
            <span className="text-gray-800 font-medium">{sender}</span>
            <span className="text-gray-600">{message}</span>
        </div>
        <span className={`text-xs ${active ? `text-[${COLOR_NARANJA}]` : `text-[${COLOR_GRIS_MEDIO}]`}`}>{time}</span>
    </div>
);

// --- 4. Componente Principal Inicio (Orquestador de Modales) ---

const Inicio: React.FC = () => {
    // Estado para Modal de Valorización
    const [isValoracionModalOpen, setIsValoracionModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            {/* Sidebar con estructura y colores definitivos */}
            <Sidebar />

            {/* Aumentamos el margen para compensar el ancho del sidebar */}
            <main className="ml-[240px] flex-1 p-8">

                <Header title="Inicio" icon={Home} />

                {/* 4 TARJETAS DE ESTADÍSTICAS */}
                <div className="grid grid-cols-4 gap-6">
                    <StatsCard title="Tickets Activos" value={5} icon={FileText} navigateTo="/tickets" />
                    <StatsCard title="Tickets Urgentes" value={2} icon={Bell} navigateTo="/tickets" />
                    <StatsCard title="Historial de Tickets" value={25} icon={History} navigateTo="/tickets" />

                    {/* Tarjeta de Valorización: ACTIVA EL MODAL DE VALORACIÓN */}
                    <StatsCard
                        title="Valorización de Satisfacción"
                        value={"90%"}
                        icon={Star}
                        onAction={() => setIsValoracionModalOpen(true)} // ABRIR MODAL
                    />
                </div>

                {/* PANEL DE MENSAJES DE TICKETS */}
                <Card className="mt-10 rounded-xl shadow-lg w-3/4 mx-auto bg-white">
                    <CardHeader className="flex flex-row items-center space-x-2 border-b p-4">
                        <MessageSquare className="w-6 h-6" style={{ color: COLOR_NARANJA }} />
                        <CardTitle className="text-xl font-bold">Mensajes de Tickets</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                        <MessageRow
                            id="#T-0000001"
                            sender="Fernandes - Soporte."
                            message="Te envío un....."
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
            </main>

            {/* MODAL: VALORACIÓN (Único modal activo) */}
            <ValoracionModalContent
                isOpen={isValoracionModalOpen}
                onClose={() => setIsValoracionModalOpen(false)}
            />
        </div>
    );
};

export default Inicio;