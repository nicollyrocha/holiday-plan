import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

/**
 * If nothing returns from db, this card will be shown to inform the user that nothing was found.
 * */
export const NoItemsCard = () => {
	return (
		<div className=' bg-red-100/30 w-60 h-40 flex flex-col gap-3 items-center justify-center rounded-lg border border-solid border-red-500/50 fade-in'>
			<ReportGmailerrorredIcon fontSize='large' />
			<div className='font-bold'>No items found</div>
		</div>
	);
};
