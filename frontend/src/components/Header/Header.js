import logo from '../../assets/logo.svg';
import './Header.css';

const Header = () => {
	return (
		<div className="header">
			<div className="logo">
				<img src={logo} className="logo__img" alt="logo"></img>
				<span className="logo__text">dinder</span>
			</div>
			<nav className="nav">
				<ul className="nav__list">
					<li className="nav__item">Home</li>
					<li className="nav__item">About</li>
					<li className="nav__item">Dashboard</li>
				</ul>
				<button className="button">Log in</button>
			</nav>
		</div>
	);
};

export default Header;
