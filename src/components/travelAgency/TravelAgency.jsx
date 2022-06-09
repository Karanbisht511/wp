import "./TravelAgency.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Tiles from "../Tiles";

export default function TravelAgency() {
  const navigate = useNavigate();
  const [travelAgencys, setTravelAgencys] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const toggleSelection = (item, index) => {
    if (selectedItem) {
      selectedItem.classList.remove("tile-selected");
    }
    const tile = document.querySelector(`#travelAgency-${index}`);
    setSelectedItem(tile);
    console.log(tile);
    tile.classList.add("tile-selected");

    sessionStorage.setItem("selectedTravelAgency", item._id);
  };

  const sendTravelAgency = async () => {
    const travelAgencyId = sessionStorage.getItem("selectedTravelAgency");

    if (travelAgencyId === null) {
      alert("please select item");
    } else {
      const userId = JSON.parse(
        sessionStorage.getItem("userInformation")
      ).user_id;
      Axios.post("http://localhost:5000/invitation/updateMarriageDetails", {
        id: userId,
        travelAgencyId,
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      sessionStorage.removeItem("selectedTravelAgency");
      setSelectedItem();
      alert("TravelAgency added to your dashboard");

      navigate("/explore");
    }
  };

  const fetchTravelAgencys = async () => {
    // const userId = JSON.parse(sessionStorage.getItem("userInformation"))._id;

    let decortorDetails = await Axios.get("http://localhost:5000/travelAgency")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    setTravelAgencys(decortorDetails);
    console.log(travelAgencys);
  };

  useEffect(() => {
    fetchTravelAgencys();
  }, []);

  return (
    <div className="generic-container">
      <h1 style={{ textAlign: "center" }} className="blue-text">
        TravelAgencys
      </h1>
      <div className="flex-container agency-container">
        {travelAgencys &&
          travelAgencys.map((item, index) => {
            return (
              <div
                id={`travelAgency-${index}`}
                className="tile flex-container"
                onClick={() => {
                  toggleSelection(item, index);
                }}
              >
                <Tiles data={item} />
              </div>
            );
          })}
      </div>
      <div style={{ textAlign: "center" }}>
        <button className="blue generic-button" onClick={sendTravelAgency}>
          Save
        </button>
      </div>
    </div>
  );
}
