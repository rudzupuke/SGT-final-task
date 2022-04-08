import "./GoOnAWalkModal.scss";

const GoOnAWalkModal = ({ setShowGoOnAWalkModal }) => {
  return (
    <div className="go-on-walk-modal-bg">
      <div className="go-on-walk-modal">
        <button
          className="button--close"
          onClick={() => setShowGoOnAWalkModal(false)}
        >
          &#10006;
        </button>
        You have booked a walk with ...!
      </div>
    </div>
  );
};

export default GoOnAWalkModal;
