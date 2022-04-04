import './App.scss';
import data from './dummyData';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import DashBoard from './pages/DashBoard/DashBoard';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	console.log(data);
	return (
		<div className="app">
			{/* <Header /> */}
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/dashboard" element={<DashBoard />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
