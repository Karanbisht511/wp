// ****NOTE****
// Use redux global state of useinfo to show additional nav items

import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export const addActiveLinkClass = (e) => {
  const nav = document.querySelector(".nav");
  const links = nav.childNodes;
  links.forEach((link) => {
    link.classList.remove("active-link");
  });
  // console.log(e.target.id);
  const id = e.target.id;
  const currentLink = document.querySelector(`#${id}`);
  currentLink.classList.add("active-link");
};

export default function Nav() {
  const port = process.env.REACT_APP_PORT;
  return (
    <nav className="nav flex-container header-element">
      <Link
        to="/"
        id="Home-link"
        className="nav-element active-link"
        onClick={addActiveLinkClass}
      >
        Home
      </Link>
      <Link
        to="/explore"
        // href="#Explore"
        id="Explore-link"
        className="nav-element"
        onClick={addActiveLinkClass}
      >
        Explore Features
      </Link>
      {sessionStorage.getItem("userInformation") ? (
        <>
          <Link
            to="/dashboard"
            // href="#Explore"
            id="dashboard-link"
            className="nav-element"
            onClick={addActiveLinkClass}
          >
            Dashboard
          </Link>
          <Link
            to="/logout"
            // href="#Explore"
            id="logout-link"
            className="nav-element"
            onClick={() => {
              sessionStorage.clear();
              window.location.href = `http://localhost:${port}`;
            }}
          >
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/aboutUs"
            // href="#AboutUs"
            id="AboutUs-link"
            className="nav-element"
            onClick={addActiveLinkClass}
          >
            About Us
          </Link>
          <Link
            to="/login"
            id="login"
            className="nav-element"
            onClick={addActiveLinkClass}
          >
            Login
          </Link>
        </>
      )}
    </nav>
  );
}
