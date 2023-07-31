import "./commentForm.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emojiIcon from "../../assets/icons/emoji.svg";
import checkIcon from "../../assets/icons/check-mark.svg";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const CommentForm = ({ imageId, albumId }) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [messages, setMessages] = useState("");
  const [name, setName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const api = "http://localhost:3011/albums";

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMessages(messages + emoji);
  };

  useEffect(() => {
    if (isSubmit) {
      const timeout = setTimeout(() => {
        setIsSubmit(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isSubmit]);

  useEffect(() => {
    axios.get(`${api}/${albumId}/${imageId}`).then((response) => {
      setSelectedImage(response.data.messages);
    });
  }, [albumId, imageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      name: name,
      message: messages,
    };

    try {
      await axios.post(`${api}/${albumId}/${imageId}`, submitData);
      console.log("Submitted successfully");

      setSelectedImage([...selectedImage, { name, message: messages }]);
      setIsSubmit(true);
      setName("");
      setMessages("");
    } catch (error) {
      console.log("Error submitting message: ", error);
    }
  };

  return (
    <section className="wrapper">
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
        {isSubmit === true && (
          <div className="isSubmit">
            <img
              className="isSubmit__checkIcon"
              src={checkIcon}
              alt="check mark"
            />
            <p className="isSubmit__text"> Sent</p>
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
            </motion.div>
          );
        })}
      </section>
    </section>
  );
};

export default CommentForm;
