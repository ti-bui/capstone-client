import "./fullScreenModal.scss";

const FullScreenModal = ({ onClose, image }) => {
  return (
    <article onClick={onClose} className="modal">
      <div className="modal__overlay"></div>
      <div className="modal__content">
        <img className="modal__content-img" src={image} alt="image" />
      </div>
    </article>
  );
};

export default FullScreenModal;
