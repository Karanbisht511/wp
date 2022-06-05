import "./Box.css";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { useNavigate } from "react-router-dom";

export default function Box({ title, content, path, className }) {
  const userInfo = JSON.parse(sessionStorage.getItem("userInformation"));
  // console.log(userInfo);
  const navigate = useNavigate();

  const handleClick = (path) => {
    console.log("hello");
    if (userInfo) {
      // console.log(userInfo);
      navigate(path);
    } else {
      console.log("alert");
      window.alert("Please login first");
    }
  };

  return (
    <>
      <div
        className={`box container flex-container ${className}`}
        onClick={() => {
          handleClick(path);
        }}
      >
        <BubbleChartIcon fontSize="large" />
        <div>
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
}

export function SmallBox({ title }) {
  return (
    <>
      <div className="smallBox container">{title}</div>
    </>
  );
}
