import { expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Auth from '../pages/Auth';

describe('Login form', () => {
    it('exist', () => {
        render(<Auth />);

        const emailInput = screen.getByLabelText('');

        expect(emailInput).toBeInTheDocument();
    });
});
