import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export const Header = ({
	setOpenModalAdd,
}: {
	setOpenModalAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<div className='flex w-full justify-between items-center p-4 bg-neutral-300'>
			<div></div>
			<div className='font-bold text-2xl'>Holiday Planner</div>
			<IconButton onClick={() => setOpenModalAdd(true)}>
				<AddIcon />
			</IconButton>
		</div>
	);
};
