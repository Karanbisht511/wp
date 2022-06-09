import "./Cosmetologist.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Tiles from "../Tiles";

export default function Cosmetologist() {
  const navigate = useNavigate();
  const [cosmetologists, setCosmetologists] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const toggleSelection = (item, index) => {
    if (selectedItem) {
      selectedItem.classList.remove("tile-selected");
    }
    const tile = document.querySelector(`#cosmetologist-${index}`);
    setSelectedItem(tile);
    console.log(tile);
    tile.classList.add("tile-selected");

    sessionStorage.setItem("selectedCosmetologist", item._id);
  };

  const sendCosmetologist = async () => {
    const cosmetologistId = sessionStorage.getItem("selectedCosmetologist");

    if (cosmetologistId === null) {
      alert("please select item");
    } else {
      const userId = JSON.parse(
        sessionStorage.getItem("userInformation")
      ).user_id;
      Axios.post("http://localhost:5000/invitation/updateMarriageDetails", {
        id: userId,
        cosmetologistId,
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      sessionStorage.removeItem("selectedCosmetologist");
      setSelectedItem();
      alert("Cosmetologist added to your dashboard");
      navigate("/explore");
    }
  };

  const fetchCosmetologists = async () => {
    const userId = JSON.parse(sessionStorage.getItem("userInformation"))._id;

    let decortorDetails = await Axios.get("http://localhost:5000/cosmetologist")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    setCosmetologists(decortorDetails);
    console.log(cosmetologists);
  };

  useEffect(() => {
    fetchCosmetologists();
  }, []);

  return (
    <div className="generic-container">
      <h1 style={{ textAlign: "center" }} className="blue-text">
        Cosmetologists
      </h1>
      <div className="flex-container cosmetologist-container">
        {cosmetologists &&
          cosmetologists.map((item, index) => {
            return (
              <div
                id={`cosmetologist-${index}`}
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
        <button className="blue generic-button" onClick={sendCosmetologist}>
          Save
        </button>
      </div>
    </div>
  );
}
