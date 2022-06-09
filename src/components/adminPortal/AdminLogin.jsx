import React, { useEffect } from "react";
import "./AdminHome.css";
import { useForm } from "react-hook-form";

import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const receivedData = await Axios.get("http://localhost:5000/admin/login", {
      params: {
        username: data.username,
        password: data.password,
      },
    })
      .then((response) => {
        console.log(response);
        // console.log("response:", response);

        return response.data;
      })
      .catch((error) => {
        console.log("error:", error);
      });

    console.log("receivedData:", receivedData);

    if (receivedData === "login failed") {
      window.alert("login failed");
    } else {
      //   addHeaderAndFooter();
      //   window.location.assign("http://localhost:4001/");
      navigate(`/admin`);
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
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="login-input-box"
            type="text"
            placeholder="Username..."
            {...register("username", { required: true })}
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
          <input className="login-signin-button" type="submit" value="Signin" />
        </form>
      </div>
    </div>
  );
}
