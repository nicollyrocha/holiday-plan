import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ModalAddHoliday } from './components/ModalAddHoliday';
import { Holiday } from './models/holiday.model';

function App() {
	const [openModalAdd, setOpenModalAdd] = useState(false);
	const [holidayInfo, setHolidayInfo] = useState<Holiday>({
		description: '',
		locations: [],
		participants: [],
		title: '',
	});

	return (
		<div className='h-screen flex flex-col items-center overflow-hidden w-full'>
			<ModalAddHoliday
				holidayInfo={holidayInfo}
				setHolidayInfo={setHolidayInfo}
				openModalAdd={openModalAdd}
				setOpenModalAdd={setOpenModalAdd}
			/>
			<Header setOpenModalAdd={setOpenModalAdd} />
			<Home />
		</div>
	);
}

export default App;
