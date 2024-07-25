import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

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
		signOut(auth).catch(error => {
			console.error('Sign out error', error);
		});
	};

	return { isAuthenticated, logout };
};

export default useAuth;
