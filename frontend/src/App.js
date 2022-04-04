import "./App.scss";
import data from "./dummyData";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import DashBoard from "./pages/DashBoard/DashBoard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	console.log(data);
	return (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/dashboard" element={<DashBoard />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</BrowserRouter>
	);
}

export default App;
