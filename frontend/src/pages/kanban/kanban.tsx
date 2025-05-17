import { useEffect, useState } from 'react';
import { service } from '../../service/service';
import KanbanCard from '../../components/kanbanCard/kanbanCard';
import './kanban.css';

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
export default function Kanban() {
    const [status, setStatus] = useState<Status[]>([]);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    useEffect(() => {
        async function fetchData() {
            const sts = await service.listarStatus();
            setStatus(sts);
            const peds = await service.listarPedidos();
            setPedidos(peds);
        }
        fetchData();
    }, []);

    const handleStatusChange = async (pedidoId: number, newStatusId: number) => {
        try {
            const pedidoAtualizado = await service.atualizarStatusPedido(pedidoId, newStatusId);
            setPedidos((prev) =>
                prev.map((p) => (p.id === pedidoId ? pedidoAtualizado : p))
            );
        } catch (error) {
            console.error('Falha ao atualizar status:', error);
        }
    };

    // Funções para drag and drop na coluna
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Necessário para permitir o drop
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatusId: number) => {
        e.preventDefault();
        const pedidoIdStr = e.dataTransfer.getData('pedidoId');
        if (!pedidoIdStr) return;
        const pedidoId = Number(pedidoIdStr);
        handleStatusChange(pedidoId, newStatusId);
    };

    return (
        <div className="kanbanContainer">
            {status.map((stat) => (
                <div
                    key={stat.id}
                    className="kanbanColumn"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, stat.id)}
                >
                    <h3>{stat.nome}</h3>
                    {pedidos.filter(p => p.status.id === stat.id).map(pedido => (
                        <KanbanCard
                            key={pedido.id}
                            pedido={pedido}
                            status={status}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                    {pedidos.filter(p => p.status.id === stat.id).length === 0 && (
                        <p className="emptyMessage">Nenhum pedido nesta coluna.</p>
                    )}
                </div>
            ))}
        </div>
    );
}
