/**
 * Function to format from database date type to string
 * */
export const fromDateToString = (date: Date) => {
	const dateInDate = new Date(date);
	const mm = dateInDate.getMonth() + 1; // getMonth() is zero-based
	const dd = dateInDate.getDate();

	return [
		(mm > 9 ? '' : '0') + mm + '/',
		(dd > 9 ? '' : '0') + dd + '/',
		dateInDate.getFullYear(),
	].join('');
};
