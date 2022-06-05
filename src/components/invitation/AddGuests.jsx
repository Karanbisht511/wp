import { useState, useEffect } from "react";

import Axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { useForm } from "react-hook-form";

export default function AddGuests() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [guestList, setGuestList] = useState();
  const [showAddNew, setShowAddNew] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    const userId = JSON.parse(
      sessionStorage.getItem("userInformation")
    ).user_id;
    Axios.post("http://localhost:5000/invitation/setGuests", {
      userId,
      data,
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const deleteRelative = (guest) => {
    const userId = JSON.parse(
      sessionStorage.getItem("userInformation")
    ).user_id;
    Axios.delete("http://localhost:5000/invitation/deleteGuest", {
      params: { userId, id: guest._id },
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getData = async () => {
    const userId = JSON.parse(
      sessionStorage.getItem("userInformation")
    ).user_id;
    console.log(userId);

    let list = await Axios.get(
      "http://localhost:5000/invitation/getRelatives",
      {
        params: { userId },
      }
    )
      .then((response) => {
        console.log("guest list:", response);
        // setGuestList(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    // console.log(list);
    setGuestList(list);
    console.log(guestList);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="guest-container ">
      <div className="headers">
        <h3>Guest Details</h3>

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
          <tr>
            {/* <th></th> */}
            <th>SNo.</th>
            <th>Guest Name(s)</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Action</th>
          </tr>

          {guestList &&
            guestList.map((guest, index) => {
              return (
                <tr
                  style={
                    index % 2 === 0
                      ? { backgroundColor: "#F8F8F8" }
                      : { backgroundColor: "white" }
                  }
                >
                  {/* <td>
                  <input type="checkbox" />
                </td> */}
                  <td>{index + 1}</td>
                  <td>{guest.name}</td>
                  <td>{guest.address}</td>
                  <td>{guest.pincode}</td>
                  <td>
                    <ModeEditOutlineIcon sx={{ color: "blue" }} />
                    <DeleteIcon
                      onClick={() => {
                        deleteRelative(guest);
                      }}
                    />
                  </td>
                </tr>
              );
            })}

          {showAddNew ? (
            <tr>
              {/* <td>
              <input type="checkbox" />
            </td> */}
              <td>{guestList.length + 1}</td>
              <td>
                <input
                  className="input-box"
                  type="text"
                  placeholder="Name..."
                  {...register("name", { required: true })}
                />
              </td>
              <td>
                <input
                  className="input-box"
                  type="text"
                  placeholder="Address..."
                  {...register("address", { required: true })}
                />
              </td>
              <td>
                <input
                  className="input-box"
                  type="text"
                  placeholder="pincode..."
                  {...register("pincode", { required: true })}
                />
              </td>
              <td>
                <button type="submit" className="blue button2">
                  add
                </button>
              </td>
            </tr>
          ) : null}
        </table>
      </form>

      <div
        className="button2 blue"
        onClick={() => {
          setShowAddNew(!showAddNew);
        }}
      >
        <AddIcon />
        <button style={{ border: "none" }} className="blue">
          Add Guests
        </button>
      </div>
    </div>
  );
}
