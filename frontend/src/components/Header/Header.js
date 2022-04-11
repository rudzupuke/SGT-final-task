import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Header.scss";

const Header = ({ authToken, setShowModal, showModal, user, isOnHomePage }) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const handleClick = () => {
        setShowModal(true);
    };

    const logout = () => {
        removeCookie("UserId");
        removeCookie("Email");
        removeCookie("AuthToken");
        navigate("/");
        window.location.reload();
    };

    const toggleNav = () => {
        console.log("Nav toggled!");
    };

    return (
        <header className={isOnHomePage ? "header" : "header header--loggedin"}>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} className="logo__img" alt="logo"></img>
                        <span className="logo__text">dinder</span>
                    </Link>
                </div>
                <button
                    aria-controls="primary-navigation"
                    aria-expanded="false"
                    class="nav-toggle"
                    onClick={toggleNav}
                >
                    <span class="visually-hidden">Menu</span>
                </button>
                <nav className="nav" data-visible="false">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <Link to="/">Home</Link>
                        </li>
                        {/* <li className="nav__item">About</li> */}
                        <li className="nav__item">
                            {authToken && (
                                <Link to="/dashboard">Dashboard</Link>
                            )}
                        </li>
                        {!authToken && (
                            <li>
                                <button
                                    className="button--primary nav__button"
                                    onClick={handleClick}
                                    disabled={showModal}
                                >
                                    Log in
                                </button>
                            </li>
                        )}
                        {authToken && (
                            <>
                                <li>Welcome back, {user && user.name}!</li>
                                <li>
                                    <button
                                        className="button--primary nav__button"
                                        onClick={logout}
                                    >
                                        Log Out
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
