import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./DashBoard.scss";
import Header from "../../components/Header/Header";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import Loader from "../../components/Loader/Loader";
import DashboardBuddyCard from "../../components/Dashboard/DashboardBuddyCard";

const DashBoard = ({ user, setUser }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [cookies] = useCookies(["user"]);

    const userId = cookies.UserId;
    const authToken = cookies.AuthToken;

    const getUser = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/users/${userId}`
            );

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
            <Header authToken={authToken} user={user} />
            {isLoading && <Loader />}
            {!isLoading && (
                <>
                    <div className="dashboard">
                        {user && <DashboardCard user={user} />}
                        {user && (
                            <div className="db-buddies-container">
                                <h1 className="db-buddies-container__heading">
                                    My buddies
                                </h1>
                                <div className="db-buddies-container__buddies">
                                    <DashboardBuddyCard user={user} />
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default DashBoard;
