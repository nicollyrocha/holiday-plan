import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Holiday } from '../models/holiday.model';
import { CardHeader, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { fromDateToString } from '../functions/fromDateToString';
import MoreVertIcon from '@mui/icons-material/MoreVert';

/**
 * Cards to show holidays informations. If it is a mobile device, it will be shown
 * */
export const HolidaysCards = ({
	holidays,
	setHolidaySelected,
	openModal,
	setOpenModal,
}: {
	holidays: Holiday[];
	setHolidaySelected: React.Dispatch<React.SetStateAction<Holiday>>;
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
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);

	return (
		<div className='flex flex-col gap-3 justify-center items-center'>
			{holidays.map((holiday) => {
				return (
					<Card
						key={holiday.id}
						className='flex lg:hidden bg-neutral-700'
						sx={{ minWidth: 380, backgroundColor: '#c6d4e1' }}
					>
						<CardContent className='w-full'>
							<CardHeader
								sx={{ paddingInline: 0 }}
								action={
									<>
										<IconButton
											aria-controls={openMenu ? 'long-menu' : undefined}
											aria-expanded={openMenu ? 'true' : undefined}
											aria-label='settings'
											onClick={(e) => (
												setAnchorEl(e.currentTarget), setHolidaySelected(holiday)
											)}
										>
											<MoreVertIcon />
										</IconButton>
									</>
								}
								title={holiday.title}
								subheader={holiday.description}
							/>

							{/* <Typography variant='h5' gutterBottom>
								{holiday.title}
							</Typography>
							<Typography sx={{ fontSize: 16 }} component='div' gutterBottom>
								{holiday.description}
							</Typography>
							<Divider sx={{ marginTop: '10px', marginBottom: '10px' }} /> */}
							<Typography className='flex gap-2' sx={{ fontSize: 14 }}>
								<div className='font-bold'>Participants:</div>
								{holiday.participants ? holiday.participants.join(', ') : ''}
							</Typography>
							<Typography className='flex gap-2' sx={{ fontSize: 14 }}>
								<div className='font-bold'>Locations:</div>
								{holiday.locations.join(', ')}
							</Typography>
							<Typography className='flex gap-2' sx={{ fontSize: 14 }}>
								<div className='font-bold'>Date:</div>
								{holiday.date ? fromDateToString(holiday.date) : ''}
							</Typography>
						</CardContent>
					</Card>
				);
			})}
			<Menu
				id='long-menu'
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				open={openMenu}
				onClose={() => setAnchorEl(null)}
				anchorEl={anchorEl}
			>
				<MenuItem
					key={'edit'}
					onClick={() => setOpenModal({ ...openModal, edit: true })}
				>
					Edit
				</MenuItem>
				<MenuItem
					key={'delete'}
					onClick={() => setOpenModal({ ...openModal, delete: true })}
				>
					Delete
				</MenuItem>
			</Menu>
		</div>
	);
};
