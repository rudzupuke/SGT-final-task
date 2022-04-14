import "./Filter.scss";
import { useState, useEffect } from "react";

// It would probably be better to get these from somewhere instead of harcoding :) 
const ages = ["puppy", "mature", " senior"];
const characters = ["active", "calm"];

const Filter = ({ setUsers, usersForFiltering, getUsers, userId }) => {
    // const [puppy, setPuppy] = useState(false);
    // const [mature, setMature] = useState(false);
    // const [senior, setSenior] = useState(false);
    // const [active, setActive] = useState(false);
    // const [calm, setCalm] = useState(false);

    const [characterArray, setCharacterArray] = useState(
        new Array(characters.length).fill(false)
    );
    const [ageArray, setAgeArray] = useState(
        new Array(ages.length).fill(false)
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(ageArray);
        console.log(characterArray);
        // could use the getUsers function or just write a request for users based on the filters and userId
    };

    const handleAgeChange = (position) => {
        const updatedAgeState = ageArray.map((item, index) =>
            index === position ? !item : item
        );

        setAgeArray(updatedAgeState);
    };

    const handleCharacterChange = (position) => {
        const updatedCharacterState = characterArray.map((item, index) =>
            index === position ? !item : item
        );

        setCharacterArray(updatedCharacterState);
    };

    // const filterUsers = () => {
    //     console.log(usersForFiltering);

    // let ageArray = [];
    // if (puppy) ageArray.push("puppy");
    // if (mature) ageArray.push("mature");
    // if (senior) ageArray.push("senior");

    // let characterArray = [];
    // if (active) characterArray.push("active");
    // if (calm) characterArray.push("calm");

    //     const copyOfUsers = [...usersForFiltering];
    //     if (ageArray.length > 0 || characterArray.length > 0) {
    //         const filteredUsers = copyOfUsers.filter((user) => {
    //             if (ageArray.length > 0 && characterArray.length === 0) {
    //                 if (user.age.includes(ageArray[0])) return true;
    //                 if (user.age.includes(ageArray[1])) return true;
    //                 if (user.age.includes(ageArray[2])) return true;
    //             } else if (characterArray.length > 0 && ageArray.length === 0) {
    //                 if (user.character.includes(characterArray[0])) return true;
    //                 if (user.character.includes(characterArray[1])) return true;
    //             } else if (ageArray.length > 0 && characterArray.length > 0) {
    //                 if (
    //                     user.age.includes(ageArray[0]) &&
    //                     user.character.includes(characterArray[0])
    //                 )
    //                     return true;
    //                 if (
    //                     user.age.includes(ageArray[0]) &&
    //                     user.character.includes(characterArray[1])
    //                 )
    //                     return true;
    //                 if (
    //                     user.age.includes(ageArray[1]) &&
    //                     user.character.includes(characterArray[0])
    //                 )
    //                     return true;
    //                 if (
    //                     user.age.includes(ageArray[1]) &&
    //                     user.character.includes(characterArray[1])
    //                 )
    //                     return true;
    //                 if (
    //                     user.age.includes(ageArray[2]) &&
    //                     user.character.includes(characterArray[0])
    //                 )
    //                     return true;
    //                 if (
    //                     user.age.includes(ageArray[2]) &&
    //                     user.character.includes(characterArray[1])
    //                 )
    //                     return true;
    //             }
    //         });
    //         setUsers(filteredUsers);
    //     } else if (ageArray.length === 0 || characterArray === 0) {
    //         setUsers(usersForFiltering);
    //     }
    // };

    return (
        <>
            <form className="filter-form" onSubmit={(e) => handleSubmit(e)}>
                <p className="filter-form__p">Age:</p>

                {ages.map((age, index) => {
                    return (
                        <label
                            htmlFor={`age-${index}`}
                            className="filter-form__checkbox-container"
                            key={age}
                        >
                            <input
                                type="checkbox"
                                id={`age-${index}`}
                                name={age}
                                value={age}
                                checked={ageArray[index]}
                                onChange={() => {
                                    handleAgeChange(index);
                                }}
                            ></input>
                            <svg
                                className={`checkbox ${
                                    ageArray[index] ? "checkbox--active" : ""
                                }`}
                                // hides for screen readers:
                                aria-hidden="true"
                                viewBox="-2 0 19 9"
                                fill="none"
                            >
                                <path
                                    d="M1 4.5L5 9L14 1"
                                    strokeWidth="2"
                                    stroke={ageArray[index] ? "#fff" : "none"}
                                />
                            </svg>
                            {age}
                        </label>
                    );
                })}

                <p>Character:</p>

                {characters.map((character, index) => {
                    return (
                        <label
                            htmlFor={`character-${index}`}
                            className="filter-form__checkbox-container"
                            key={character}
                        >
                            <input
                                type="checkbox"
                                id={`character-${index}`}
                                name={character}
                                value={character}
                                checked={characterArray[index]}
                                onChange={() => {
                                    handleCharacterChange(index);
                                }}
                            ></input>
                            <svg
                                className={`checkbox ${
                                    characterArray[index]
                                        ? "checkbox--active"
                                        : ""
                                }`}
                                // hides for screen readers:
                                aria-hidden="true"
                                viewBox="-2 0 19 9"
                                fill="none"
                            >
                                <path
                                    d="M1 4.5L5 9L14 1"
                                    strokeWidth="2"
                                    stroke={
                                        characterArray[index] ? "#fff" : "none"
                                    }
                                />
                            </svg>
                            {character}
                        </label>
                    );
                })}

                <button
                    className="btn--filter"
                    // onSubmit={(e) => handleSubmit(e)}
                    // onClick={filterUsers}
                >
                    Filter
                </button>
            </form>
        </>
    );
};

export default Filter;
