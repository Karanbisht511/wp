// Header
// Content->  1->AddInvitationTemplate,Delete,update,showAll
//            2->AddResorts,Delete,update,showAll
//            3->AddPhotographers,Delete,update,showAll
//            4->AddVideographer,Delete,update,showAll
//            5->AddDecorators,Delete,update,showAll
// Footer
import { useState, useEffect } from "react";

import Axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { useForm } from "react-hook-form";

import "./AdminHome.css";

export default function AdminHome() {
  const [showAddNew, setShowAddNew] = useState(false);

  // const navigate = useNavigate();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };

  const addHeaderAndFooter = () => {
    const footer = document.querySelector("#footer");
    const header = document.querySelector("#header");
    console.log(footer);
    console.log(header);
    if (footer.style.display === "none") footer.style.display = "block";
    if (header.style.display === "none") header.style.display = "block";
  };

  const removeHeaderAndFooter = () => {
    const footer = document.querySelector("#footer");
    const header = document.querySelector("#header");
    footer.style.display = "none";
    header.style.display = "none";
  };

  useEffect(removeHeaderAndFooter, []);

  const [selected, setSelected] = useState();

  const toggleBlueBg = (e) => {
    const blueBg = e.target;
    if (selected) {
      selected.classList.remove("blue-bg");
    }
    setSelected(blueBg);
    blueBg.classList.add("blue-bg");
  };

  const [data, setData] = useState();
  const [addButton, setAddButton] = useState();
  // const [venues, setVenues] = useState();
  // const [photographers, setPhotographers] = useState();

  const fetchAllData = (path) => {
    setAddButton(path);
    Axios.get(`http://localhost:5000/${path}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const fetchAllVenues = () => {
  //   Axios.get("http://localhost:5000/weddingResorts")
  //     .then((response) => {
  //       console.log(response);
  //       setVenues(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const fetchAllVideographers = () => {};
  const fetchAllPhotographers = () => {};
  const fetchAllTemplates = () => {};
  const fetchAllTravelAgencies = () => {};
  const fetchAllDecorators = () => {};

  return (
    <div id="admin" className="admin-home-container">
      <h1>Adminpage</h1>
      <div className="flex-container admin-content-container">
        <div id="categories">
          <h2> categories</h2>
          <div className="categories">
            <div
              className="category"
              onClick={(e) => {
                toggleBlueBg(e);
                fetchAllData("weddingResorts");
              }}
            >
              Venues
            </div>
            <div
              className="category"
              onClick={(e) => {
                toggleBlueBg(e);
                fetchAllData("photographer");
              }}
            >
              Photographer
            </div>
            <div
              className="category"
              onClick={(e) => {
                toggleBlueBg(e);
                fetchAllData("videographer");
              }}
            >
              Videographer
            </div>
            <div
              className="category"
              onClick={(e) => {
                toggleBlueBg(e);
                fetchAllData("cosmetologist");
              }}
            >
              Cosmetologist
            </div>
            <div
              className="category"
              onClick={(e) => {
                toggleBlueBg(e);
                fetchAllData("decorator");
              }}
            >
              Decorator
            </div>
            <div
              className="category"
              onClick={(e) => {
                toggleBlueBg(e);
                fetchAllData("travelAgency");
              }}
            >
              Travel Agency
            </div>
            <div
              className="category"
              onClick={(e) => {
                toggleBlueBg(e);
                fetchAllData("invitationTemplate");
              }}
            >
              Card Templates
            </div>
          </div>
        </div>
        <div id="information">
          <div className="headers">
            <div
              style={{ width: "200px", border: "1px solid grey" }}
              className="button2"
            >
              <SearchIcon />
              <input
                style={{ border: "1px solid white" }}
                type="text"
                placeholder="Search..."
              />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <table>
              {data && (
                <tr>
                  <th>SNo.</th>
                  {Object.keys(data[0]).map((key) => {
                    if (key !== "__v" && key !== "_id" && key !== "image")
                      return <th>{key.toUpperCase()}</th>;
                  })}
                  <th>ACTION</th>
                </tr>
              )}

              {data &&
                data.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      {Object.entries(item).map(([key, value]) => {
                        if (key !== "__v" && key !== "_id" && key !== "image") {
                          return <td>{value}</td>;
                        }
                      })}
                      <td className="flex-container">
                        <ModeEditOutlineIcon sx={{ color: "blue" }} />
                        <DeleteIcon
                          onClick={() => {
                            // deleteRelative(guest);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}

              {showAddNew ? (
                <tr>
                  <td>{data.length + 1}</td>
                  {/* <td>
                    <input
                      className="input-box"
                      type="text"
                      placeholder="Name..."
                      {...register("name", { required: true })}
                    />
                  </td> */}

                  {Object.keys(data[0]).map((key) => {
                    if (key !== "__v" && key !== "_id" && key !== "image")
                      return (
                        <td>
                          <input
                            className="input-box"
                            type="text"
                            placeholder={`${key}...`}
                            {...register(`${key}`, { required: true })}
                          />
                        </td>
                      );
                  })}
                  <td>
                    <button type="submit" className="blue button2">
                      add
                    </button>
                  </td>
                </tr>
              ) : null}
            </table>
          </form>

          {addButton && (
            <div
              className="admin-add-button blue"
              onClick={() => {
                setShowAddNew(!showAddNew);
              }}
            >
              <AddIcon />
              <button style={{ border: "none" }} className="blue">
                Add {addButton}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
