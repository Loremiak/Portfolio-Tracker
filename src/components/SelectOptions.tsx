import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type SelectOptionsProps = {
	pageSize: string;
	handleChange: (event: SelectChangeEvent) => void;
};

const SelectOptions: React.FC<SelectOptionsProps> = ({ pageSize, handleChange }) => {
	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Ilość walut</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={pageSize}
					label='Ilość walut'
					onChange={handleChange}
					defaultValue='5'>
					<MenuItem value={5}>5</MenuItem>
					<MenuItem value={25}>25</MenuItem>
					<MenuItem value={50}>50</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default SelectOptions;
