import Header from "../../components/Header/Header";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import "./DashBoard.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import DashboardBuddyCard from "../../components/Dashboard/DashboardBuddyCard";

const DashBoard = ({ user, setUser }) => {
  console.log("render");
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["user"]);

  const userId = cookies.UserId;
  const authToken = cookies.AuthToken;
  //   console.log(userId);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isLoading && <div className="loading">Loading..</div>}
      {!isLoading && (
        <div className="dashboard">
          <Header authToken={authToken} user={user} />
          {user && <DashboardCard user={user} />}
          {user && (
            <div className="db-buddies-container">
              <h1 className="db-buddies-container__heading">My buddies</h1>
              <div className="db-buddies-container__buddies">
                <DashboardBuddyCard user={user} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DashBoard;
