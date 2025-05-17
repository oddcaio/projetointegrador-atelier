import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import KanbanCard from './kanbanCard';

const statusMock = [
  { id: 1, nome: 'Pendente' },
  { id: 2, nome: 'Em andamento' },
  { id: 3, nome: 'Concluído' },
];

const pedidoMock = {
  id: 10,
  descricao: 'Pedido Teste',
  recebido: '2023-05-01T00:00:00Z',
  prazo: '2023-05-15T00:00:00Z',
  status: { id: 2, nome: 'Em andamento' },
};

describe('KanbanCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza informações do pedido corretamente', () => {
    render(<KanbanCard pedido={pedidoMock} status={statusMock} onStatusChange={() => {}} />);
    expect(screen.getByText(pedidoMock.descricao)).toBeInTheDocument();
  });

  it('dispara evento dragstart com pedidoId correto', () => {
    render(<KanbanCard pedido={pedidoMock} status={statusMock} onStatusChange={() => {}} />);
    const card = screen.getByText(pedidoMock.descricao).parentElement as HTMLElement;

    const mockDataTransfer = {
      setData: vi.fn(),
      getData: vi.fn(),
    };

    const dragStartEvent = new Event('dragstart', { bubbles: true, cancelable: true });
    Object.defineProperty(dragStartEvent, 'dataTransfer', {
      value: mockDataTransfer,
    });

    card.dispatchEvent(dragStartEvent);

    expect(mockDataTransfer.setData).toHaveBeenCalledWith('pedidoId', pedidoMock.id.toString());
  });
});
