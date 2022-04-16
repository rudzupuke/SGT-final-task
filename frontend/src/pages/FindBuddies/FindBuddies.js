import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import "./FindBuddies.scss";
import Header from "../../components/Header/Header";
import DogCard from "../../components/FindBuddies/DogCard";
import Filter from "../../components/FindBuddies/Filter";
import Loader from "../../components/Loader/Loader";

const FindBuddies = ({ user }) => {
    const [users, setUsers] = useState([]);
    const [usersForFiltering, setUsersForFiltering] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cookies] = useCookies(["user"]);
    const userId = cookies.UserId;
    const authToken = cookies.AuthToken;

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/users", {
                params: { userId }, // nosūta uz serveri lietotāja, kurš šobrīd ir ielogojies id, lai  serveris varētu neiekļaut lietotāju, kurš ir ielogojies rezultātos (pats sevi neredzētu pie suņiem, kurus var pievienot kā buddies)
            });
            setUsers(response.data);
            setUsersForFiltering(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading && <Loader />}
            <Header user={user} authToken={authToken} />
            <div className="findbuddies-container">
                <div className="all-dogs-container">
                    <h1 className="all-dogs-container__heading">
                        Find your dog a buddy
                    </h1>
                    <div className="all-dogs-container__center">
                        <div className="all-dogs-container__dogs">
                            {users.length > 0 &&
                                users.map((user) => {
                                    return (
                                        <DogCard
                                            key={user.user_id}
                                            name={user.name}
                                            picture={user.picture}
                                            age={user.age}
                                            bio={user.bio}
                                            character={user.character}
                                            userId={user.user_id}
                                            breed={user.breed}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div className="filter-container">
                    <h3 className="filter-container__heading">Filter by:</h3>
                    <Filter
                        users={users}
                        usersForFiltering={usersForFiltering}
                        setUsers={setUsers}
                    />
                </div>
            </div>
        </>
    );
};

export default FindBuddies;
