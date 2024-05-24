import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <>
      <Container>
        <form className="input-container" onSubmit={(event) => sendChat(event)}>
          <input
            type="text"
            placeholder="type your message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button type="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: #080420;
  border-top: none;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .input-container {
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff34;
    border-radius: 2rem;
    padding: 0.5rem 1rem;

    input {
      flex-grow: 1;
      background-color: transparent;
      color: white;
      border: none;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;

      svg {
        font-size: 2rem;
        color: white;
      }

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;

        svg {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default ChatInput;
