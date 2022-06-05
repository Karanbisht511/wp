import CardForm from "./CardForm";
import SetTemplate from "./SetTemplate";
import "./Invitation.css";

export default function InvitationHome() {
  return (
    <div className="invitation-home-container">
      <CardForm />
      {console.log(JSON.parse(sessionStorage.getItem("template")))}
      <SetTemplate />
    </div>
  );
}
