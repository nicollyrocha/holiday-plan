import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Holiday } from '../models/holiday.model';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { HolidaysService } from '../services/holidaysService';
import { useContextProject } from '../controller/index';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Modal with the form to create a new holiday. The component uses the values passed by parameters
 * */
export const ModalAddHoliday = ({
	openModalAdd,
	setOpenModalAdd,
	holidayInfo,
	setHolidayInfo,
}: {
	openModalAdd: boolean;
	setOpenModalAdd: React.Dispatch<React.SetStateAction<boolean>>;
	holidayInfo: Holiday;
	setHolidayInfo: React.Dispatch<React.SetStateAction<Holiday>>;
}) => {
	const handleClose = () => {
		setOpenModalAdd(false);
	};
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

	/**
	 * Here the loading is setted as true, the holiday informations that are missing are defined, if the post returns status 201
	 * the getHolidays function is called, the const holidays is reset and the loading is setted as false and the modal is closed.
	 * If status = 400, it means that another holiday was created on this date and the error message is shown
	 * */
	const createHoliday = () => {
		setIsLoading({ ...isLoading, modal: true });

		HolidaysService.createHoliday(holidayInfo)
			.then((res: any) => {
				if (res.status === 201) {
					setIsLoading({ ...isLoading, modal: false });
					setErrorMsg('');
					getHolidays();
					setSuccess({ msg: 'Holiday created successfully!' });
					setOpenAlert(true);
					setHolidayInfo({
						title: '',
						description: '',
						date: undefined,
						locations: [],
						participants: [],
					});
					setOpenModalAdd(false);
				} else if (res.status === 400) {
					setSuccess({ msg: '' });
					setIsLoading({ ...isLoading, modal: false });
					setOpenAlert(true);
					setErrorMsg('Another holiday was created on this date!');
				}
			})
			.catch((error: any) => {
				setSuccess({ msg: '' });
				setIsLoading({ ...isLoading, modal: false });
				setOpenAlert(true);
				setErrorMsg('There was an error creating the holiday');
			});
	};

	return (
		<Dialog open={openModalAdd} onClose={handleClose}>
			<DialogTitle>Add Holiday</DialogTitle>
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
						format='MM/DD/YYYY'
						sx={{ marginTop: '10px', width: '100%' }}
						label='Date'
						onChange={(value) =>
							setHolidayInfo({
								...holidayInfo,
								date: new Date(
									dayjs(value as Date)
										.hour(0)
										.minute(0)
										.second(0)
										.toString()
								),
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
					onClick={() => createHoliday()}
				>
					{isLoading.modal ? <CircularProgress size={'1rem'} /> : 'Confirm'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
