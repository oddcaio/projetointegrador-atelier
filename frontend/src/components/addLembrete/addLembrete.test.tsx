import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddLembrete from './addLembrete';

vi.mock('../../service/service', () => ({
    service: {
        novoLembrete: vi.fn(),
    }
}));

import { service } from '../../service/service';

describe('AddLembrete', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renderiza textarea e botões', () => {
        render(<AddLembrete onClose={() => { }} onAdd={() => { }} />);
        expect(screen.getByPlaceholderText(/digite seu lembrete/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument();
    });

    it('botão adicionar fica desabilitado se texto inválido', async () => {
        render(<AddLembrete onClose={() => { }} onAdd={() => { }} />);
        const btnAdicionar = screen.getByRole('button', { name: /adicionar/i });
        expect(btnAdicionar).toBeDisabled();

        const textarea = screen.getByPlaceholderText(/digite seu lembrete/i);
        await userEvent.type(textarea, '12345678901');
        expect(btnAdicionar).toBeEnabled();

        await userEvent.clear(textarea);
        await userEvent.type(textarea, '123');
        expect(btnAdicionar).toBeDisabled();
    });

    it('chama service.novoLembrete e onAdd ao enviar formulário', async () => {
        const onAdd = vi.fn();
        render(<AddLembrete onClose={() => { }} onAdd={onAdd} />);

        const textarea = screen.getByPlaceholderText(/digite seu lembrete/i);
        const btnAdicionar = screen.getByRole('button', { name: /adicionar/i });

        await userEvent.type(textarea, 'Este é um lembrete válido');
        await userEvent.click(btnAdicionar);

        await waitFor(() => {
            expect(service.novoLembrete).toHaveBeenCalledWith('Este é um lembrete válido');
            expect(onAdd).toHaveBeenCalled();
        });
    });
});
