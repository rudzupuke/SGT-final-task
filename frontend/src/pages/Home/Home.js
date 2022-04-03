import './Home.scss';
import Header from "../../components/Header/Header"

const Home = () => {
	return (
		<div className="home">
			<Header />
			<div className="home__container">
				<h1 className="heading--main">Find your dog a buddy!</h1>
				<button className="button">Create account &#8594;</button>
			</div>
		</div>
	);
};

export default Home;
