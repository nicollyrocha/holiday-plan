import { Holiday } from '../models/holiday.model';
import { api } from './api';

/**
 * Function to get all holidays registered
 * */
const getHolidays = async () => {
	try {
		const { data } = await api.get(`/`);
		return data;
	} catch (error: any) {
		return error.response.data;
	}
};

/**
 * Function to create a holiday
 * */
const createHoliday = async (holidayInfo: Holiday) => {
	console.log('a', holidayInfo);
	try {
		const { data } = await api.post('/holiday', holidayInfo);
		console.log(data);
		return data;
	} catch (error: any) {
		return error.response.data;
	}
};

export const HolidaysService = {
	getHolidays,
	createHoliday,
};
