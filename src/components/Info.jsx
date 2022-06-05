import "./Info.css";
import ring from "./ring.svg";

export default function Info() {
  return (
    <div className="info">
      <img className="ring" src={ring} />
      <div className="large-text info-element">Wedding Planner</div>
      <p className="info-element">
        We help you create your wedding invitation cards and plan your wedding
        arrangements.
      </p>
      <button className="contact-button info-element">
        {" "}
        <a href="#footer">Contact Us</a>{" "}
      </button>
    </div>
  );
}
