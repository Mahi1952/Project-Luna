import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../asssets/logo.svg";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRouters";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("invalidation", registerRoute);
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      console.log(data);
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
      toast("Username is required", toastEmitter);
      return false;
    } else if (username.length < 3) {
      toast("Username is too short", toastEmitter);
      return false;
    } else if (username.length > 20) {
      toast("Username is too long", toastEmitter);
      return false;
    } else if (email === "") {
      toast("Email is required", toastEmitter);
      return false;
    } else if (password === "") {
      toast("Password is required", toastEmitter);
      return false;
    } else if (confirmPassword === "") {
      toast("Confirm Password is required", toastEmitter);
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
            Already have an account? <Link to="/login">Login</Link>
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
