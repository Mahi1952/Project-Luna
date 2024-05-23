import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import Logout from "./Logout";
import { CSSTransition } from "react-transition-group";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
  const [currentSelectedChat, setCurrentSelectedChat] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [showMahi, setShowMahi] = useState(true); // State for Mahi1952 box

  useEffect(() => {
    if (currentUser && currentUser.username && currentUser.avatarImage) {
      setCurrentUserName(currentUser.username);
      setCurrentUserAvatar(currentUser.avatarImage);
      setIsLoading(false);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelectedChat(index);
    changeChat(contact);
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
    setShowMahi(!showMahi); // Toggle Mahi1952 box
  };

  if (!isLoading)
    return (
      <Container>
        <div className="brand">
          <img src={logo} alt="logo" />
          <h3>Luna</h3>
        </div>

        <div className="contacts">
          {contacts.map((contact, index) => (
            <div
              className={`contact ${
                index === currentSelectedChat ? "selected" : ""
              }`}
              key={contact._id}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{contact.username}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="current-user" onClick={toggleLogout}>
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentUserAvatar}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>

        <CSSTransition
          in={showMahi}
          timeout={300}
          classNames="mahi"
          unmountOnExit
        >
          <div className="mahi">
            <h3>by Mahi1952</h3>
          </div>
        </CSSTransition>

        <CSSTransition
          in={showLogout}
          timeout={300}
          classNames="logout"
          unmountOnExit
        >
          <div className="logout">
            <Logout currentUser={currentUser} />
          </div>
        </CSSTransition>
      </Container>
    );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 65% 15% 10%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }

    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    cursor: pointer;

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: white;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;

      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }

  .logout,
  .mahi {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    color: white;
  }

  .logout-enter,
  .mahi-enter {
    max-height: 0;
    opacity: 0;
  }

  .logout-enter-active,
  .mahi-enter-active {
    max-height: 100px; /* Adjust as needed */
    opacity: 1;
  }

  .logout-exit,
  .mahi-exit {
    max-height: 100px; /* Adjust as needed */
    opacity: 1;
  }

  .logout-exit-active,
  .mahi-exit-active {
    max-height: 0;
    opacity: 0;
  }
`;

export default Contacts;
