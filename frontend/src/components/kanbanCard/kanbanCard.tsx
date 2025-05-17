import { useState } from 'react';
import './kanbanCard.css';
import { formatDate } from '../../utils/fomatDate';

interface Status {
    id: number;
    nome: string;
}

interface Pedido {
    id: number;
    descricao: string;
    recebido: string;
    prazo: string;
    status: Status;
}

interface KanbanCardProps {
    pedido: Pedido;
    status: Status[];
    onStatusChange: (pedidoId: number, newStatusId: number) => void;
}

export default function KanbanCard({ pedido, status, onStatusChange }: KanbanCardProps) {
    const [statusId, setStatusId] = useState(pedido.status.id);

    // Começa o drag: salva o id do pedido no dataTransfer
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('pedidoId', pedido.id.toString());
    };

    return (
        <div
            className="kanbanCard"
            draggable
            onDragStart={handleDragStart}
        >
            <h4>{pedido.descricao}</h4>
            <p>Recebido: {formatDate.toBrazilianDate(pedido.recebido)}</p>
            <p>Prazo: {formatDate.toBrazilianDate(pedido.prazo)}</p>
            <select
                value={statusId}
                disabled
            >
                {status.map((stat) => (
                    <option key={stat.id} value={stat.id}>
                        {stat.nome}
                    </option>
                ))}
            </select>
        </div>
    );
}
