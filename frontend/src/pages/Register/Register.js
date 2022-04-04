import { useState } from "react";
import "./Register.scss";
import Header from "../../components/Header/Header";

const Register = () => {
	return (
		<div className="register">
			<Header whiteText={false} setShowModal={() => {}} showModal={false} />
		</div>
	);
};

export default Register;
