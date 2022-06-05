import Box, { SmallBox } from "./Box";

import "./Features.css";
import { Link } from "react-router-dom";

export default function Features() {
  return (
    <div id="Features" className="feature-wrapper">
      <span className="circle"></span>
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
        }}
      >
        <span style={{ color: "white", fontWeight: "normal" }}>Explo</span>
        <span style={{ color: "#6361EB" }}>re Features</span>
      </h1>
      <div className="flex-container feature-container">
        <Box
          className="left"
          title="InvitationTemplates"
          content="Create and manage your own invitation templates. Invite your guests to your event with a single click."
          path="/invitationTemplates"
        ></Box>
        <Box
          className="right"
          title="Sending invites to relatives"
          content="Send invites to your relatives and friends. You can also send invites to your guests."
          path="/sendInvites"
        ></Box>
        <Box
          className="left"
          title="Book Wedding Resorts"
          content="Book your wedding resort with a single click."
          path="/weddingResorts"
        ></Box>
        <Link
          to="/explore"
          className="right"
          onClick={() => {
            const nav = document.querySelector(".nav");
            const links = nav.childNodes;
            links.forEach((link) => {
              link.classList.remove("active-link");
            });

            document
              .querySelector("#Explore-link")
              .classList.add("active-link");
          }}
        >
          <SmallBox title="Explore More"></SmallBox>
        </Link>
      </div>
    </div>
  );
}
