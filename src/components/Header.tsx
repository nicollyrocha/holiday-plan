import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export const Header = ({
	setOpenModalAdd,
}: {
	setOpenModalAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<div className='flex w-full justify-between items-center p-4 bg-[#44749d] fixed z-50'>
			<div></div>
			<div className='font-bold text-2xl text-white'>Holiday Planner</div>
			<IconButton onClick={() => setOpenModalAdd(true)}>
				<AddIcon sx={{ color: 'white' }} />
			</IconButton>
		</div>
	);
};
