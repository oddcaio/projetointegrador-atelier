import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Header from './header';

describe('Header', () => {
    it('renderiza o logo e título', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(screen.getByAltText(/logo/i)).toBeInTheDocument(); // Ajuste se alt text existir
        expect(screen.getByText('Atelier Opção')).toBeInTheDocument();
    });

    it('renderiza os links de navegação corretamente', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByText('INÍCIO')).toBeInTheDocument();
        expect(screen.getByText('KANBAN')).toBeInTheDocument();
        expect(screen.getByText('CONTATOS')).toBeInTheDocument();
    });

    it('aplica classe active ao clicar no link', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Header />
            </MemoryRouter>
        );

        const linkKanban = screen.getByText('KANBAN');
        await userEvent.click(linkKanban);
        expect(linkKanban).toHaveClass('active');
    });
});
