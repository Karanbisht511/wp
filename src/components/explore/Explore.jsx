import "./Explore.css";
import Box from "../Box";

export default function Explore() {
  return (
    <div id="Features" className="explore-wrapper">
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          marginTop: "15px",
          color: "#6361EB",
        }}
      >
        Features
      </h1>
      <div className="flex-container feature-container">
        <Box
          title="Invitation Templates"
          content="Create and manage your own invitation templates. Invite your guests to your event with a single click."
          path="/invitationTemplates"
          className="left"
        />
        <Box
          title="Add Guests"
          content="Add guests to your event with a single click. You can also add guests from your guest list."
          path="/addGuests"
          className="right"
        />
        <Box
          title="Sending invites to relatives"
          content="Send invites to your relatives and friends. You can also send invites to your guests."
          path="/sendInvites"
          className="left"
        />
        <Box
          title="Book Wedding Resorts"
          content="Book your wedding resort with a single click."
          path="/weddingResorts"
          className="right"
        />
        <Box
          title="Book Photographer/Videographer"
          content="Book your photographer/videographer with a single click."
          path="/photoVideoHome"
          className="left"
        />
        <Box
          title="Book Decorators"
          content="Book decorators with a single click."
          path="/decorators"
          className="right"
        />
        <Box
          title="Book Cosmetologist"
          content="Book your cosmetologist with a single click."
          path="/cosmetologist"
          className="left"
        />
        <Box
          title="Book TravelAgency"
          content="Arrange travelling for wedding with a single click."
          path="/travelAgency"
          className="right"
        />
      </div>
    </div>
  );
}
