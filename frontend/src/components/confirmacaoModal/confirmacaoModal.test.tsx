import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmModal from './confirmacaoModal'

describe('ConfirmModal', () => {
  it('exibe a mensagem corretamente', () => {
    render(
      <ConfirmModal
        message="Mensagem de teste"
        onConfirm={() => { }}
        onCancel={() => { }}
      />
    );
    expect(screen.getByText('Mensagem de teste')).toBeInTheDocument();
  });

  it('chama onCancel ao clicar no botão Cancelar', async () => {
    const onCancel = vi.fn();
    render(
      <ConfirmModal
        message="Mensagem de teste"
        onConfirm={() => { }}
        onCancel={onCancel}
      />
    );
    const botaoCancelar = screen.getByRole('button', { name: /cancelar/i });
    await userEvent.click(botaoCancelar);
    expect(onCancel).toHaveBeenCalled();
  });

  it('chama onConfirm ao clicar no botão Confirmar', async () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmModal
        message="Mensagem de teste"
        onConfirm={onConfirm}
        onCancel={() => { }}
      />
    );
    const botaoConfirmar = screen.getByRole('button', { name: /confirmar/i });
    await userEvent.click(botaoConfirmar);
    expect(onConfirm).toHaveBeenCalled();
  });
});
