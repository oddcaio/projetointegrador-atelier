import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Contatos from './contatos';

vi.mock('../../service/service', () => ({
  service: {
    listarContatos: vi.fn(),
  }
}));

import { service } from '../../service/service';

const contatosMock = [
  { id: 1, nome: 'Maria', telefone: '5511999999999', tipo: 'costureira' },
  { id: 2, nome: 'João', telefone: '5511888888888', tipo: 'fornecedor' },
];

describe('Contatos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('exibe mensagem quando não há costureiras e fornecedores', async () => {
    (service.listarContatos as any).mockResolvedValue([]);
    render(<Contatos />);
    await waitFor(() => {
      expect(screen.getByText('Nenhuma costureira cadastrada.')).toBeInTheDocument();
      expect(screen.getByText('Nenhum fornecedor cadastrado.')).toBeInTheDocument();
    });
  });

  it('renderiza costureiras e fornecedores corretamente', async () => {
    (service.listarContatos as any).mockResolvedValue(contatosMock);
    render(<Contatos />);
    await waitFor(() => {
      expect(screen.getByText('Maria')).toBeInTheDocument();
      expect(screen.getByText('João')).toBeInTheDocument();

      const links = screen.getAllByRole('link');
      expect(links.some(link => link.getAttribute('href') === 'https://wa.me/5511999999999')).toBe(true);
      expect(links.some(link => link.getAttribute('href') === 'https://wa.me/5511888888888')).toBe(true);
    });
  });
});
