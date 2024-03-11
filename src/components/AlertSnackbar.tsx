import { Snackbar, Alert } from '@mui/material';

/**
 * Here is the error or success notification, depending on the status of the request. The component uses the values passed by parameters
 * */
export const AlertSnackbar = ({
	openAlert,
	setOpenAlert,
	setSuccess,
	setErrorMsg,
	errorMsg,
	success,
}: {
	openAlert: boolean;
	setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
	setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
	setSuccess: React.Dispatch<React.SetStateAction<{ msg: string }>>;
	errorMsg: string;
	success: { msg: string };
}) => {
	const onCloseAlert = () => {
		setSuccess({ msg: '' });
		setErrorMsg('');
		setOpenAlert(false);
	};

	return (
		<>
			{openAlert && (
				<Snackbar open={openAlert} autoHideDuration={6000}>
					<Alert
						onClose={() => onCloseAlert()}
						severity={errorMsg ? 'error' : success.msg ? 'success' : 'info'}
						variant='filled'
						sx={{ width: '100%' }}
					>
						{errorMsg ? errorMsg : success.msg ? success.msg : ''}
					</Alert>
				</Snackbar>
			)}
		</>
	);
};
