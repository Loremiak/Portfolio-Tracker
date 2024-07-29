import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		});

		return () => unsubscribe();
	}, []);

	const logout = () => {
		try {
			signOut(auth);
			toast.success('Pomyślnie wylogowano!');
		} catch (error) {
			console.error('Sign out error', error);
			toast.error('Wystąpił problem z wylogowaniem');
		}
	};

	return { isAuthenticated, logout };
};

export default useAuth;
