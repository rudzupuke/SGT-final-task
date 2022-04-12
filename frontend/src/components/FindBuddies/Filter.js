import "./Filter.scss";

const Filter = () => {
    return (
        <>
            <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
                <p>Age:</p>
                <label className="filter-form__checkbox-container">
                    <input
                        type="checkbox"
                        id="puppy"
                        name="puppy"
                        value="Puppy"
                    ></input>
                    <span className="checkbox"></span>
                    Puppy
                </label>
                <label className="filter-form__checkbox-container">
                    <input
                        type="checkbox"
                        id="mature"
                        name="mature"
                        value="mature"
                    ></input>
                    <span className="checkbox"></span>
                    Mature
                </label>
                <label className="filter-form__checkbox-container">
                    <input
                        type="checkbox"
                        id="senior"
                        name="senior"
                        value="senior"
                    ></input>
                    <span className="checkbox"></span>
                    Senior
                </label>
                <p>Character:</p>
                <label className="filter-form__checkbox-container">
                    <input
                        type="checkbox"
                        id="active"
                        name="active"
                        value="active"
                    ></input>
                    <span className="checkbox"></span>
                    Active
                </label>
                <label className="filter-form__checkbox-container">
                    <input
                        type="checkbox"
                        id="passive"
                        name="passive"
                        value="passive"
                    ></input>
                    <span className="checkbox"></span>
                    Passive
                </label>
                <button className="btn--filter">Filter</button>
            </form>
        </>
    );
};

export default Filter;
