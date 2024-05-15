export function formatNumber(num) {
	const suffixes = ['', 'tys.', 'mln', 'mld', 'bln']; // Sufiksy dla kolejnych wielkości

	// Dzielenie liczby przez tysiące, aż będzie mniejsza niż tysiąc lub dojdzie do ostatniego sufiksu
	let i = 0;
	while (num >= 1000 && i < suffixes.length - 1) {
		num /= 1000;
		i++;
	}

	// Zaokrąglenie liczby do dwóch miejsc po przecinku
	num = Math.round(num * 100) / 100;

	// Zwrócenie liczby z odpowiednim sufiksem
	return num.toString() + ' ' + suffixes[i];
}
