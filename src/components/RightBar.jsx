import "./RightBar.css";

export default function RightBar() {
  return (
    <div className="photo">
      <div className="image-background">
        <img src={process.env.PUBLIC_URL + "/images/bro.png"} alt="photo" />
      </div>
    </div>
  );
}
