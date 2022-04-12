import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Home.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LoginModal from "../../components/LoginModal/LoginModal";
import { useCookies } from "react-cookie";

const Home = ({ isOnHomePage, user }) => {
    const [showModal, setShowModal] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();
    const authToken = cookies.AuthToken;

    return (
        <>
            <div className="home">
                <Header
                    authToken={authToken}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    isOnHomePage={isOnHomePage}
                    user={user}
                />
                <div className="home__container">
                    <h1 className="heading--main">Find your dog a buddy!</h1>
                    <button className="button--primary">
                        {authToken ? (
                            <Link to="/dashboard">My dashboard</Link>
                        ) : (
                            <Link to="/register">Create account</Link>
                        )}
                    </button>
                    {showModal && <LoginModal setShowModal={setShowModal} />}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
