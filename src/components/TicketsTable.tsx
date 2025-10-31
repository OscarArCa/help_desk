import React, { useState, useEffect } from "react";
import { Search, Calendar, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiFetch } from "@/services/api";

const COLOR_NARANJA = "#FFA82E";

const getEstadoClass = (estado: string) => {
  return estado === "Activo"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";
};

const TicketsTable: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  useEffect(() => {
    async function fetchTickets() {
      try {
        const data = await apiFetch("/tickets");
        setTickets(data);
      } catch (err: any) {
        console.error("Error al obtener tickets:", err);
        setError("No se pudieron cargar los tickets");
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, []);

  if (loading) return <p className="text-center">Cargando tickets...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  return (
    <div className="space-y-6 m-[20px]">
      <div className="flex flex-wrap items-end gap-4 p-4 rounded-lg border border-gray-200 shadow-sm m-[10px]">
        <div className="flex-1 min-w-[200px] max-w-[300px] m-[10px]">
          <label className="text-sm font-semibold">Tipo de incidente</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar Tipo de Incidente"
              className="pl-10 h-10 border-gray-300 focus:border-[#FFA82E]"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-md">
        {/* Cabecera */}
        <div className={`grid grid-cols-tickets-lg gap-px text-sm font-semibold text-white bg-[${COLOR_NARANJA}] p-[10px]`}>
          <div className="p-3">Id</div>
          <div className="p-3">Tipo de incidente</div>
          <div className="p-3">Usuario</div>
          <div className="p-3">Empresa</div>
          <div className="p-3">Área</div>
          <div className="p-3">Sucursal</div>
          <div className="p-3">Estado</div>
          <div className="p-3">Fecha de Reg.</div>
          <div className="p-3 text-center"></div>
        </div>

        {/* Filas de Datos */}
        {currentTickets.map((ticket, index) => (
          <div
            key={ticket.id}
            className={`grid grid-cols-tickets-lg gap-px text-sm border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} p-[10px]`}
          >
            <div className="p-3 font-medium text-gray-700">{ticket.id}</div>
            <div className="p-3">{ticket.incident_type}</div>
            <div className="p-3">{ticket.client_name}</div>
            <div className="p-3">{ticket.company}</div>
            <div className="p-3">{ticket.area}</div>
            <div className="p-3">{ticket.branch}</div>
            <div className="p-3">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getEstadoClass(ticket.estado)}`}
              >
                {ticket.state}
              </span>
            </div>
            <div className="p-3">{ticket.registration_date}</div>
            <div className="p-3 flex justify-center">
              <Mail
                className={`w-5 h-5 cursor-pointer hover:opacity-80`}
                style={{ color: COLOR_NARANJA }}
                onClick={() => navigate(`/chat`)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-[#FFA82E] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TicketsTable;
