import "./commentForm.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const CommentForm = ({ imageId, albumId }) => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [messages, setMessages] = useState("");
  const [name, setName] = useState("");
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

      setName("");
      setMessages("");
    } catch (error) {
      console.log("Error submitting message: ", error);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__container">
          <input
            onChange={(e) => setName(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="form__container-input form__container-input--name"
            type="text"
            name="fullName"
            placeholder="Hi, what's your name?"
            required
          />

          <textarea
            onChange={(e) => setMessages(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="form__container-input form__container-input--comment"
            name="messages"
            required
            placeholder="Your thoughts on this image.."
          ></textarea>
        </div>

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
      <ul>
        {selectedImage.map((image) => {
          return (
            <li key={image.name}>
              <p>name{image.name}</p>
              <p>message{image.message}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CommentForm;
