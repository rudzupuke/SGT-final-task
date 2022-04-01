import './App.css';
import data from './dummyData';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import DashBoard from './components/DashBoard/DashBoard';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	console.log(data);
	return (
		<div className="app">
			<Header />
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
