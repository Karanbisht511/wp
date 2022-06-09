import { useState, useEffect } from "react";
import Axios from "axios";
import "./WeddingResortsHome.css";
import { useNavigate } from "react-router-dom";
import Tiles from "../Tiles";

export default function WeddingResortsHome() {
  const navigate = useNavigate();
  const [weddingResorts, setWeddingResorts] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const toggleSelection = (item, index) => {
    if (selectedItem) {
      selectedItem.classList.remove("tile-selected");
    }
    const tile = document.querySelector(`#resort-${index}`);
    setSelectedItem(tile);
    console.log(tile);
    tile.classList.add("tile-selected");

    sessionStorage.setItem("selectedWeddingResort", item._id);
  };

  const sendWeddingResortId = async () => {
    const resortId = sessionStorage.getItem("selectedWeddingResort");

    if (resortId === null) {
      alert("please select item");
    } else {
      const userId = JSON.parse(
        sessionStorage.getItem("userInformation")
      ).user_id;
      Axios.post("http://localhost:5000/invitation/updateMarriageDetails", {
        id: userId,
        resortId,
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      sessionStorage.removeItem("selectedWeddingResort");
      setSelectedItem();
      alert("venue added to your dashboard");
      navigate("/explore");
    }
  };

  const fetchResorts = async () => {
    let resorts = await Axios.get("http://localhost:5000/weddingResorts")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    setWeddingResorts(resorts);
    console.log(weddingResorts);
  };

  useEffect(() => {
    fetchResorts();
  }, []);

  return (
    <div id="weddingResort" className=" generic-container">
      <h1 style={{ textAlign: "center" }} className="blue-text">
        Wedding Resorts / Venues
      </h1>
      <div className="flex-container wedding-container">
        {weddingResorts &&
          weddingResorts.map((item, index) => {
            return (
              <div
                id={`resort-${index}`}
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
        <button className="blue generic-button" onClick={sendWeddingResortId}>
          Save
        </button>
      </div>
    </div>
  );
}
