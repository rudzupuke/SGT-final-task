import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Header from "../../components/Header/Header";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import "./DashBoard.scss";

const DashBoard = () => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;
  //   console.log(userId);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  return (
    <div className="dashboard">
      <Header />
      {user && <DashboardCard user={user} />}
    </div>
  );
};

export default DashBoard;
