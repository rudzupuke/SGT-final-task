import "./GoOnAWalkModal.scss";

const GoOnAWalkModal = ({ setShowGoOnAWalkModal, buddysName }) => {
    return (
        <div
            className="go-on-walk-modal-bg"
            onClick={(e) =>
                e.target.className === "go-on-walk-modal-bg" &&
                setShowGoOnAWalkModal(false)
            }
        >
            <div className="go-on-walk-modal">
                <button
                    className="go-on-walk-modal__close"
                    onClick={() => setShowGoOnAWalkModal(false)}
                >
                    &#10006;
                </button>
                <p className="go-on-walk-modal__text">
                    You have booked a walk with {buddysName}!
                </p>
            </div>
        </div>
    );
};

export default GoOnAWalkModal;
