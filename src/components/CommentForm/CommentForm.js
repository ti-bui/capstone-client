import "./commentForm.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emojiIcon from "../../assets/icons/emoji.svg";
import checkIcon from "../../assets/icons/check-mark.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import DeleteModal from "../DeleteModal/DeleteModal";

const CommentForm = ({ imageId, albumId }) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [messages, setMessages] = useState("");
  const [name, setName] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const api = "http://localhost:3011/albums";

  const handleOpenModal = (message) => {
    setDeleteModal(true);
    setMessageToDelete(message);
  };

  const handleCloseModal = () => {
    setDeleteModal(false);
    setMessageToDelete("");
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMessages(messages + emoji);
  };

  useEffect(() => {
    if (isSent) {
      const timeout = setTimeout(() => {
        setIsSent(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isSent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      name: name,
      message: messages,
    };

    try {
      const response = await axios.post(
        `${api}/${albumId}/${imageId}`,
        submitData
      );
      console.log("Submitted successfully");
      setSelectedImage([...selectedImage, response.data]);
      setIsSent(true);
      setName("");
      setMessages("");
    } catch (error) {
      console.log("Error submitting message: ", error);
    }
  };

  return (
    <section className="wrapper">
      {deleteModal && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          messages={selectedImage}
          setMessages={setSelectedImage}
          albumId={albumId}
          imageId={imageId}
          handleCloseModal={handleCloseModal}
          messageToDelete={messageToDelete}
          setMessageToDelete={setMessageToDelete}
        />
      )}
      <form required onSubmit={handleSubmit} className="form">
        <div className="form__container">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form__container-input form__container-input--name"
            type="text"
            name="fullName"
            placeholder="Hi, what's your name?"
            required
          />

          <textarea
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
            className="form__container-input form__container-input--comment"
            name="messages"
            required
            placeholder="Your thoughts on this image.."
          ></textarea>

          <div className="form__emojiWrap">
            {showEmojis && (
              <div className="form__emojiWrap-picker">
                <Picker
                  className="form__emojiWrap-picker-box"
                  data={data}
                  onEmojiSelect={addEmoji}
                  theme="dark"
                />
              </div>
            )}
            <div
              onClick={() => setShowEmojis(!showEmojis)}
              className="form__emojiWrap-button"
            >
              <img
                className="form__emojiWrap-button-icon"
                src={emojiIcon}
                alt="emoji icon"
              />
            </div>
          </div>
        </div>

        {isSent === true && (
          <div className="isSent">
            <img
              className="isSent__checkIcon"
              src={checkIcon}
              alt="check mark"
            />
            <p className="isSent__text">Sent</p>
          </div>
        )}
        <button className="form__button" type="submit">
          send
        </button>
      </form>

      <section className="posted">
        {selectedImage.map((image) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              className="posted__wrapper"
              key={image.mess_id}
            >
              <p className="posted__wrapper-text posted__wrapper-text--name">
                {image.name}
              </p>
              <p className="posted__wrapper-text posted__wrapper-text--msg">
                {image.message}
              </p>
              <img
                onClick={() => handleOpenModal(image.mess_id)}
                className="posted__wrapper-delete"
                src={deleteIcon}
                alt="delete icon"
              />
            </motion.div>
          );
        })}
      </section>
    </section>
  );
};

export default CommentForm;
