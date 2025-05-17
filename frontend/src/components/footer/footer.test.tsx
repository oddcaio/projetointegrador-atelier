import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer', () => {
    it('renderiza o texto com o ano atual', () => {
        render(<Footer />);
        const year = new Date().getFullYear();
        expect(
            screen.getByText(`© ${year} Atelier Opção. Todos os direitos reservados.`)
        ).toBeInTheDocument();
    });
});
