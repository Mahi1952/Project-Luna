import React, { useEffect, useState } from "react";
import { navigate } from "react-router-dom";
import loader from "../asssets/loader.gif";
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
          `${api}/${Math.round(Math.random() * 1000)}`
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
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div``;

export default SetAvatar;
