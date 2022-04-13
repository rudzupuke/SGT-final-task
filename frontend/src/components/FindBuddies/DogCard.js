import "./DogCard.scss";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const DogCard = ({ name, picture, age, bio, character, userId, breed }) => {
    const navigate = useNavigate();
    const [cookies] = useCookies(["user"]);
    // no cookies iegūst userId, ko nosūtīt serverim, lai varētu pievienot lietotājam buddy
    const myId = cookies.UserId;

    const addBuddy = async (userId, buddyUserId) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/addbuddy",
                { userId, buddyUserId }
            );

            const success = response.status === 200;
            if (success) navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="dog-card">
                <img className="dog-card__img" src={picture} alt={name} />
                <div className="dog-card__info">
                    <h2 className="dog-card__heading">
                        <span className="bold">{name}</span>, {age}
                    </h2>
                    <p className="dog-card__breed">{breed}</p>
                    <hr />
                    <ul className="dog-card__character">
                        {Array.isArray(character) ? (
                            character.map((x) => {
                                return <li key={x}>{x}</li>;
                            })
                        ) : (
                            <li>{character}</li>
                        )}
                    </ul>
                    <p className="dog-card__bio">{bio}</p>
                    <div className="dog-card__btncont">
                        <button
                            className="button--buddies"
                            onClick={() => addBuddy(myId, userId)}
                        >
                            Add buddy!
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DogCard;
