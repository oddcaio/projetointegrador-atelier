import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddPedido from './addPedido';

vi.mock('../../service/service', () => ({
    service: {
        listarStatus: vi.fn(),
        novoPedido: vi.fn(),
    }
}));

import { service } from '../../service/service';

const statusMock = [
    { id: 1, nome: 'Pendente' },
    { id: 2, nome: 'Em andamento' },
];

describe('AddPedido', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renderiza campos do formulário e status carregado', async () => {
        (service.listarStatus as any).mockResolvedValue(statusMock);
        render(<AddPedido onClose={() => { }} onAdd={() => { }} />);

        await waitFor(() => {
            expect(screen.getByRole('combobox')).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Pendente' })).toBeInTheDocument();
        });

        expect(screen.getByPlaceholderText(/descrição do pedido/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/data de recebimento/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/prazo de entrega/i)).toBeInTheDocument();
    });

    it('botão adicionar fica desabilitado se campos inválidos', async () => {
        (service.listarStatus as any).mockResolvedValue(statusMock);
        render(<AddPedido onClose={() => { }} onAdd={() => { }} />);

        await waitFor(() => {
            const btn = screen.getByRole('button', { name: /adicionar/i });
            expect(btn).toBeDisabled();
        });
    });

    it('chama novoPedido e onAdd quando formulário é submetido corretamente', async () => {
        (service.listarStatus as any).mockResolvedValue(statusMock);
        const onAdd = vi.fn();
        render(<AddPedido onClose={() => { }} onAdd={onAdd} />);

        await waitFor(() => screen.getByRole('combobox'));

        const descricaoInput = screen.getByPlaceholderText(/descrição do pedido/i);
        const recebidoInput = screen.getByLabelText(/data de recebimento/i);
        const prazoInput = screen.getByLabelText(/prazo de entrega/i);
        const selectStatus = screen.getByRole('combobox');
        const submitBtn = screen.getByRole('button', { name: /adicionar/i });

        await userEvent.type(descricaoInput, 'Descrição válida maior que 10');
        await userEvent.type(recebidoInput, '2023-05-01');
        await userEvent.type(prazoInput, '2023-05-10');
        await userEvent.selectOptions(selectStatus, statusMock[1].id.toString());

        expect(submitBtn).toBeEnabled();

        await userEvent.click(submitBtn);

        await waitFor(() => {
            expect(service.novoPedido).toHaveBeenCalledWith({
                descricao: 'Descrição válida maior que 10',
                recebido: '2023-05-01',
                prazo: '2023-05-10',
                entregue: null,
                status: statusMock[1],
            });
            expect(onAdd).toHaveBeenCalled();
        });
    });
});
