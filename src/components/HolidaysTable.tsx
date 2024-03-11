import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Holiday } from '../models/holiday.model';
import { fromDateToString } from '../functions/fromDateToString';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { PdfHoliday } from './PdfHoliday';

/**
 * Table to show holidays informations. If it is a desktop device, it will be shown. The component uses the values passed by parameters.
 * */
export default function HolidaysTable({
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
}) {
	return (
		<TableContainer
			className='hidden lg:flex'
			component={Paper}
			sx={{ maxWidth: 1500 }}
		>
			<Table sx={{ minWidth: 700 }} aria-label='customized table'>
				<TableHead sx={{ backgroundColor: '#c6d4e1' }}>
					<TableRow>
						<TableCell sx={{ color: 'black', fontWeight: 'bold' }} align='center'>
							Title
						</TableCell>
						<TableCell sx={{ color: 'black', fontWeight: 'bold' }} align='center'>
							Description
						</TableCell>
						<TableCell sx={{ color: 'black', fontWeight: 'bold' }} align='center'>
							Date
						</TableCell>
						<TableCell sx={{ color: 'black', fontWeight: 'bold' }} align='center'>
							Locations
						</TableCell>
						<TableCell sx={{ color: 'black', fontWeight: 'bold' }} align='center'>
							Participants
						</TableCell>
						<TableCell
							sx={{ color: 'black', fontWeight: 'bold' }}
							align='center'
						></TableCell>
						<TableCell
							sx={{ color: 'black', fontWeight: 'bold' }}
							align='center'
						></TableCell>
						<TableCell
							sx={{ color: 'black', fontWeight: 'bold' }}
							align='center'
						></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{holidays.map((holiday) => {
						return (
							<TableRow key={holiday.title}>
								<TableCell align='center' component='th' scope='holiday'>
									{holiday.title}
								</TableCell>
								<TableCell align='center'>{holiday.description}</TableCell>
								<TableCell align='center'>
									{holiday.date ? fromDateToString(holiday.date) : ''}
								</TableCell>
								<TableCell align='center'>
									<Tooltip title={holiday.locations.join(', ')}>
										<div>
											{holiday.locations.join(', ').length > 30
												? holiday.locations.join(', ').substring(0, 30) + '...'
												: holiday.locations.join(', ')}
										</div>
									</Tooltip>
								</TableCell>
								<TableCell align='center'>
									<Tooltip
										title={holiday.participants ? holiday.participants.join(', ') : ''}
									>
										<div>
											{holiday.participants
												? holiday.participants.join(', ').length > 30
													? holiday.participants.join(', ').substring(0, 30) + '...'
													: holiday.participants.join(', ')
												: ''}
										</div>
									</Tooltip>
								</TableCell>
								<TableCell align='center'>
									<IconButton>
										<PDFDownloadLink
											document={<PdfHoliday row={holiday} />}
											fileName={holiday.title}
										>
											<DownloadIcon sx={{ color: '#44749d' }} />
										</PDFDownloadLink>
									</IconButton>
								</TableCell>
								<TableCell align='center'>
									<IconButton
										onClick={() => (
											setHolidaySelected(holiday),
											setOpenModal({ ...openModal, edit: true })
										)}
									>
										<EditIcon sx={{ color: '#44749d' }} />
									</IconButton>
								</TableCell>
								<TableCell align='center'>
									<IconButton
										onClick={() => (
											setHolidaySelected(holiday),
											setOpenModal({ ...openModal, delete: true })
										)}
									>
										<DeleteIcon sx={{ color: '#44749d' }} />
									</IconButton>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
