import React, { useState, useEffect } from "react";
import "./SignupForm.css";
import { useForm } from "react-hook-form";

import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [changePadding, setChangePadding] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.confirmPassword !== data.password) {
      alert("password,confirm password should match\n then save again");
    } else {
      const receivedData = await Axios.post("http://localhost:5000/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        pincode: data.pincode,
        email: data.email,
        password: data.password,
      })
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.log("error:", error);
        });
      console.log("receivedData:", receivedData);
      console.log(data);
      addHeaderAndFooter();
      window.location.assign("http://localhost:4000/");
      // navigate("/");
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
      <div
        style={
          changePadding ? { paddingTop: "200px" } : { paddingTop: "400px" }
        }
        className="signup-form signup-leftPart"
      >
        <h1>Register Yourself</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="login-input-box"
            type="text"
            placeholder="FirstName"
            {...register("firstName", { required: true })}
          />
          {errors?.firstName?.type === "required" && (
            <p>this field is required</p>
          )}
          <input
            className="login-input-box"
            type="text"
            placeholder="LastName"
            {...register("lastName", { required: true })}
          />
          {errors?.lastName?.type === "required" && (
            <p>this field is required</p>
          )}
          <br></br>
          <input
            className="login-input-box"
            type="email"
            placeholder="E-mail"
            {...register("email")}
          />
          {errors?.email?.type === "required" && <p>this field is required</p>}

          <input
            className="login-input-box"
            type="number"
            placeholder="Mobile"
            {...register("mobile", {
              required: true,
              valueAsNumber: true,
              minLength: 10,
              maxLength: 10,
            })}
          />
          {errors?.mobile?.type === "required" && <p>this field is required</p>}
          {(errors?.mobile?.type === "minLength" ||
            errors?.mobile?.type === "maxLength") && (
            <p>mobile number should be of 10 digits</p>
          )}

          <br></br>
          <input
            className="login-input-box"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors?.password?.type === "required" && (
            <p>this field is required</p>
          )}

          <input
            className="login-input-box"
            id="confirm-password"
            type="password"
            placeholder="confirm-Password"
            {...register("confirmPassword")}
          />
          {errors?.confirmPassword?.type === "required" && (
            <p>this field is required</p>
          )}
          <br></br>

          <input
            className="login-signin-button"
            type="submit"
            value="Save"
            onClick={() => {
              setChangePadding(true);
            }}
          />
        </form>
      </div>

      <div className="login-rightPart">
        <h1>Already Registered?</h1>
        <p>Log-in Here</p>
        <Link to="/login">
          <input className="login-signin-button" type="button" value="Login" />
        </Link>
      </div>
    </div>
  );
}
