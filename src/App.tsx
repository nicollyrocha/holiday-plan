import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ModalAddHoliday } from './components/ModalAddHoliday';
import { Holiday } from './models/holiday.model';
import { ContextProvider } from './controller';

function App() {
	const [openModalAdd, setOpenModalAdd] = useState(false);
	const [holidayInfo, setHolidayInfo] = useState<Holiday>({
		description: '',
		locations: [],
		participants: [],
		title: '',
	});

	return (
		<ContextProvider>
			<div className='flex flex-col items-center w-full h-screen'>
				<ModalAddHoliday
					holidayInfo={holidayInfo}
					setHolidayInfo={setHolidayInfo}
					openModalAdd={openModalAdd}
					setOpenModalAdd={setOpenModalAdd}
				/>
				<Header setOpenModalAdd={setOpenModalAdd} />
				<Home />
			</div>
		</ContextProvider>
	);
}

export default App;
