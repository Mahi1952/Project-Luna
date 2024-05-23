import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import CreatorInfo from "./CreatorInfo";
import { CSSTransition } from "react-transition-group";
import { FaTimes } from "react-icons/fa";

const UserInfo = ({ currentUser }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
  const [showMahi, setShowMahi] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.username && currentUser.avatarImage) {
      setCurrentUserName(currentUser.username);
      setCurrentUserAvatar(currentUser.avatarImage);
    }
  }, [currentUser]);

  const toggleLogout = () => {
    setShowLogout(!showLogout);
    setShowMahi(!showMahi);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {currentUser && (
        <Container>
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
            <div className="mahi" onClick={toggleModal}>
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

          {showModal && (
            <Modal>
              <div className="modal-content">
                <button className="close-button" onClick={toggleModal}>
                  <FaTimes />
                </button>
                <CreatorInfo />
              </div>
            </Modal>
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 60% 40%;
  height: 100%;

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
    cursor: pointer;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);

  .modal-content {
    background: #131324;
    padding: 2rem;
    position: relative;
    border-radius: 10px;
    text-align: center;
    color: white;

    .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;

      &:hover {
        color: #f00;
      }
    }
  }
`;

export default UserInfo;
