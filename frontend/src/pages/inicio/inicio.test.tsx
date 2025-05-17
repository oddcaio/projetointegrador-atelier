import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect} from 'vitest';

vi.mock('../../components/lembrete/lembrete', () => ({
  default: () => <div>Lembretes</div>,
}));
vi.mock('../../components/pedido/pedido', () => ({
  default: () => <div>Pedidos</div>,
}));

import Inicio from './inicio';

describe('Inicio', () => {
  it('renderiza os componentes Lembrete e Pedido', () => {
    render(<Inicio />);
    expect(screen.getByText(/lembretes/i)).toBeInTheDocument();
    expect(screen.getByText(/pedidos/i)).toBeInTheDocument();
  });
});
