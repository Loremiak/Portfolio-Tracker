import { DocumentData } from 'firebase/firestore';

export const calculateTotalSpent = (transactions: DocumentData[]) =>
	transactions.reduce((total, transaction) => total + transaction.amount * transaction.price, 0);
