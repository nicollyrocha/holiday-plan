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
	try {
		const { data } = await api.post('/holiday', holidayInfo);
		return data;
	} catch (error: any) {
		return error.response.data;
	}
};

/**
 * Function to update a holiday
 * */
const updateHoliday = async (holidayInfo: Holiday) => {
	try {
		const { data } = await api.put('/holiday', holidayInfo);
		return data;
	} catch (error: any) {
		return error.response.data;
	}
};

const deleteHoliday = async (id: number) => {
	try {
		const { data } = await api.delete(`/holiday/${id}`);
		return data;
	} catch (error: any) {
		return error.response.data;
	}
};

export const HolidaysService = {
	getHolidays,
	createHoliday,
	updateHoliday,
	deleteHoliday,
};
