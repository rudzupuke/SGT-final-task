import "./LoginModal.scss";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ setShowModal }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setShowModal(false);
        // reenables scrolling
        document.body.style.overflow = "unset";
    };

    const handleClickOutside = (e) => {
        // close the modal on a click on the overlay, outside the modal window
        if (e.target.className === "overlay") {
            setShowModal(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/login", {
                email,
                password,
            });

            const success = response.status === 201;
            // display an error message if the request is not successful
            if (!success) {
                setError("Incorrect email or password");
                return;
            }

            setCookie("Email", response.data.email);
            setCookie("UserId", response.data.userId);
            setCookie("AuthToken", response.data.token);
            setCookie("UserName", response.data.name);

            // reenables scrolling that was disabled upon openng the modal
            document.body.style.overflow = "unset";
            navigate("/dashboard");
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return (
        <div className="overlay" onClick={handleClickOutside}>
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
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
