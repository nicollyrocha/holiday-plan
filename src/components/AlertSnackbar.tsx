import { Snackbar, Alert } from '@mui/material';

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
	return (
		<Snackbar
			open={openAlert}
			autoHideDuration={6000}
			onClose={() => (
				setOpenAlert(false), setSuccess({ msg: '' }), setErrorMsg('')
			)}
		>
			<Alert
				onClose={() => (
					setOpenAlert(false), setSuccess({ msg: '' }), setErrorMsg('')
				)}
				severity={errorMsg ? 'error' : 'success'}
				variant='filled'
				sx={{ width: '100%' }}
			>
				{errorMsg ? errorMsg : success.msg}
			</Alert>
		</Snackbar>
	);
};
