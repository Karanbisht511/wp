import Info from "./Info";
import RightBar from "./RightBar";

export default function Welcome() {
  return (
    <div className="intro-content flex-container">
      <Info />
      <RightBar />
    </div>
  );
}
