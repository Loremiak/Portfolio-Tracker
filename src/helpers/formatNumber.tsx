export function formatNumber(value: number) {
	let formattedValue;
	if (value >= 1000000000) {
		formattedValue =
			(value / 1000000000).toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 3 }) + ' mld USD';
	} else if (value >= 1000000000000) {
		formattedValue =
			(value / 1000000000000).toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 3 }) + ' bln USD';
	} else {
		formattedValue = value.toLocaleString('en-US') + ' USD';
	}
	// Dodajemy warunek sprawdzający, czy wartość jest bliska granicy biliona i jeśli tak, zaokrąglamy do "1 bln"
	if (value >= 999500000000 && value < 1000500000000) {
		formattedValue = '1 bln USD';
	}
	return formattedValue;
}
