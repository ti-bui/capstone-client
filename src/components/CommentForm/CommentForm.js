import "./commentForm.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const CommentForm = ({ imageId, albumId }) => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [messages, setMessages] = useState("");
  const [name, setName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const api = "http://localhost:3011/albums";

  useEffect(() => {
    axios.get(`${api}/${albumId}/${imageId}`).then((response) => {
      console.log(response.data.messages);
      setSelectedImage(response.data.messages);
    });
  }, []);

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
        </div>
        {isSubmit === true && <div>Sent</div>}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="form__button"
          type="submit"
        >
          send
        </button>
      </form>
      <ul className="posted">
        {selectedImage.map((image) => {
          return (
            <li className="posted__wrapper" key={image.mess_id}>
              <p className="posted__wrapper-text posted__wrapper-text--name">
                {image.name}
              </p>
              <p className="posted__wrapper-text posted__wrapper-text--msg">
                {image.message}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CommentForm;
