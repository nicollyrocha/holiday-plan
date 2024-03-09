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

/**
 * Table to show holidays informations
 * */
export default function HolidaysTable({ holidays }: { holidays: Holiday[] }) {
	return (
		<TableContainer component={Paper} sx={{ maxWidth: 1500 }}>
			<Table sx={{ minWidth: 700 }} aria-label='customized table'>
				<TableHead sx={{ backgroundColor: '#1C1C1C' }}>
					<TableRow>
						<TableCell sx={{ color: 'white' }} align='center'>
							Title
						</TableCell>
						<TableCell sx={{ color: 'white' }} align='center'>
							Description
						</TableCell>
						<TableCell sx={{ color: 'white' }} align='center'>
							Date
						</TableCell>
						<TableCell sx={{ color: 'white' }} align='center'>
							Locations
						</TableCell>
						<TableCell sx={{ color: 'white' }} align='center'>
							Participants
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{holidays.map((row) => {
						console.log(fromDateToString(row.date ? row.date : new Date()));
						return (
							<TableRow key={row.title}>
								<TableCell component='th' scope='row'>
									{row.title}
								</TableCell>
								<TableCell align='center'>{row.description}</TableCell>
								<TableCell align='center'>
									{row.date ? fromDateToString(row.date) : ''}
								</TableCell>
								<TableCell align='center'>{row.locations.join(',')}</TableCell>
								<TableCell align='center'>
									{row.participants && row.participants.join(',')}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
