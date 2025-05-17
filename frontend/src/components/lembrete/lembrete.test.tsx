import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Lembrete from './lembrete';

vi.mock('../../service/service', () => ({
  service: {
    listarLembretes: vi.fn(),
    deletarLembrete: vi.fn(),
  }
}));

import { service } from '../../service/service';

const lembretesMock = [
  { id: 1, lembrete: 'Teste 1' },
  { id: 2, lembrete: 'Teste 2' },
];

describe('Componente Lembrete', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('exibe mensagem quando não há lembretes', async () => {
    (service.listarLembretes as any).mockResolvedValue([]);
    render(<Lembrete />);
    await waitFor(() =>
      expect(screen.getByText('Não há lembretes para mostrar.')).toBeInTheDocument()
    );
  });

  it('renderiza lembretes retornados pelo serviço', async () => {
    (service.listarLembretes as any).mockResolvedValue(lembretesMock);
    render(<Lembrete />);
    for (const lembrete of lembretesMock) {
      await waitFor(() =>
        expect(screen.getByText(`● ${lembrete.lembrete}`)).toBeInTheDocument()
      );
    }
    expect(screen.getByText('Total de lembretes: 2')).toBeInTheDocument();
  });

  it('abre modal de confirmação ao clicar no botão de excluir', async () => {
    (service.listarLembretes as any).mockResolvedValue(lembretesMock);
    render(<Lembrete />);
    await waitFor(() => expect(screen.getByText('● Teste 1')).toBeInTheDocument());

    const botaoExcluir = screen.getAllByText('X')[0];
    await userEvent.click(botaoExcluir);

    expect(screen.getByText('Tem certeza que deseja excluir o lembrete?')).toBeInTheDocument();
  });

  it('abre modal para adicionar lembrete ao clicar no botão Novo lembrete', async () => {
    (service.listarLembretes as any).mockResolvedValue([]);
    render(<Lembrete />);
    const botaoNovo = screen.getByRole('button', { name: /novo lembrete/i });
    await userEvent.click(botaoNovo);

    expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument();
  });

  it('chama o serviço de deletar e atualiza a lista após confirmar exclusão', async () => {
    (service.listarLembretes as any).mockResolvedValue(lembretesMock);
    (service.deletarLembrete as any).mockResolvedValue(undefined);

    render(<Lembrete />);
    await waitFor(() => expect(screen.getByText('● Teste 1')).toBeInTheDocument());

    const botaoExcluir = screen.getAllByText('X')[0];
    await userEvent.click(botaoExcluir);

    const botaoConfirmar = screen.getByRole('button', { name: /confirmar/i });
    fireEvent.click(botaoConfirmar);

    await waitFor(() =>
      expect(service.deletarLembrete).toHaveBeenCalledWith(lembretesMock[0].id)
    );
    expect(service.listarLembretes).toHaveBeenCalledTimes(2);
  });
});
