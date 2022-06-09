import "./DecoratorHome.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Tiles from "../Tiles";

export default function DecoratorHome() {
  const navigate = useNavigate();
  const [decorators, setDecorators] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const toggleSelection = (item, index) => {
    if (selectedItem) {
      selectedItem.classList.remove("tile-selected");
    }
    const tile = document.querySelector(`#decorator-${index}`);
    setSelectedItem(tile);
    console.log(tile);
    tile.classList.add("tile-selected");

    sessionStorage.setItem("selectedDecorator", item._id);
  };

  const sendDecorator = async () => {
    const decoratorId = sessionStorage.getItem("selectedDecorator");

    if (decoratorId === null) {
      alert("please select item");
    } else {
      const userId = JSON.parse(
        sessionStorage.getItem("userInformation")
      ).user_id;
      Axios.post("http://localhost:5000/invitation/updateMarriageDetails", {
        id: userId,
        decoratorId,
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      sessionStorage.removeItem("selectedDecorator");
      setSelectedItem();
      alert("Decorator added to your dashboard");

      navigate("/explore");
    }
  };

  const fetchDecorators = async () => {
    const userId = JSON.parse(sessionStorage.getItem("userInformation"))._id;

    let decortorDetails = await Axios.get("http://localhost:5000/decorator")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    setDecorators(decortorDetails);
    console.log(decorators);
  };

  useEffect(() => {
    fetchDecorators();
  }, []);

  return (
    <div className="generic-container">
      <h1 style={{ textAlign: "center" }} className="blue-text">
        Decorators
      </h1>
      <div className="flex-container decorator-container">
        {decorators &&
          decorators.map((item, index) => {
            return (
              <div
                id={`decorator-${index}`}
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
        <button className="blue generic-button" onClick={sendDecorator}>
          Save
        </button>
      </div>
    </div>
  );
}
