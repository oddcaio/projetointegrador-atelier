import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';

vi.mock('../../service/service', () => ({
    service: {
        listarStatus: vi.fn().mockResolvedValue([
            { id: 1, nome: 'Pendente' },
            { id: 2, nome: 'Em andamento' },
            { id: 3, nome: 'Concluído' },
        ]),
        listarPedidos: vi.fn().mockResolvedValue([]),
        atualizarStatusPedido: vi.fn().mockImplementation((pedidoId, newStatusId) =>
            Promise.resolve({
                id: pedidoId,
                descricao: 'Pedido mockado',
                recebido: '2025-05-01',
                prazo: '2025-05-10',
                status: { id: newStatusId, nome: 'Status mockado' },
            })
        ),
    },
}));

vi.mock('../../components/kanbanCard/kanbanCard', () => ({
    default: ({ pedido }: any) => <div>{pedido.descricao}</div>,
}));

import Kanban from './kanban';

describe('Kanban', () => {
    it('renderiza colunas e cards corretamente', async () => {
        render(<Kanban />);
        expect(await screen.findByText('Pendente')).toBeInTheDocument();
        expect(await screen.findByText('Em andamento')).toBeInTheDocument();
        expect(await screen.findByText('Concluído')).toBeInTheDocument();
        expect(screen.queryByText('Pedido mockado')).not.toBeInTheDocument();
    });
});
