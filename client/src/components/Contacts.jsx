import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import UserInfo from "./UserInfo";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentSelectedChat, setCurrentSelectedChat] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser && currentUser.username && currentUser.avatarImage) {
      setIsLoading(false);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelectedChat(index);
    changeChat(contact);
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
        <div className="loggeduser">
          <UserInfo currentUser={currentUser} />
        </div>
      </Container>
    );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 65% 25%;
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

  .logged-user {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    cursor: pointer;
  }
`;

export default Contacts;
