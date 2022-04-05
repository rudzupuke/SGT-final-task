import { useState } from "react";
import "./Register.scss";
import Header from "../../components/Header/Header";

const Register = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target);
	};

	const handleChange = (e) => {
		console.log(e.target.value);
	};

	return (
		<>
			<Header
				whiteText={false}
				setShowModal={() => {}}
				showModal={false}
				isOnHomePage={false}
			/>

			<main className="register">
				<h2>Create account</h2>
				<form onSubmit={handleSubmit} className="registration-form">
					<label htmlFor="email">Dog's name</label>
					<input
						type="email"
						placeholder="Email"
						name="email"
						id="email"
						required
						value={""}
						onChange={handleChange}
					/>
					<label htmlFor="password">Dog's name</label>
					<input
						type="text"
						placeholder="Password"
						name="password"
						id="password"
						required
						value={""}
						onChange={handleChange}
					/>
					<label htmlFor="password-confirm">Dog's name</label>
					<input
						type="password"
						placeholder="Confirm password"
						name="password-confirm"
						id="password-confirm"
						required
						value={""}
						onChange={handleChange}
					/>
					<label htmlFor="name">Dog's name</label>
					<input
						type="text"
						placeholder="Dog's name"
						name="name"
						id="name"
						required
						value={""}
						onChange={handleChange}
					/>
					<label htmlFor="breed">Breed</label>
					<input
						type="text"
						placeholder="Dog's breed"
						name="breed"
						id="breed"
						required
						value={""}
						onChange={handleChange}
					/>
					<label htmlFor="image">Photo url</label>
					<input
						type="url"
						placeholder="Photo url"
						name="image"
						id="image"
						value={""}
						onChange={handleChange}
					/>
					<fieldset>
					<label htmlFor="age">Dog's age</label>
					<input
						type="radio"
						name="age"
						id="agr"
						value={""}
						onChange={handleChange}
					/>
					</fieldset>
					<textarea
						name="bio"
						id="bio"
						placeholder="Tell about the dog..."
						maxLength="200"
					></textarea>
				</form>
			</main>
		</>
	);
};

export default Register;
