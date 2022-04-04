import "./Home.scss";
import Header from "../../components/Header/Header";

const Home = () => {
	const authToken = false;
	const handleClick = () => {
		console.log("clicked!");
	};
	return (
		<div className="home">
			<Header authToken={authToken} minimal={false}/>
			<div className="home__container">
				<h1 className="heading--main">Find your dog a buddy!</h1>
				<button className="button--primary" onClick={handleClick}>
					{authToken ? "Sign Out" : "Create Account"}
				</button>
			</div>
		</div>
	);
};

export default Home;
