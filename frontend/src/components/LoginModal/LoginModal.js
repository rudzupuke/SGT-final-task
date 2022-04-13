import "./LoginModal.scss";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ setShowModal }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errors, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const navigate = useNavigate();

    console.log(email, password);

    const handleCloseModal = async () => {
        setShowModal(false);
        // reenables scrolling
        document.body.style.overflow = 'unset';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/login", {
                email,
                password,
            });

            setCookie("Email", response.data.email);
            setCookie("UserId", response.data.userId);
            setCookie("AuthToken", response.data.token);

            const success = response.status === 201;

            if (success) navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="overlay">
            <div className="login-modal">
                <button className="button--close" onClick={handleCloseModal}>
                    &#10006;
                </button>
                <h2>LOG IN</h2>
                <p>
                    By clicking Log In you agree to our Terms and conditions.
                    Learn more about our Privacy policy and Cookie policy
                </p>
                <form onSubmit={handleSubmit} className="login-modal__form">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Log In"
                        className="button--primary"
                    />
                    <p className="error-message">{errors}</p>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
