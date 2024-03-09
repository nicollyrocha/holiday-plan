import { useEffect, useState } from 'react';
import { Holiday } from '../models/holiday.model';
import { HolidaysService } from '../services/holidaysService';

export const Context = () => {
	const [holidays, setHolidays] = useState<Holiday[]>([]);
	const [isLoading, setIsLoading] = useState({
		getHolidays: false,
		modal: false,
	});

	const getHolidays = async () => {
		setIsLoading({ ...isLoading, getHolidays: true });
		HolidaysService.getHolidays()
			.then((res) => {
				console.log(res);
				if (res.status === 201) {
					setHolidays(res.holidays);
				}
				setTimeout(() => {
					setIsLoading({ ...isLoading, getHolidays: false });
				}, 2000);
			})
			.catch((error) => {
				setTimeout(() => {
					setIsLoading({ ...isLoading, getHolidays: false });
				}, 2000);
			});
	};

	useEffect(() => {
		getHolidays();
	}, []);

	return {
		isLoading,
		setIsLoading,
		holidays,
		setHolidays,
		getHolidays,
	};
};
