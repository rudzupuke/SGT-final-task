import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Header.scss";

const Header = ({ authToken, setShowModal, showModal, user, isOnHomePage }) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const [navExpanded, setNavExpanded] = useState(false);

    const handleClick = () => {
        setShowModal(true);
        // prevents scrolling when the modal is open
        document.body.style.overflow = "hidden";
    };

    const userName = cookies.UserName;
    const logout = () => {
        removeCookie("UserId");
        removeCookie("Email");
        removeCookie("AuthToken");
        removeCookie("UserName");
        navigate("/");
        window.location.reload();
    };

    const toggleNav = () => {
        setNavExpanded((prevNavExpanded) => !prevNavExpanded);
    };

    return (
        <header className={isOnHomePage ? "header" : "header header--loggedin"}>
            {/* <div className="container"> */}
            <div className="logo">
                <Link to="/">
                    <img src={logo} className="logo__img" alt="logo"></img>
                    <span className="logo__text">dinder</span>
                </Link>
            </div>
            <button
                aria-controls="primary-navigation"
                aria-expanded={navExpanded}
                className={authToken ? "nav-toggle" : "hidden"}
                onClick={toggleNav}
            >
                <span className="visually-hidden">Menu</span>
            </button>
            <nav
                className={authToken ? "nav nav--hamburger" : "nav"}
                id="primary-navigation"
                data-visible={navExpanded}
            >
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link to="/">Home</Link>
                    </li>
                    {/* <li className="nav__item">About</li> */}
                    <li className="nav__item">
                        {authToken && <Link to="/dashboard">Dashboard</Link>}
                    </li>
                    <li className="nav__item">
                        {authToken && (
                            <Link to="/findbuddies">Find buddies</Link>
                        )}
                    </li>
                    {!authToken && (
                        <li>
                            <button
                                className="button--outline nav__button"
                                onClick={handleClick}
                                disabled={showModal}
                            >
                                Log in
                            </button>
                        </li>
                    )}
                    {authToken && (
                        <>
                            <li>Welcome back, {userName}!</li>
                            <li>
                                <button
                                    className="button--outline nav__button"
                                    onClick={logout}
                                >
                                    Log Out
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            {/* </div> */}
        </header>
    );
};

export default Header;
