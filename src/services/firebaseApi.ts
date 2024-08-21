import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDoc, doc, updateDoc, collection, getDocs, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { Transaction } from './types';

export function useTransactions() {
	const { userId } = useAuth();

	return useQuery<Transaction[]>({
		queryKey: ['transactions', userId],
		queryFn: async () => {
			if (!userId) {
				throw new Error('User not authenticated');
			}

			const transactionsColRef = collection(db, 'users', userId, 'transactions');
			const querySnapshot = await getDocs(transactionsColRef);
			return querySnapshot.docs.map(doc => doc.data() as Transaction);
		},
		enabled: !!userId,
	});
}

export function useAddOrUpdateTransaction() {
	const queryClient = useQueryClient();
	const { userId } = useAuth();

	return useMutation({
		mutationFn: async (transaction: { coin: string; amount: number; price: number; id?: string }) => {
			if (!userId) {
				throw new Error('User not authenticated');
			}

			const transactionDocRef = doc(db, 'users', userId, 'transactions', transaction.id || transaction.coin);

			await setDoc(
				transactionDocRef,
				{
					coin: transaction.coin,
					amount: transaction.amount,
					price: transaction.price,
				},
				{ merge: true }
			);
		},
		onSuccess: () => {
			if (!userId) {
				throw new Error('User not authenticated');
			}
			queryClient.invalidateQueries({
				queryKey: ['transactions', userId],
			});
			toast.success('Pomyślnie dodano transakcje!');
		},
		onError: error => {
			console.error('Failed to add or update transaction:', error);
		},
	});
}

export function useRemoveTransactionsByCoin() {
	const queryClient = useQueryClient();
	const { userId } = useAuth();

	return useMutation({
		mutationFn: async (coin: string) => {
			if (!userId) {
				throw new Error('User not authenticated');
			}

			const transactionDocRef = doc(db, 'users', userId, 'transactions', coin);

			await deleteDoc(transactionDocRef);
		},
		onSuccess: () => {
			if (!userId) {
				throw new Error('User not authenticated');
			}
			queryClient.invalidateQueries({
				queryKey: ['transactions', userId],
			});
			toast.success(`Pomyślnie usunięto wszystkie transakcje związane z wybraną walutą!`);
		},
		onError: error => {
			console.error('Failed to delete transactions:', error);
			toast.error(`Wystąpił problem przy usuwaniu transakcji`);
		},
	});
}

export function usePortfolioCoins() {
	const { userId } = useAuth();

	return useQuery({
		queryKey: ['portfolioCoins', userId],
		queryFn: async (): Promise<string[]> => {
			if (!userId) {
				throw new Error('User not authenticated');
			}

			const userDocRef = doc(db, 'users', userId);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				const userData = userDoc.data();
				return userData.coins || [];
			} else {
				return [];
			}
		},
		enabled: !!userId,
	});
}

export function useUpdatePortfolioCoins() {
	const { userId } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newCoins: string[]) => {
			if (!userId) {
				throw new Error('User not authenticated');
			}
			const userDocRef = doc(db, 'users', userId);

			const userDocSnapshot = await getDoc(userDocRef);

			if (!userDocSnapshot.exists()) {
				await setDoc(userDocRef, { coins: newCoins });
			} else {
				const currentCoins = userDocSnapshot.data()?.coins || [];
				const updatedCoins = Array.from(new Set([...currentCoins, ...newCoins]));
				await updateDoc(userDocRef, { coins: updatedCoins });
			}
		},
		onSuccess: () => {
			if (userId) {
				queryClient.invalidateQueries({ queryKey: ['updatePortfolioCoins', userId] });
				toast.success('Waluty dodano pomyślnie!');
			}
		},
		onError: error => {
			toast.error(`Wystąpił problem przy dodawaniu wybranych walut`);
			console.error(`Wystąpił problem przy dodawaniu walut: ${error.message}`);
		},
	});
}

export function useRemovePortfolioCoins() {
	const queryClient = useQueryClient();
	const { userId } = useAuth();

	return useMutation({
		mutationFn: async (coinsToRemove?: string[]) => {
			if (!userId) {
				throw new Error('User not authenticated');
			}

			const userDocRef = doc(db, 'users', userId);

			const userDocSnapshot = await getDoc(userDocRef);
			const currentCoins: [] = userDocSnapshot.data()?.coins || [];

			let updatedCoins: string[];

			if (coinsToRemove && coinsToRemove.length > 0) {
				updatedCoins = currentCoins.filter(coin => !coinsToRemove.includes(coin));
			} else {
				updatedCoins = [];
			}

			await updateDoc(userDocRef, { coins: updatedCoins });
		},
		onSuccess: () => {
			if (!userId) {
				throw new Error('User not authenticated');
			}
			queryClient.invalidateQueries({
				queryKey: ['portfolioCoins', userId],
			});
			toast.success('Pomyślnie usunięto wybrane waluty!');
		},
		onError: error => {
			console.error('Failed to delete portfolio coins:', error);
		},
	});
}

// async function addSampleTransactions(userId: string) {
// 	const transactionsColRef = collection(db, 'users', userId, 'transactions');

// 	// Dodaj przykładowe transakcje
// 	await addDoc(transactionsColRef, {
// 		coin: 'bitcoin',
// 		amount: 1.5,
// 		price: 30000,
// 	});

// 	await addDoc(transactionsColRef, {
// 		coin: 'ethereum',
// 		amount: 10,
// 		price: 2000,
// 	});

// 	await addDoc(transactionsColRef, {
// 		coin: 'tether',
// 		amount: 5000,
// 		price: 1,
// 	});

// 	console.log('Sample transactions added successfully');
// }

// Wywołanie funkcji z przykładowym ID użytkownika
// addSampleTransactions('tQ7OyNblOGdKT0l7H2JcWV0bfIu1');

async function getTransactions(userId: string) {
	console.log('getTransactions');

	try {
		// Ustalamy referencję do kolekcji transactions w dokumentach użytkownika
		const transactionsColRef = collection(db, 'users', userId, 'transactions');

		// Pobieramy wszystkie dokumenty z kolekcji transactions
		const querySnapshot = await getDocs(transactionsColRef);

		console.log('querySnapshot', querySnapshot);

		// Przechodzimy przez dokumenty i wyciągamy dane
		const transactions = querySnapshot.docs.map(doc => doc.data());
		console.log('Transactions:', transactions);
		return transactions;
	} catch (error) {
		console.error('Error getting transactions:', error);
	}
}

// Wywołanie funkcji z przykładowym ID użytkownika
getTransactions('2hkd4NLGIcmGM5Ddehl2');
