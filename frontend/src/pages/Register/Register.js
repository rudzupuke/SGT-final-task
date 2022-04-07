import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import "./Register.scss";
import Header from "../../components/Header/Header";

const Register = () => {
	const [cookies, setCookie] = useCookies(["user"]);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		user_id: cookies.UserId,
		email: "",
		password: "",
		name: "",
		passwordRepeat: "",
		breed: "",
		picture: "",
		age: "",
		character: "",
		bio: "",
		buddies: [],
	});
	const [errors, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.passwordRepeat) {
			setError("The passwords don't match");
			return;
		}
		try {
			const response = await axios.post("http://localhost:8000/signup", {
				formData,
			});
			console.log(formData);
			console.log(`server response: ${response}`);

			setCookie("Email", response.data.email);
			setCookie("UserId", response.data.userId);
			setCookie("AuthToken", response.data.token);

			const success = response.status === 201;

			if (success) navigate("/dashboard");
		} catch (error) {
			console.log(error);
		}
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

					<fieldset className="registration-form__radios-container">
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
					<fieldset className="registration-form__radios-container">
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
						<label htmlFor="calm">calm</label>
					</fieldset>
					<label htmlFor="picture">Profile picture</label>
					<input
						type="url"
						placeholder="Photo url"
						name="picture"
						id="picture"
						value={formData.picture}
						onChange={handleChange}
					/>
					{formData.picture && (
						<div className="registration-form__pic-preview">
							<img
								src={formData.picture}
								alt="Profile picture preview"
							/>
						</div>
					)}
					<label htmlFor="bio">Bio</label>
					<textarea
						name="bio"
						id="bio"
						placeholder="Tell about the dog..."
						maxLength="200"
						value={formData.bio}
						onChange={handleChange}
					></textarea>
					{errors && <p className="error-message">{errors}</p>}
					<button className="button--primary registration-form__btn">
						Create account
					</button>
				</form>
			</main>
		</>
	);
};

export default Register;
