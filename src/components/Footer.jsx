import "./Footer.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <div id="footer">
      <div className="flex-container footer-container">
        <div>
          <h2>Contact Us</h2>
          <div className="contactus-detail">
            <LocationOnIcon />{" "}
            <span className="icon-text">
              Simmalchaur, Kotdwara, PauriGarhwal
            </span>
          </div>
          <div className="contactus-detail">
            <LocalPhoneIcon />{" "}
            <span className="icon-text"> +91-958-958-958</span>
          </div>
          <div className="contactus-detail">
            <EmailIcon />
            <span className="icon-text"> wp@company.com</span>
          </div>
        </div>
        <div>
          <h2>Follow Us</h2>
          <div className="followus-detail">
            <FacebookIcon /> <TwitterIcon /> <LinkedInIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
