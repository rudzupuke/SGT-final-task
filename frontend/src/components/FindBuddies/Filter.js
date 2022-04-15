import "./Filter.scss";
import { useState } from "react";

const Filter = ({ setUsers, usersForFiltering }) => {
    const [puppy, setPuppy] = useState(false);
    const [mature, setMature] = useState(false);
    const [senior, setSenior] = useState(false);
    const [active, setActive] = useState(false);
    const [calm, setCalm] = useState(false);

    const filterUsers = () => {
        console.log(usersForFiltering);

        let ageArray = [];
        if (puppy) ageArray.push("puppy");
        if (mature) ageArray.push("mature");
        if (senior) ageArray.push("senior");

        let characterArray = [];
        if (active) characterArray.push("active");
        if (calm) characterArray.push("calm");

        // if both arrays are empty (user has not slected any filtering criteria), set users to all users
        // moved this up because in such a case there is no need to check for the other conditions
        if (ageArray.length === 0 && characterArray.length === 0) {
            setUsers(usersForFiltering);
            return;
        }

        const copyOfUsers = [...usersForFiltering];
        if (ageArray.length > 0 || characterArray.length > 0) {
            const filteredUsers = copyOfUsers.filter((user) => {
                if (ageArray.length > 0 && characterArray.length === 0) {
                    if (ageArray.includes(user.age)) return true;
                } else if (characterArray.length > 0 && ageArray.length === 0) {
                    if (characterArray.includes(user.character)) return true;
                } else if (ageArray.length > 0 && characterArray.length > 0) {
                    if (
                        ageArray.includes(user.age) &&
                        characterArray.includes(user.character)
                    ) {
                        return true;
                    }
                }
                return false;
            });
            setUsers(filteredUsers);
        }
    };

    return (
        <>
            <div className="filter-form">
                <p className="filter-form__p">Age:</p>
                <label className="filter-form__checkbox-container">
                    <input
                        type="checkbox"
                        id="puppy"
                        name="puppy"
                        value="Puppy"
                        onChange={() => {
                            setPuppy(!puppy);
                        }}
                    ></input>
                    <svg
                        className={`checkbox ${
                            puppy ? "checkbox--active" : ""
                        }`}
                        // hides for screen readers:
                        aria-hidden="true"
                        viewBox="-2 0 19 9"
                        fill="none"
                    >
                        <path
                            d="M1 4.5L5 9L14 1"
                            strokeWidth="2"
                            stroke={puppy ? "#fff" : "none"}
                        />
                    </svg>
                    Puppy
                </label>
                <label className="filter-form__checkbox-container">
                    <input
                        type="checkbox"
                        id="puppy"
                        name="puppy"
                        value="Puppy"
                        onChange={() => {
                            setMature(!mature);
                        }}
                    ></input>
                    <svg
                        className={`checkbox ${
                            mature ? "checkbox--active" : ""
                        }`}
                        // hides for screen readers:
                        aria-hidden="true"
                        viewBox="-2 0 19 9"
                        fill="none"
                    >
                        <path
                            d="M1 4.5L5 9L14 1"
                            strokeWidth="2"
                            stroke={mature ? "#fff" : "none"}
                        />
                    </svg>
                    Mature
                </label>
                <label className="filter-form__checkbox-container">
                    <input
                        type="checkbox"
                        id="puppy"
                        name="puppy"
                        value="Puppy"
                        onChange={() => {
                            setSenior(!senior);
                        }}
                    ></input>
                    <svg
                        className={`checkbox ${
                            senior ? "checkbox--active" : ""
                        }`}
                        // hides for screen readers:
                        aria-hidden="true"
                        viewBox="-2 0 19 9"
                        fill="none"
                    >
                        <path
                            d="M1 4.5L5 9L14 1"
                            strokeWidth="2"
                            stroke={senior ? "#fff" : "none"}
                        />
                    </svg>
                    Senior
                </label>

                <p>Character:</p>
                <label className="filter-form__checkbox-container">
                    <input
                        type="checkbox"
                        id="puppy"
                        name="puppy"
                        value="Puppy"
                        onChange={() => {
                            setActive(!active);
                        }}
                    ></input>
                    <svg
                        className={`checkbox ${
                            active ? "checkbox--active" : ""
                        }`}
                        // hides for screen readers:
                        aria-hidden="true"
                        viewBox="-2 0 19 9"
                        fill="none"
                    >
                        <path
                            d="M1 4.5L5 9L14 1"
                            strokeWidth="2"
                            stroke={active ? "#fff" : "none"}
                        />
                    </svg>
                    Active
                </label>
                <label className="filter-form__checkbox-container">
                    <input
                        type="checkbox"
                        id="puppy"
                        name="puppy"
                        value="Puppy"
                        onChange={() => {
                            setCalm(!calm);
                        }}
                    ></input>
                    <svg
                        className={`checkbox ${calm ? "checkbox--active" : ""}`}
                        // hides for screen readers:
                        aria-hidden="true"
                        viewBox="-2 0 19 9"
                        fill="none"
                    >
                        <path
                            d="M1 4.5L5 9L14 1"
                            strokeWidth="2"
                            stroke={calm ? "#fff" : "none"}
                        />
                    </svg>
                    Calm
                </label>
                <button className="btn--filter button--outline" onClick={filterUsers}>
                    Filter
                </button>
            </div>
        </>
    );
};

export default Filter;
