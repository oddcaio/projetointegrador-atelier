import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from './notFound';

describe('NotFound Component', () => {
  it('should render the heading and image', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', { name: /página não encontrada!/i });
    const image = screen.getByRole('img');

    expect(heading).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
    expect(image).toHaveAttribute('width', '320');
  });
});
