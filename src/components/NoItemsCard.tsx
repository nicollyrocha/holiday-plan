import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

export const NoItemsCard = () => {
	return (
		<div className=' bg-red-100 w-60 h-40 flex flex-col gap-3 items-center justify-center rounded-lg border border-solid border-red-500 fade-in'>
			<ReportGmailerrorredIcon fontSize='large' />
			<div className='font-bold'>No items found</div>
		</div>
	);
};
