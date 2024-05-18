import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../asssets/logo.svg";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRouters";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (localStorage.getItem(" luna user")) navigate("/");
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) toast(data.message, toastEmitter);
      if (data.status === true) {
        localStorage.setItem(" luna user", JSON.stringify(data.user));
        navigate("/");
      }
    } else {
      console.log("Validation failed");
    }
  };

  const myIcon = () => <span>🤔</span>;
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

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (username === "") {
      toast("Dont you like a cool Username?", toastEmitter);
      return false;
    } else if (username.length < 3) {
      toast("That shot of a Username is not cool", toastEmitter);
      return false;
    } else if (username.length > 20) {
      toast("Hold your horses fam, Username is too long", toastEmitter);
      return false;
    } else if (email === "") {
      toast("Email is required", toastEmitter);
      return false;
    } else if (password === "") {
      toast("Password,PASSWORD is Missing", toastEmitter);
      return false;
    } else if (confirmPassword === "") {
      toast("Seriously, ai'nt you forgetting something?", toastEmitter);
      return false;
    } else if (password.length < 8 || password.length > 30) {
      toast("Password must be 8-30 characters long", toastEmitter);
      return false;
    } else if (confirmPassword !== password) {
      toast("Password not matched", toastEmitter);
      return false;
    } else return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Luna</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button type="submit">Create User</button>
          <span>
            Got an acount? Tap this <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #fff;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: #fff;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      border: none;
      padding: 1rem 2rem;
      border-radius: 0.4rem;
      color: #fff;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      text-transform: uppercase;
      color: #fff;
      gap: 0.5rem;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.25rem;
        margin: 2%;
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export default Register;
