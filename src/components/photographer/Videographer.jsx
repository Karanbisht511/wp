import "./Videographer.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Tiles from "../Tiles";

export default function Videographer() {
  const navigate = useNavigate();
  const [videographers, setVideographers] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const toggleSelection = (item, index) => {
    if (selectedItem) {
      selectedItem.classList.remove("tile-selected");
    }
    const tile = document.querySelector(`#videographer-${index}`);
    setSelectedItem(tile);
    console.log(tile);
    tile.classList.add("tile-selected");

    sessionStorage.setItem("selectedVideographer", item._id);
  };

  const sendVideographer = async () => {
    const videographerId = sessionStorage.getItem("selectedVideographer");
    console.log(videographerId);
    if (videographerId === null) {
      alert("please select item");
    } else {
      const userId = JSON.parse(
        sessionStorage.getItem("userInformation")
      ).user_id;
      Axios.post("http://localhost:5000/invitation/updateMarriageDetails", {
        id: userId,
        videographerId,
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      sessionStorage.removeItem("selectedVideographer");
      setSelectedItem();
      alert("Videographer added to your dashboard");
      navigate("/explore");
    }
  };

  const fetchVideographers = async () => {
    let receivedData = await Axios.get("http://localhost:5000/videographer")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    setVideographers(receivedData);
    console.log(videographers);
  };

  useEffect(() => {
    fetchVideographers();
  }, []);

  return (
    <div className="generic-container">
      <h1 style={{ textAlign: "center" }} className="blue-text">
        Videographers
      </h1>
      <div className="flex-container videographer-container">
        {videographers &&
          videographers.map((item, index) => {
            return (
              <div
                id={`videographer-${index}`}
                className="tile"
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
        <button className="blue generic-button" onClick={sendVideographer}>
          Save
        </button>
      </div>
    </div>
  );
}
