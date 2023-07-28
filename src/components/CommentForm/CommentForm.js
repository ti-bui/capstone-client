import "./commentForm.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CommentForm = ({ photoId }) => {
  const [comments, setComments] = useState("");
  const [name, setName] = useState("");
  const api = "http://localhost:3011/albums";
  photoId = useParams();

  // useEffect(() => {
  //   axios.get(`${api}/${photoId}`).then((response) => {
  //     console.log(response.data);
  //     setComments(response.data);
  //   });
  // }, []);

  return (
    <form class="form" novalidate>
      <div class="form__container">
        <input
          onClick={(e) => {
            e.stopPropagation();
          }}
          class="form__container-input form__container-input--name"
          type="text"
          name="fullName"
          placeholder="Hi, what's your name?"
          required
        />

        <textarea
          onClick={(e) => {
            e.stopPropagation();
          }}
          class="form__container-input form__container-input--comment"
          name="comments"
          required
          placeholder="Your thoughts on this image.."
        ></textarea>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        class="form__button"
        type="submit"
      >
        send
      </button>
    </form>
  );
};

export default CommentForm;
