const Button = () => {
	return (
		<Button
			sx={{ marginBottom: '1rem' }}
			variant='outlined'
			onClick={() => {
				console.log('click');
				dispatch(setSelectedCoins(coins));
			}}>
			Dodaj wybrane waluty do portfolio ({coins.length})
		</Button>
	);
};
