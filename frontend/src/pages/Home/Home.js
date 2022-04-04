import { useState } from "react";
import "./Home.scss";
import Header from "../../components/Header/Header";
import LoginModal from "../../components/LoginModal/LoginModal";

const Home = () => {
	const [showModal, setShowModal] = useState(false);
	const authToken = false;
	const handleClick = () => {
		console.log("clicked!");
		setShowModal(true);
	};
	return (
		<div className="home">
			<Header
				whiteText={true}
				setShowModal={setShowModal}
				showModal={showModal}
			/>
			<div className="home__container">
				<h1 className="heading--main">Find your dog a buddy!</h1>
				<button className="button--primary" onClick={handleClick}>
					{authToken ? "Sign Out" : "Create Account"}
				</button>
				{showModal && <LoginModal setShowModal={setShowModal} />}
			</div>
		</div>
	);
};

export default Home;
