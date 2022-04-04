import "./LoginModal.scss";
import { useState } from "react";
import axios from "axios";
import { useCookie } from "react-cookie";

const LoginModal = ({ setShowModal }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setError] = useState(null);

  console.log(email, password);

  const handleCloseModal = async () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-modal">
      <button className="button--close" onClick={handleCloseModal}>
        &#10006;
      </button>
      <h2>LOG IN</h2>
      <p>
        By clicking Log In you agree to our Terms and conditions. Learn more
        about our Privacy policy and Cookie policy
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
        <button className="button--primary">LOG IN</button>
        <p className="error-message">{errors}</p>
      </form>
    </div>
  );
};

export default LoginModal;
