import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pedido from './pedido';

vi.mock('../../service/service', () => ({
    service: {
        listarPedidos: vi.fn(),
        deletarPedido: vi.fn(),
    }
}));

import { service } from '../../service/service';

const pedidosMock = [
    {
        id: 1,
        descricao: 'Pedido 1',
        recebido: '2023-05-01T00:00:00Z',
        prazo: '2023-05-10T00:00:00Z',
        entregue: '',
        status: null,
    },
    {
        id: 2,
        descricao: 'Pedido 2',
        recebido: '2023-05-03T00:00:00Z',
        prazo: '2023-05-15T00:00:00Z',
        entregue: '',
        status: null,
    },
];

describe('Pedido', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('exibe mensagem quando não há pedidos', async () => {
        (service.listarPedidos as any).mockResolvedValue([]);
        render(<Pedido />);
        await waitFor(() => {
            expect(screen.getByText('Não há pedidos para mostrar.')).toBeInTheDocument();
        });
    });

    it('renderiza pedidos retornados pelo serviço', async () => {
        (service.listarPedidos as any).mockResolvedValue(pedidosMock);
        render(<Pedido />);
        for (const pedido of pedidosMock) {
            await waitFor(() =>
                expect(screen.getByText(new RegExp(`● ${pedido.descricao}`))).toBeInTheDocument()
            );
        }
        expect(screen.getByText(`Total de pedidos: ${pedidosMock.length}`)).toBeInTheDocument();
    });

    it('abre modal de confirmação ao clicar no botão de excluir', async () => {
        (service.listarPedidos as any).mockResolvedValue(pedidosMock);
        render(<Pedido />);
        await waitFor(() => expect(screen.getByText(new RegExp(`● ${pedidosMock[0].descricao}`))).toBeInTheDocument());

        const botaoExcluir = screen.getAllByText('X')[0];
        await userEvent.click(botaoExcluir);

        expect(screen.getByText('Tem certeza que deseja excluir o pedido?')).toBeInTheDocument();
    });

    it('abre modal para adicionar pedido ao clicar no botão Novo pedido', async () => {
        (service.listarPedidos as any).mockResolvedValue([]);
        render(<Pedido />);
        const botaoNovo = screen.getByRole('button', { name: /novo pedido/i });
        await userEvent.click(botaoNovo);

        expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument();
    });

    it('chama o serviço de deletar e atualiza a lista após confirmar exclusão', async () => {
        (service.listarPedidos as any).mockResolvedValue(pedidosMock);
        (service.deletarPedido as any).mockResolvedValue(undefined);

        render(<Pedido />);
        await waitFor(() => expect(screen.getByText(new RegExp(`● ${pedidosMock[0].descricao}`))).toBeInTheDocument());

        const botaoExcluir = screen.getAllByText('X')[0];
        await userEvent.click(botaoExcluir);

        const botaoConfirmar = screen.getByRole('button', { name: /confirmar/i });
        fireEvent.click(botaoConfirmar);

        await waitFor(() =>
            expect(service.deletarPedido).toHaveBeenCalledWith(pedidosMock[0].id)
        );
        expect(service.listarPedidos).toHaveBeenCalledTimes(2);
    });
});
