import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	updatePassword,
} from 'firebase/auth';
import { auth } from './firebase';

export const useCreateUserWithEmailAndPassword = async (email: string, password: string) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export const useSignInWithEmailAndPassword = async (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const useSignOut = () => {
	return auth.signOut();
};

export const usePasswordReset = (email: string) => {
	return sendPasswordResetEmail(auth, email);
};

export const usePasswordChange = (email: string) => {
	if (auth.currentUser) {
		return updatePassword(auth.currentUser, email);
	}
};

export const useSendEmailVerification = () => {
	if (auth.currentUser) {
		return sendEmailVerification(auth.currentUser, {
			url: `${window.location.origin}/home`,
		});
	}
};
