import { useState } from "react";
import "./Register.scss";
import Header from "../../components/Header/Header";

const Register = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		name: "",
		passwordRepeat: "",
		breed: "",
		picture: "",
		age: "",
		character: "",
		bio: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: type === "checkbox" ? checked : value,
			};
		});
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
					<label htmlFor="email">Your email</label>
					<input
						type="email"
						placeholder="Email"
						name="email"
						id="email"
						required={true}
						value={formData.email}
						onChange={handleChange}
					/>
					<label htmlFor="password">Create password</label>
					<input
						type="password"
						placeholder="Password"
						name="password"
						id="password"
						required={true}
						value={formData.password}
						onChange={handleChange}
					/>
					<label htmlFor="passwordRepeat">Confirm password</label>
					<input
						type="password"
						placeholder="Confirm password"
						name="passwordRepeat"
						id="passwordRepeat"
						required={true}
						value={formData.passwordRepeat}
						onChange={handleChange}
					/>
					<label htmlFor="name">Dog's name</label>
					<input
						type="text"
						placeholder="Dog's name"
						name="name"
						id="name"
						required
						value={formData.name}
						onChange={handleChange}
					/>
					<label htmlFor="breed">Breed</label>
					<input
						type="text"
						placeholder="Dog's breed"
						name="breed"
						id="breed"
						required={true}
						value={formData.breed}
						onChange={handleChange}
					/>
					<label htmlFor="picture">Photo url</label>
					<input
						type="url"
						placeholder="Photo url"
						name="picture"
						id="picture"
						value={formData.picture}
						onChange={handleChange}
					/>
					<fieldset>
						<legend>Dog's age</legend>
						<input
							type="radio"
							name="age"
							id="puppy"
							value="puppy"
							checked={formData.age === "puppy"}
							onChange={handleChange}
						/>
						<label htmlFor="puppy">puppy</label>
						<input
							type="radio"
							name="age"
							id="mature"
							value="mature"
							checked={formData.age === "mature"}
							onChange={handleChange}
						/>
						<label htmlFor="mature">mature</label>
						<input
							type="radio"
							name="age"
							id="senior"
							value="senior"
							checked={formData.age === "senior"}
							onChange={handleChange}
						/>
						<label htmlFor="senior">senior</label>
					</fieldset>
					<fieldset>
						<legend>Dog's character</legend>
						<input
							type="radio"
							name="character"
							id="active"
							value="active"
							checked={formData.character === "active"}
							onChange={handleChange}
						/>
						<label htmlFor="active">active</label>
						<input
							type="radio"
							name="character"
							id="calm"
							value="calm"
							checked={formData.character === "calm"}
							onChange={handleChange}
						/>
						<label htmlFor="active">calm</label>
					</fieldset>
					<label htmlFor="bio">Bio</label>
					<textarea
						name="bio"
						id="bio"
						placeholder="Tell about the dog..."
						maxLength="200"
						value={formData.bio}
						onChange={handleChange}
					></textarea>
					<button className="button--primary">Create account</button>
				</form>
			</main>
		</>
	);
};

export default Register;
