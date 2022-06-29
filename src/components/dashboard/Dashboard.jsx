import { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Tiles from "../Tiles";

export default function Dashboard() {
  // const [allDetails, setAllDetails] = useState();
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState();
  const [template, setTemplate] = useState();
  const [decorator, setDecorator] = useState();
  const [cosmetologist, setCosmetologist] = useState();
  const [venue, setVenue] = useState();
  const [photographer, setPhotographer] = useState();
  const [videographer, setVideographer] = useState();
  const [travelAgency, setTravelAgency] = useState();
  // console.log(sessionStorage.getItem("userInformation"));
  const userInformation = JSON.parse(sessionStorage.getItem("userInformation"));
  const { user_id } = userInformation;
  const { firstName, lastName, mobile, email } = userInformation;

  const getTemplate = (templateId) => {
    Axios.get("http://localhost:5000/invitationTemplate/getTemplate", {
      params: { id: templateId },
    })
      .then((response) => {
        console.log("template:", response.data);
        setTemplate(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getDecorator = (decoratorId) => {
    Axios.get("http://localhost:5000/decorator/getDecorator", {
      params: { id: decoratorId },
    })
      .then((response) => {
        // console.log("decorator:", response.data);
        setDecorator(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getCosmetologist = (cosmetologistId) => {
    Axios.get("http://localhost:5000/cosmetologist/getCosmetologist", {
      params: { id: cosmetologistId },
    })
      .then((response) => {
        // console.log("cosmetologist:", response.data);
        setCosmetologist(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getVenue = (resortId) => {
    Axios.get("http://localhost:5000/weddingResorts/getResort", {
      params: { id: resortId },
    })
      .then((response) => {
        // console.log("venue:", response.data);
        setVenue(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getPhotographer = (photographerId) => {
    Axios.get("http://localhost:5000/photographer/getPhotographer", {
      params: { id: photographerId },
    })
      .then((response) => {
        // console.log("photographer:", response.data);
        setPhotographer(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getVideographer = (videographerId) => {
    Axios.get("http://localhost:5000/videographer/getVideographer", {
      params: { id: videographerId },
    })
      .then((response) => {
        // console.log("videographer:", response.data);
        setVideographer(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getTravelAgency = (agencyId) => {
    Axios.get("http://localhost:5000/travelAgency/getTravelAgency", {
      params: { id: agencyId },
    })
      .then((response) => {
        // console.log("TravelAgency:", response.data);
        setTravelAgency(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getEachInfo = (received) => {
    console.log("received:", received);
    const {
      invitationTemplate: templateId,
      decorator: decoratorId,
      cosmetologist: cosmetologistId,
      weddingResort: resortId,
      photographer: photographerId,
      videographer: videographerId,
      travelAgency: agencyId,
    } = received;

    console.log(templateId, " ", cosmetologistId);

    templateId ? getTemplate(templateId) : setTemplate(null);
    decoratorId ? getDecorator(decoratorId) : setDecorator(null);
    cosmetologistId
      ? getCosmetologist(cosmetologistId)
      : setCosmetologist(null);
    resortId ? getVenue(resortId) : setVenue(null);
    photographerId ? getPhotographer(photographerId) : setPhotographer(null);
    videographerId ? getVideographer(videographerId) : setPhotographer(null);
    agencyId ? getTravelAgency(agencyId) : setTravelAgency(null);
  };

  const getAllDetails = async () => {
    let receivedData = await Axios.get(
      "http://localhost:5000/invitation/getAllMarriageDetails",
      {
        params: {
          id: user_id,
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        setCardDetails(response.data.cardDetails);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });

    getEachInfo(receivedData);
  };

  useEffect(() => {
    getAllDetails();
  }, []);

  return (
    <div className="dashboard-container ">
      <div className="left-container">
        <div>
          <h1 style={{ margin: "15px" }}>User Information</h1>
          <span className="detail">Name:</span> {firstName} {lastName}
          <br></br>
          <span className="detail">Email:</span>
          {email}
          <br></br>
          <span className="detail">Mobile:</span> {mobile}
          {/* <br></br>
        <span className="detail">Pincode:</span>
        {pincode}
        <br></br>
        <span className="detail">Address:</span>
        {address} */}
        </div>

        <Link to="/updateInfo">
          <button className="button">Update</button>
        </Link>
      </div>

      {/* {cardDetails && (
        <div id="cardDetails">
          <span className="detail">Groom:</span> {cardDetails.groomName}
          <br></br>
          <span className="detail">Bride:</span>
          {cardDetails.brideName}
          <br></br>
          {cardDetails.startDate && cardDetails.endDate ? (
            <p>
              {" "}
              <span className="detail">Date:</span> {cardDetails.startDate} -{" "}
              {cardDetails.endDate}{" "}
            </p>
          ) : (
            <p>
              <span className="detail">Date:</span>
              {cardDetails.eventDate})
            </p>
          )}
        </div>
      )} */}

      <div className="right-container">
        <h1 style={{ textAlign: "center" }}>Arrangements</h1>

        <div className="arrangement-container flex-container">
          {template ? (
            <Tiles data={template} title="Template" />
          ) : (
            <button
              className="blue generic-button"
              onClick={() => {
                navigate("/invitationTemplates");
              }}
            >
              Book decorator
            </button>
          )}

          {venue ? (
            <Tiles data={venue} title="Venue" />
          ) : (
            <button
              className="blue generic-button"
              onClick={() => {
                navigate("/weddingResorts");
              }}
            >
              Book Venue
            </button>
          )}

          {decorator ? (
            <Tiles data={decorator} title="Decorator" />
          ) : (
            <button
              className="blue generic-button"
              onClick={() => {
                navigate("/decorators");
              }}
            >
              Book decorator
            </button>
          )}

          {cosmetologist ? (
            <Tiles data={cosmetologist} title="Cosmetologist" />
          ) : (
            <button
              className="blue generic-button"
              onClick={() => {
                navigate("/cosmetologist");
              }}
            >
              Book cosmetologist
            </button>
          )}

          {photographer ? (
            <Tiles data={photographer} title="Photographer" />
          ) : (
            <button
              className="blue generic-button"
              onClick={() => {
                navigate("/photoVideoHome");
              }}
            >
              Book photographer
            </button>
          )}

          {travelAgency ? (
            <Tiles data={travelAgency} title="Travel Agency" />
          ) : (
            <button
              className="blue generic-button"
              onClick={() => {
                navigate("/travelAgency");
              }}
            >
              Book travelAgency
            </button>
          )}

          {videographer ? (
            <Tiles data={videographer} title="Videographer" />
          ) : (
            <button
              className="blue generic-button"
              onClick={() => {
                navigate("/photoVideoHome");
              }}
            >
              Book Videographer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
