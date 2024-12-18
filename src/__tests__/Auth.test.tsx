import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Auth from '../pages/Auth';
import { BrowserRouter } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({})),
    onAuthStateChanged: jest.fn((_, callback) => {
        callback(null);
        return jest.fn();
    }),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('Login form', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render completely', () => {
        render(<LoginSubject />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/hasło/i);
        const submitBtn = screen.getByRole('button', { name: 'Zaloguj się' });
        const registerLink = screen.getByText('Nie masz konta? Kliknij aby się zarejestrować');
        const passwordReminderLink = screen.getByText('Zapomniałeś hasła?');
        const backToMainViewLink = screen.getByText('Powrót do strony głównej');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitBtn).toBeInTheDocument();
        expect(registerLink).toBeInTheDocument();
        expect(passwordReminderLink).toBeInTheDocument();
        expect(backToMainViewLink).toBeInTheDocument();
    });

    it('should update inputs values', async () => {
        render(<LoginSubject />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/hasło/i);

        await userEvent.type(emailInput, 'test@gmail.com');
        await userEvent.type(passwordInput, '123456');

        expect(emailInput).toHaveDisplayValue('test@gmail.com');
        expect(passwordInput).toHaveDisplayValue('123456');
    });

    it('should show notification when user passes wrong data', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));

        render(<LoginSubject />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/hasło/i);
        const submitBtn = screen.getByRole('button', { name: 'Zaloguj się' });

        await userEvent.type(emailInput, 'a');
        await userEvent.type(passwordInput, 'a');
        await userEvent.click(submitBtn);

        expect(toast.error).toHaveBeenCalledWith('Wystąpił problem z logowaniem');
    });

    it('should log and navigates to the home page', async () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({ user: {} });

        render(<LoginSubject />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/hasło/i);
        const submitBtn = screen.getByRole('button', { name: 'Zaloguj się' });

        await userEvent.type(emailInput, 'due03254@kisoq.com');
        await userEvent.type(passwordInput, '123456');
        await userEvent.click(submitBtn);

        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'due03254@kisoq.com', '123456');
        expect(toast.success).toHaveBeenCalledWith('Pomyślnie zalogowano!');
        expect(navigate).toHaveBeenCalledWith('/');
    });
});

describe('Register form', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render completely', () => {
        render(<RegisterSubject />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByTestId('password-input');
        const repeatPasswordInput = screen.getByTestId('confirm-password-input');
        const submitBtn = screen.getByRole('button', { name: 'Zarejestruj się' });
        const loginLink = screen.getByText('Masz już konto? Kliknij aby się zalogować');
        const backToMainViewLink = screen.getByText('Powrót do strony głównej');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(repeatPasswordInput).toBeInTheDocument();
        expect(submitBtn).toBeInTheDocument();
        expect(loginLink).toBeInTheDocument();
        expect(backToMainViewLink).toBeInTheDocument();
    });

    it('should update inputs values', async () => {
        render(<RegisterSubject />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getAllByLabelText(/hasło/i)[0];
        const repeatPasswordInput = screen.getAllByLabelText(/hasło/i)[1];

        await userEvent.type(emailInput, 'test@gmail.com');
        await userEvent.type(passwordInput, '123456');
        await userEvent.type(repeatPasswordInput, '123456');

        expect(emailInput).toHaveDisplayValue('test@gmail.com');
        expect(passwordInput).toHaveDisplayValue('123456');
        expect(repeatPasswordInput).toHaveDisplayValue('123456');
    });

    it('should show notification when user passes wrong data', async () => {
        (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));

        render(<RegisterSubject />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getAllByLabelText(/hasło/i)[0];
        const repeatPasswordInput = screen.getAllByLabelText(/hasło/i)[1];
        const submitBtn = screen.getByRole('button', { name: 'Zarejestruj się' });

        await userEvent.type(emailInput, 'a');
        await userEvent.type(passwordInput, 'a');
        await userEvent.type(repeatPasswordInput, 'a');
        await userEvent.click(submitBtn);

        expect(toast.error).toHaveBeenCalledWith('Wystąpił problem z rejestracją');
    });

    it('should register and navigates to the home page', async () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({ user: {} });

        render(<RegisterSubject />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getAllByLabelText(/hasło/i)[0];
        const repeatPasswordInput = screen.getAllByLabelText(/hasło/i)[1];
        const submitBtn = screen.getByRole('button', { name: 'Zarejestruj się' });

        await userEvent.type(emailInput, 'due03254@kisoq.com');
        await userEvent.type(passwordInput, '123456');
        await userEvent.type(repeatPasswordInput, '123456');
        await userEvent.click(submitBtn);

        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'due03254@kisoq.com', '123456');
        expect(toast.success).toHaveBeenCalledWith('Pomyślnie zarejestrowano!');
        expect(navigate).toHaveBeenCalledWith('/');
    });

    it('should show error if the email is already taken', async () => {
        (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Wystąpił problem z rejestracją'));

        render(<RegisterSubject />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getAllByLabelText(/hasło/i)[0];
        const repeatPasswordInput = screen.getAllByLabelText(/hasło/i)[1];
        const submitBtn = screen.getByRole('button', { name: 'Zarejestruj się' });

        await userEvent.type(emailInput, 'takenemail@gmail.com');
        await userEvent.type(passwordInput, '123456');
        await userEvent.type(repeatPasswordInput, '123456');
        await userEvent.click(submitBtn);

        expect(toast.error).toHaveBeenCalledWith('Wystąpił problem z rejestracją');
    });
});

const LoginSubject = () => {
    return (
        <BrowserRouter>
            <Auth isLoginForm />
        </BrowserRouter>
    );
};

const RegisterSubject = () => {
    return (
        <BrowserRouter>
            <Auth />
        </BrowserRouter>
    );
};
