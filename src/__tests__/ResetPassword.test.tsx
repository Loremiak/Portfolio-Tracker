import { render, screen } from '@testing-library/react';
import { ResetPassword } from '../pages/ResetPassword';
import { BrowserRouter } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({})),
    sendPasswordResetEmail: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('Reset password', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render completely', () => {
        render(
            <BrowserRouter>
                <ResetPassword />
            </BrowserRouter>
        );

        const emailInput = screen.getByLabelText(/email/i);
        const submitBtn = screen.getByRole('button', { name: 'Zresetuj hasło' });
        const backLink = screen.getByText('Powrót');

        expect(emailInput).toBeInTheDocument();
        expect(submitBtn).toBeInTheDocument();
        expect(backLink).toBeInTheDocument();
    });

    it('should show error if the email does not exist', async () => {
        (sendPasswordResetEmail as jest.Mock).mockRejectedValueOnce(new Error('Wystąpił problem z wysłaniem emaila'));

        render(
            <BrowserRouter>
                <ResetPassword />
            </BrowserRouter>
        );

        const emailInput = screen.getByLabelText(/email/i);
        const submitBtn = screen.getByRole('button', { name: 'Zresetuj hasło' });

        await userEvent.type(emailInput, 'test@gmail.com');
        await userEvent.click(submitBtn);

        expect(toast.error).toHaveBeenCalledWith('Wystąpił problem z wysłaniem emaila');
    });

    it('should show success if the email was send', async () => {
        (sendPasswordResetEmail as jest.Mock).mockResolvedValueOnce('Email został wysłany!');

        render(
            <BrowserRouter>
                <ResetPassword />
            </BrowserRouter>
        );

        const emailInput = screen.getByLabelText(/email/i);
        const submitBtn = screen.getByRole('button', { name: 'Zresetuj hasło' });

        await userEvent.type(emailInput, 'test@gmail.com');
        await userEvent.click(submitBtn);

        expect(toast.success).toHaveBeenCalledWith('Email został wysłany!');
    });
});
