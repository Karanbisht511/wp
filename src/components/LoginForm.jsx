import React, { useEffect } from "react";
import "./LoginForm.css";
import { useForm } from "react-hook-form";

import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const port = process.env.REACT_APP_PORT;
  // console.log(process.env.REACT_APP_PORT);
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const receivedData = await Axios.get("http://localhost:5000/login", {
      params: {
        email: data.email,
        password: data.password,
      },
    })
      .then((response) => {
        console.log(response);
        // console.log("response:", response);

        return response.data;
      })
      .catch((error) => {
        console.log("error:", error.message);
      });

    console.log("receivedData:", receivedData);

    if (!receivedData || receivedData === "login failed") {
      window.alert("login failed");
    } else {
      sessionStorage.setItem("userInformation", JSON.stringify(receivedData));
      addHeaderAndFooter();
      window.location.assign(`http://localhost:${port}/`);
      // navigate(`/`);
    }
  };

  const addHeaderAndFooter = () => {
    const footer = document.querySelector("#footer");
    const header = document.querySelector("#header");
    console.log(footer);
    console.log(header);
    if (footer.style.display === "none") footer.style.display = "block";
    if (header.style.display === "none") header.style.display = "block";
  };

  const removeHeaderAndFooter = () => {
    const footer = document.querySelector("#footer");
    const header = document.querySelector("#header");
    footer.style.display = "none";
    header.style.display = "none";
  };

  useEffect(removeHeaderAndFooter, []);

  return (
    <div className="login-container">
      <div className="login-form login-leftPart">
        <h1>Login To Your Account</h1>
        {/* <p> Login using social networks</p>
        <div className="social-media-login">

        </div> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="login-input-box"
            type="email"
            placeholder="E-mail"
            {...register("email", { required: true })}
          />
          <br></br>
          <input
            className="login-input-box"
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
          />
          <br></br>
          <a href="#">forgot password?</a>
          <br></br>

          <input className="login-signin-button" type="submit" value="Signin" />
        </form>
        <Link to="/admin-login">
          {" "}
          <button className="blue generic-button admin-login-button">
            {" "}
            Admin portal
          </button>
        </Link>
      </div>
      <div className="login-rightPart">
        <h1>New Here?</h1>
        <h2>Signup here</h2>
        <Link to="/signup">
          <input className="login-signin-button" type="button" value="Signup" />
        </Link>
      </div>
    </div>
  );
}
