import HolidaysTable from '../components/HolidaysTable';
import { NoItemsCard } from '../components/NoItemsCard';
import CircularProgress from '@mui/material/CircularProgress';
import { Context } from '../controller';

export const Home = () => {
	const { holidays, isLoading } = Context();

	if (isLoading.getHolidays)
		return (
			<div className='h-full flex items-center'>
				<CircularProgress />
			</div>
		);
	console.log(holidays);
	return (
		<div className='flex flex-col items-center justify-center w-full h-full'>
			{holidays && holidays.length > 0 ? (
				<HolidaysTable holidays={holidays} />
			) : (
				<NoItemsCard />
			)}
		</div>
	);
};
