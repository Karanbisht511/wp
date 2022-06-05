import { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

export default function Dashboard() {
  // const [allDetails, setAllDetails] = useState();
  const navigate = useNavigate();
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
        // console.log("template:", response.data);
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

    getTemplate(templateId);

    getDecorator(decoratorId);
    getCosmetologist(cosmetologistId);
    getVenue(resortId);
    getPhotographer(photographerId);
    getVideographer(videographerId);
    getTravelAgency(agencyId);
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

      <div className="right-container">
        <h1 style={{ textAlign: "center" }}>Arrangements</h1>

        <div className="arrangement-components tile center-div">
          <h2 className="arrangement-head">Template</h2>
          {template ? (
            <div className="flex-container ">
              <div className="attributes">
                <p>Name:</p>
                <p>Description:</p>
                <p>Price:</p>
              </div>
              <div className="values">
                <p>{template.title}</p>
                <p>{template.description}</p>
                <p>{template.price}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/invitationTemplates");
              }}
            >
              setTemplates
            </button>
          )}
        </div>

        <div className="arrangement-container flex-container">
          <div className="arrangement-components tile">
            <h2 className="arrangement-head">Venue</h2>
            {venue ? (
              <div className="flex-container">
                <div className="attributes">
                  <p>Name:</p>
                  <p>Mobile:</p>
                  <p>Address:</p>
                </div>
                <div className="values">
                  <p>{venue.name}</p>
                  <p>{venue.mobile}</p>
                  <p>{venue.address + "," + venue.pincode}</p>
                </div>
              </div>
            ) : (
              <Link to="/weddingResorts">
                <button
                // onClick={() => {
                //   navigate("/weddingResorts");
                // }}
                >
                  Book Venue
                </button>
              </Link>
            )}
          </div>

          <div className="arrangement-components tile">
            <h2 className="arrangement-head">Decorator</h2>
            {decorator ? (
              <div className="flex-container">
                <div className="attributes">
                  <p>Name:</p>
                  <p>Mobile:</p>
                  <p>Address:</p>
                </div>
                <div className="values">
                  <p>{decorator.name}</p>
                  <p>{decorator.mobile}</p>
                  <p>{decorator.address + "," + decorator.pincode}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/decorators");
                }}
              >
                Book decorator
              </button>
            )}
          </div>

          <div className="arrangement-components tile">
            <h2 className="arrangement-head">Cosmetologist</h2>
            {cosmetologist ? (
              <div className="flex-container">
                <div className="attributes">
                  <p>Name:</p>
                  <p>Mobile:</p>
                  <p>Address:</p>
                </div>
                <div className="values">
                  <p>{cosmetologist.name}</p>
                  <p>{cosmetologist.mobile}</p>
                  <p>{cosmetologist.address + "," + cosmetologist.pincode}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/cosmetologist");
                }}
              >
                Book cosmetologist
              </button>
            )}
          </div>

          <div className="arrangement-components tile">
            <h2 className="arrangement-head">Photographer</h2>
            {photographer ? (
              <div className="flex-container">
                <div className="attributes">
                  <p>Name:</p>
                  <p>Mobile:</p>
                  <p>Address:</p>
                </div>
                <div className="values">
                  <p>{photographer.name}</p>
                  <p>{photographer.mobile}</p>
                  <p>{photographer.address + "," + photographer.pincode}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/photoVideoHome");
                }}
              >
                Book photographer
              </button>
            )}
          </div>

          <div className="arrangement-components tile">
            <h2 className="arrangement-head">TravelAgency</h2>
            {travelAgency ? (
              <div className=" flex-container">
                <div className="attributes">
                  <p>Name:</p>
                  <p>Mobile:</p>
                  <p>Address:</p>
                </div>
                <div className="values">
                  <p>{travelAgency.name}</p>
                  <p>{travelAgency.mobile}</p>
                  <p>{travelAgency.address + "," + travelAgency.pincode}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/travelAgency");
                }}
              >
                Book travelAgency
              </button>
            )}
          </div>

          <div className="arrangement-components tile">
            <h2 className="arrangement-head">Videographer</h2>
            {videographer ? (
              <div className=" flex-container">
                <div className="attributes">
                  <p>Name:</p>
                  <p>Mobile:</p>
                  <p>Address:</p>
                </div>
                <div className="values">
                  <p>{videographer.name}</p>
                  <p>{videographer.mobile}</p>
                  <p>{videographer.address + "," + videographer.pincode}</p>
                </div>
              </div>
            ) : (
              <button
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
    </div>
  );
}
