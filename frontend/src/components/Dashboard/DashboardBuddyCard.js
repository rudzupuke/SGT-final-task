import axios from "axios";
import { useEffect, useState } from "react";
import "./DashboardBuddyCard.scss";
import GoOnAWalkModal from "./GoOnAWalkModal";

const DashboardBuddyCard = ({ user }) => {
    const [buddies, setBuddies] = useState(null);
    const [showGoOnAWalkModal, setShowGoOnAWalkModal] = useState(false);
    const [buddyToGoOnAWalk, setBuddyToGoOnAWalk] = useState("");

    const buddieIds = user.buddies.map(({ user_id }) => user_id);
    const getBuddies = async () => {
        try {
            const response = await axios.get("http://localhost:8000/buddies", {
                params: { buddieIds: JSON.stringify(buddieIds) },
            });
            setBuddies(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBuddies();
    }, []);

    const goOnAWalk = (buddiesName) => {
        setShowGoOnAWalkModal(true);
        setBuddyToGoOnAWalk(buddiesName);
    };
    console.log(showGoOnAWalkModal);
    return (
        <>
            {buddies &&
                buddies.map((buddy) => {
                    return (
                        <div className="db-buddy-card" key={buddy.user_id}>
                            <img
                                className="db-buddy-card__img"
                                src={buddy.picture}
                            />
                            <h2 className="db-buddy-card__heading">
                                <span className="bold">{buddy.name}</span>,{" "}
                                {buddy.age}
                            </h2>
                            <div className="db-buddy-card__btncont">
                                <button
                                    className="button--buddies"
                                    onClick={() => goOnAWalk(buddy.name)}
                                >
                                    Go on a walk!
                                </button>
                                <button className="button--buddies">
                                    Chat
                                </button>
                            </div>
                        </div>
                    );
                })}
            {showGoOnAWalkModal && (
                <GoOnAWalkModal
                    setShowGoOnAWalkModal={setShowGoOnAWalkModal}
                    buddysName={buddyToGoOnAWalk}
                />
            )}
        </>
    );
};

export default DashboardBuddyCard;
