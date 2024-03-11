import HolidaysTable from '../components/HolidaysTable';
import { NoItemsCard } from '../components/NoItemsCard';
import CircularProgress from '@mui/material/CircularProgress';
import { useContextProject } from '../controller/index';
import { ModalEditHoliday } from '../components/ModalEditHoliday';
import { useState } from 'react';
import { Holiday } from '../models/holiday.model';
import { HolidaysCards } from '../components/HolidaysCards';
import { ModalDeleteHoliday } from '../components/ModalDeleteHoliday';
import { AlertSnackbar } from '../components/AlertSnackbar';

export const Home = () => {
	const {
		holidays,
		isLoading,
		openAlert,
		setOpenAlert,
		success,
		setSuccess,
		errorMsg,
		setErrorMsg,
	} = useContextProject();
	const [openModal, setOpenModal] = useState({ edit: false, delete: false });
	const [holidaySeleted, setHolidaySelected] = useState<Holiday>({
		title: '',
		description: '',
		locations: [],
		participants: [],
	});

	if (isLoading.getHolidays)
		return (
			<div className='h-full flex items-center'>
				<CircularProgress />
			</div>
		);

	/**
	 * Sorting holidays by date from latest to oldest
	 * */
	const holidaysSorted = holidays.sort((a, b) => {
		if (b.date && a.date && b.date > a.date) return -1;
		return 1;
	});

	return (
		<div
			className={`flex flex-col items-center w-full my-24 pb-10 h-full px-5 md:px-0 ${
				holidays && holidays.length > 0 ? '' : 'justify-center'
			}`}
		>
			<AlertSnackbar
				errorMsg={errorMsg}
				setSuccess={setSuccess}
				setOpenAlert={setOpenAlert}
				success={success}
				openAlert={openAlert}
				setErrorMsg={setErrorMsg}
			/>
			<ModalEditHoliday
				openModal={openModal}
				setOpenModal={setOpenModal}
				holidaySeleted={holidaySeleted}
			/>
			<ModalDeleteHoliday
				openModal={openModal}
				setOpenModal={setOpenModal}
				holidaySeleted={holidaySeleted}
			/>
			{holidaysSorted && holidaysSorted.length > 0 ? (
				<>
					<HolidaysTable
						holidays={holidaysSorted}
						setHolidaySelected={setHolidaySelected}
						openModal={openModal}
						setOpenModal={setOpenModal}
					/>
					<HolidaysCards
						holidays={holidaysSorted}
						setHolidaySelected={setHolidaySelected}
						openModal={openModal}
						setOpenModal={setOpenModal}
					/>
				</>
			) : (
				<NoItemsCard />
			)}
		</div>
	);
};
