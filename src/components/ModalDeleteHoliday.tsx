import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import { Holiday } from '../models/holiday.model';
import { useContextProject } from '../controller/index';
import { HolidaysService } from '../services/holidaysService';

/**
 * Modal asking if the user is sure he wants to delete the holiday. The component uses the values passed by parameters.
 * */
export const ModalDeleteHoliday = ({
	openModal,
	setOpenModal,
	holidaySeleted,
}: {
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
	holidaySeleted: Holiday;
}) => {
	const { setIsLoading, isLoading, setSuccess, setOpenAlert, setErrorMsg } =
		useContextProject();

	const handleClose = () => {
		setOpenModal({ ...openModal, delete: false });
	};

	const deleteHoliday = () => {
		setIsLoading({ ...isLoading, modal: true });

		if (holidaySeleted.id) {
			HolidaysService.deleteHoliday(holidaySeleted.id)
				.then((res: any) => {
					if (res.status === 201) {
						setIsLoading({ ...isLoading, modal: false });
						setErrorMsg('');
						setSuccess({ msg: 'Holiday deleted successfully!' });
						setOpenAlert(true);
						setOpenModal({ ...openModal, delete: false });
						window.location.reload();
					} else if (res.status === 400) {
						setSuccess({ msg: '' });
						setErrorMsg('Error deleting holiday!');
						setOpenAlert(true);
						setIsLoading({ ...isLoading, modal: false });
					}
				})
				.catch((error: any) => {
					setSuccess({ msg: '' });
					setErrorMsg('There was an error deleting holiday!');
					setOpenAlert(true);
					setIsLoading({ ...isLoading, modal: false });
				});
		}
	};

	return (
		<Dialog open={openModal.delete} onClose={handleClose}>
			<DialogTitle>Are you sure you want to delete this holiday?</DialogTitle>
			<DialogContent></DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={() => deleteHoliday()}>
					{isLoading.modal ? <CircularProgress size={'1rem'} /> : 'Confirm'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
