import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Holiday } from '../models/holiday.model';
import { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { HolidaysService } from '../services/holidaysService';
import { useContextProject } from '../controller/index';
import CircularProgress from '@mui/material/CircularProgress';

export const ModalEditHoliday = ({
	openModal,
	setOpenModal,
	holidaySeleted,
}: {
	openModal: {
		edit: boolean;
		delete: boolean;
	};
	setOpenModal: React.Dispatch<
		React.SetStateAction<{
			edit: boolean;
			delete: boolean;
		}>
	>;
	holidaySeleted: Holiday;
}) => {
	const handleClose = () => {
		setOpenModal({ ...openModal, edit: false });
	};
	const [holidayInfo, setHolidayInfo] = useState<Holiday>(holidaySeleted);
	const [location, setLocation] = useState('');
	const [participant, setParticipant] = useState('');
	const {
		setIsLoading,
		isLoading,
		setSuccess,
		setOpenAlert,
		setErrorMsg,
		getHolidays,
	} = useContextProject();

	useEffect(() => {
		setHolidayInfo(holidaySeleted);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [openModal.edit]);

	/**
	 * Here the loading is setted as true, the holiday informations that are missing are defined, if the post returns status 201
	 * the getHolidays function is called, the loading is setted as false and the modal is closed.
	 * If status = 400, it means that another holiday was created on this date and the error message is shown
	 * */
	const editHoliday = () => {
		setIsLoading({ ...isLoading, modal: true });

		HolidaysService.updateHoliday(holidayInfo)
			.then((res: any) => {
				if (res.status === 201) {
					setIsLoading({ ...isLoading, modal: false });
					setErrorMsg('');
					getHolidays();
					setOpenAlert(true);
					setSuccess({ msg: 'Holiday updated successfully!' });
					setOpenModal({ ...openModal, edit: false });
				} else if (res.status === 400) {
					setOpenAlert(true);
					setSuccess({ msg: '' });
					setIsLoading({ ...isLoading, modal: false });
					setErrorMsg('Another holiday was created on this date!');
				}
			})
			.catch((error: any) => {
				setSuccess({ msg: '' });
				setIsLoading({ ...isLoading, modal: false });
				setOpenAlert(true);
				setErrorMsg('There was an error updating the holiday');
			});
	};

	return (
		<Dialog open={openModal.edit} onClose={handleClose}>
			<DialogTitle>Edit Holiday</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					required
					margin='dense'
					id='title'
					name='title'
					label='Title'
					fullWidth
					variant='outlined'
					value={holidayInfo.title}
					onChange={(e) => setHolidayInfo({ ...holidayInfo, title: e.target.value })}
				/>
				<TextField
					required
					margin='dense'
					id='description'
					name='description'
					label='Description'
					fullWidth
					variant='outlined'
					value={holidayInfo.description}
					onChange={(e) =>
						setHolidayInfo({ ...holidayInfo, description: e.target.value })
					}
				/>
				<div
					className={`flex flex-col ${
						holidayInfo.locations && holidayInfo.locations.length > 0 && 'gap-3'
					}`}
				>
					<div className='flex flex-row items-center justify-center'>
						<TextField
							required
							margin='dense'
							id='location'
							name='location'
							label='Location'
							fullWidth
							variant='outlined'
							onChange={(e) => setLocation(e.target.value)}
							value={location}
						/>
						<IconButton
							onClick={() => (
								setHolidayInfo({
									...holidayInfo,
									locations: holidayInfo.locations.concat(location),
								}),
								setLocation('')
							)}
						>
							<Add />
						</IconButton>
					</div>
					<div>
						{holidayInfo.locations &&
							holidayInfo.locations.map((location) => {
								return (
									<div className='flex items-center gap-2'>
										<div>{location}</div>
										<div>
											<ClearIcon
												onClick={() => (
													setHolidayInfo({
														...holidayInfo,
														locations: holidayInfo.locations.filter(
															(loc) => loc !== location
														),
													}),
													setLocation('')
												)}
												sx={{ fontSize: '14px' }}
												className='cursor-pointer text-red-400 hover:text-red-700'
											/>
										</div>
									</div>
								);
							})}
					</div>
					<div className='flex flex-row items-center justify-center'>
						<TextField
							margin='dense'
							id='paticipant'
							name='paticipant'
							label='Paticipant'
							fullWidth
							variant='outlined'
							onChange={(e) => setParticipant(e.target.value)}
							value={participant}
						/>
						<IconButton
							onClick={() => (
								setHolidayInfo({
									...holidayInfo,
									participants: holidayInfo.participants.concat(participant),
								}),
								setParticipant('')
							)}
						>
							<Add />
						</IconButton>
					</div>
					<div>
						{holidayInfo.participants &&
							holidayInfo.participants.map((participant) => {
								return (
									<div className='flex items-center gap-2'>
										<div>{participant}</div>
										<div>
											<ClearIcon
												onClick={() => (
													setHolidayInfo({
														...holidayInfo,
														participants: holidayInfo.participants.filter(
															(part) => part !== participant
														),
													}),
													setLocation('')
												)}
												sx={{ fontSize: '14px' }}
												className='cursor-pointer text-red-400 hover:text-red-700'
											/>
										</div>
									</div>
								);
							})}
					</div>
				</div>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						value={dayjs(holidayInfo.date)}
						format='MM/DD/YYYY'
						sx={{ marginTop: '10px', width: '100%' }}
						label='Date'
						onChange={(value) =>
							setHolidayInfo({
								...holidayInfo,
								date: new Date(dayjs(value).toString()),
							})
						}
					/>
				</LocalizationProvider>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button
					disabled={
						!holidayInfo.title ||
						!holidayInfo.date ||
						!holidayInfo.description ||
						holidayInfo.locations.length === 0
					}
					onClick={() => editHoliday()}
				>
					{isLoading.modal ? <CircularProgress size={'1rem'} /> : 'Confirm'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
