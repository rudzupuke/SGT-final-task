import { useState } from "react";
import "./Home.scss";
import Header from "../../components/Header/Header";
import LoginModal from "../../components/LoginModal/LoginModal";
import { useCookies } from "react-cookie";

const Home = ({ isOnHomePage, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const authToken = cookies.AuthToken;

  const handleClick = () => {
    console.log("clicked!");
    setShowModal(true);
  };
  return (
    <div className="home">
      <Header
        authToken={authToken}
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        isOnHomePage={isOnHomePage}
        user={user}
      />
      <div className="home__container">
        <h1 className="heading--main">Find your dog a buddy!</h1>
        <button className="button--primary" onClick={handleClick}>
          {authToken ? "Sign Out" : "Create Account"}
        </button>
        {showModal && <LoginModal setShowModal={setShowModal} />}
      </div>
    </div>
  );
};

export default Home;
