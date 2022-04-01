import './App.css';
import data from './dummyData';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import DashBoard from './components/DashBoard/DashBoard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
	console.log(data);
	return (
		<div className="App">
			<h1>Dinder app</h1>
			<div>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
				veniam voluptatum consequatur aliquam! Suscipit, laborum.
			</div>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					maxWidth: '1000px',
					margin: '0px auto',
				}}
			>
				{data.map((dog) => (
					<div style={{ width: '30%', margin: '10px 0' }}>
						<h4 style={{ margin: '0px' }}>{dog.name}</h4>
						<h5 style={{ margin: '0px' }}>{dog.breed}</h5>
						<h6 style={{ margin: '0px' }}>{dog.age}</h6>
						<img src={dog.img} style={{ width: '200px' }} />
						<p style={{ margin: '0px' }}>
							{dog.character.map((char) => (
								<span>{char} | </span>
							))}
						</p>
						<p style={{ margin: '0px' }}>{dog.bio}</p>
						<div>
							<h6 style={{ margin: '10px 0 0 0' }}>Friends:</h6>
							<ul>
								{dog.friends.length != 0 ? (
									dog.friends.map(({ name, img }) => (
										<li>
											<img
												style={{ width: '100px' }}
												src={img}
											/>
											{name}
										</li>
									))
								) : (
									<p>no friends</p>
								)}
							</ul>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
