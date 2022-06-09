import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div id="AboutUs">
      <h1
        className="blue-text"
        style={{ textAlign: "center", fontSize: "3rem" }}
      >
        About Us
      </h1>

      <div className="flex-container aboutUs-container">
        <p className="story">
          <p>
            {" "}
            <span className="blue-text" style={{ fontSize: "1.7rem" }}>
              Problem
            </span>
            : Whenever wedding season starts their is abundance of booking
            happens for wedding. As a result it becomes hectic and difficult to
            make arrangements for marriage.
          </p>
          <p>
            {" "}
            <span className="blue-text" style={{ fontSize: "1.7rem" }}>
              Solution
            </span>
            : So to solve this problem our team came up with this idea to take
            it all in internet.
          </p>
        </p>
        <div>
          <img src={process.env.PUBLIC_URL + "/images/Team.webp"} />
        </div>
      </div>
    </div>
  );
}
