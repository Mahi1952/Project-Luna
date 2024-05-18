import React, { useEffect, useState } from "react";
import { navigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRouters";
import styled from "styled-components";
import { Buffer } from "buffer";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  // const privateApiKey = "?apikey=WPiVdK1rutb5Oj";
  const privateApiKey = "";

  const myIcon = () => <span>🤨😞</span>;
  const toastEmitter = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    icon: myIcon,
  };

  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const img = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}?apikey=WPiVdK1rutb5Oj`
        );
        const buffer = new Buffer(img.data);
        data.push(buffer.toString("base64"));
      }

      setAvatars(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Choose your Avatar</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  key={avatar}
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100%;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.4rem;
      border: 0.4rem solid transparent;
      border-radius: 5rem;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      &:hover {
        border: 0.4rem solid #3f3f3f;
      }
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
`;

export default SetAvatar;
