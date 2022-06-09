import "./Photographer.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Tiles from "../Tiles";

export default function Photographers() {
  const navigate = useNavigate();
  const [photographers, setPhotographers] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const toggleSelection = (item, index) => {
    if (selectedItem) {
      selectedItem.classList.remove("tile-selected");
    }
    const tile = document.querySelector(`#photographer-${index}`);
    setSelectedItem(tile);
    console.log(tile);
    tile.classList.add("tile-selected");

    sessionStorage.setItem("selectedPhotographer", item._id);
  };

  const sendPhotographer = async () => {
    const photographerId = sessionStorage.getItem("selectedPhotographer");

    if (photographerId === null) {
      alert("please select item");
    } else {
      const userId = JSON.parse(
        sessionStorage.getItem("userInformation")
      ).user_id;
      Axios.post("http://localhost:5000/invitation/updateMarriageDetails", {
        id: userId,
        photographerId,
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      sessionStorage.removeItem("selectedPhotographer");
      setSelectedItem();
      alert("Photographer added to your dashboard");

      navigate("/explore");
    }
  };

  const fetchPhotographers = async () => {
    let receivedData = await Axios.get("http://localhost:5000/photographer")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    setPhotographers(receivedData);
    console.log(photographers);
  };

  useEffect(() => {
    fetchPhotographers();
  }, []);

  return (
    <div className="generic-container">
      <h1 style={{ textAlign: "center" }} className="blue-text">
        Photographers
      </h1>
      <div className="flex-container photographer-container">
        {photographers &&
          photographers.map((item, index) => {
            return (
              <div
                id={`photographer-${index}`}
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
        <button className="blue generic-button" onClick={sendPhotographer}>
          Save
        </button>
      </div>
    </div>
  );
}
