import "./deleteModal.scss";
import axios from "axios";

const DeleteModal = ({
  handleCloseModal,
  messageToDelete,
  setMessageToDelete,
  setMessages,
  setDeleteModal,
  albumId,
  imageId,
}) => {
  const api = "https://capstone-server-djrs.onrender.com/albums";
  const handleDelete = () => {
    if (messageToDelete) {
      axios
        .delete(`${api}/${albumId}/${imageId}/${messageToDelete}`)
        .then(() => {
          console.log("Message deleted successfully!");

          setMessages((messages) =>
            messages.filter(
              (deletedMessage) => deletedMessage.mess_id !== messageToDelete
            )
          );
        })
        .catch((error) => {
          console.log("Error deleting message: ", error);
        });

      setMessageToDelete("");
      setDeleteModal(false);
    }
  };

  return (
    <section className="delModal">
      <div className="delModal__content">
        <p className="delModal__content-text">Delete this message?</p>
        <div className="delModal__content-buttons">
          <button
            onClick={handleDelete}
            className="delModal__content-buttons-button delModal__content-buttons-button--yes"
          >
            yes
          </button>
          <button
            onClick={handleCloseModal}
            className="delModal__content-buttons-button delModal__content-buttons-button--no"
          >
            no
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
