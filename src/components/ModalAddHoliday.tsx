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
import { Context } from '../controller';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

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
	const [locations, setLocations] = useState<string[]>([]);
	const [location, setLocation] = useState('');
	const [participants, setParticipants] = useState<string[]>([]);
	const [participant, setParticipant] = useState('');
	const { setIsLoading, getHolidays, isLoading } = Context();
	const [errorMsg, setErrorMsg] = useState('');
	const [error, setError] = useState(false);

	/**
	 * Here the loading is setted as true, the holiday informations that are missing are defined, if the post returns status 201
	 * the getHolidays function is called, the const holidays is reset and the loading is setted as false and the modal is closed.
	 * If status = 401, it means that another holiday was created on this date and the error message is shown
	 * */
	const createHoliday = () => {
		setIsLoading({ ...isLoading, modal: true });
		setHolidayInfo({
			...holidayInfo,
			participants: participants,
			locations: locations,
		});

		HolidaysService.createHoliday(holidayInfo)
			.then((res: any) => {
				if (res.body.status === 201) {
					getHolidays();
					setIsLoading({ ...isLoading, modal: false });
					setOpenModalAdd(false);
				} else if (res.body.status === 401) {
					setIsLoading({ ...isLoading, modal: false });
					setError(true);
					setErrorMsg('Another holiday was created on this date!');
				}
			})
			.catch((error: any) => {
				setIsLoading({ ...isLoading, modal: false });
				console.log('erro', error);
			});
	};

	const onChangeLocation = () => {};

	return (
		<Dialog open={openModalAdd} onClose={handleClose}>
			<Snackbar
				open={error}
				autoHideDuration={6000}
				onClose={() => setError(false)}
			>
				<Alert
					onClose={() => setError(false)}
					severity='error'
					variant='filled'
					sx={{ width: '100%' }}
				>
					{errorMsg}
				</Alert>
			</Snackbar>
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
				<div className={`flex flex-col ${locations.length > 0 && 'gap-3'}`}>
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
							onClick={() => (setLocations([...locations, location]), setLocation(''))}
						>
							<Add />
						</IconButton>
					</div>
					<div>
						{locations.map((location) => {
							return (
								<div className='flex items-center gap-2'>
									<div>{location}</div>
									<div>
										<ClearIcon
											onFocus={onChangeLocation}
											onClick={() => (
												setLocations(locations.filter((loc) => loc !== location)),
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
								setParticipants([...participants, participant]), setParticipant('')
							)}
						>
							<Add />
						</IconButton>
					</div>
					<div>
						{participants.map((participant) => {
							return (
								<div className='flex items-center gap-2'>
									<div>{participant}</div>
									<div>
										<ClearIcon
											onClick={() => (
												setParticipants(
													participants.filter((part) => part !== participant)
												),
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
								date: new Date(dayjs(value as Date).toString()),
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
						locations.length === 0
					}
					onClick={() => createHoliday()}
				>
					{isLoading.modal ? <CircularProgress size={'1rem'} /> : 'Confirm'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
