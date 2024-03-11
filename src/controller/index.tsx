import { createContext, useContext, useEffect, useState } from 'react';
import { Holiday } from '../models/holiday.model';
import { HolidaysService } from '../services/holidaysService';

interface Props {
	children: React.ReactNode;
}

/**
 * I'm using a controller to not have to pass states through all the components. It starts with a _ because it's private
 * */
export const _useController = () => {
	const [holidays, setHolidays] = useState<Holiday[]>([]);
	const [isLoading, setIsLoading] = useState({
		getHolidays: false,
		modal: false,
	});
	const [errorMsg, setErrorMsg] = useState('');
	const [openAlert, setOpenAlert] = useState(false);
	const [success, setSuccess] = useState({ msg: '' });

	const getHolidays = () => {
		setIsLoading({ ...isLoading, getHolidays: true });
		HolidaysService.getHolidays()
			.then((res) => {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		isLoading,
		setIsLoading,
		holidays,
		setHolidays,
		getHolidays,
		errorMsg,
		setErrorMsg,
		openAlert,
		setOpenAlert,
		success,
		setSuccess,
	};
};

const _Controller = createContext({} as ReturnType<typeof _useController>);

export const useContextProject = () => useContext(_Controller);

export const ContextProvider: React.FC<Props> = ({ children }) => {
	const controller = _useController();
	return (
		<_Controller.Provider value={controller}>{children}</_Controller.Provider>
	);
};
