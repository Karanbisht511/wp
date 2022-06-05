import "./Invitation.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Templates() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const toggleSelection = (item, index) => {
    if (selectedItem) {
      selectedItem.classList.remove("tile-selected");
    }
    const tile = document.querySelector(`#template-${index}`);
    setSelectedItem(tile);
    console.log(tile);
    tile.classList.add("tile-selected");

    sessionStorage.setItem("selectedTemplate", item._id);
  };

  const sendTemplate = async () => {
    const templateId = sessionStorage.getItem("selectedTemplate");

    if (templateId === null) {
      alert("please select item");
    } else {
      const userId = JSON.parse(
        sessionStorage.getItem("userInformation")
      ).user_id;
      Axios.post("http://localhost:5000/invitation/updateMarriageDetails", {
        id: userId,
        templateId,
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      sessionStorage.removeItem("selectedTemplate");
      setSelectedItem();
      alert("Template added to your dashboard");

      navigate("/invitationTemplates");
    }
  };

  const fetchTemplates = async () => {
    // const userId = JSON.parse(sessionStorage.getItem("userInformation"))._id;

    let decortorDetails = await Axios.get(
      "http://localhost:5000/invitationTemplate"
    )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    setTemplates(decortorDetails);
    console.log(templates);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Templates</h1>
      <div className="flex-container generic-container">
        {templates &&
          templates.map((item, index) => {
            return (
              <div
                id={`template-${index}`}
                className="tile flex-container"
                onClick={() => {
                  toggleSelection(item, index);
                }}
              >
                <div className="attributes">
                  <p>Name:</p>
                  <p>Description:</p>
                  <p>Price:</p>
                </div>
                <div className="values">
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                  <p>{item.price}</p>
                </div>
              </div>
            );
          })}
      </div>
      <button className="blue generic-button" onClick={sendTemplate}>
        Save
      </button>
    </div>
  );
}
