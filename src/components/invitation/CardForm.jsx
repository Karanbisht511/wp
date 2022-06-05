import { useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Switch from "@mui/material/Switch";

export default function CardForm() {
  const [showMultipleDates, setShowMultiples] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const userId = JSON.parse(
      sessionStorage.getItem("userInformation")
    ).user_id;

    const receivedData = await Axios.post(
      "http://localhost:5000/invitation/setTemplateCardDetails",
      {
        id: userId,
        data,
      }
    )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  return (
    <div className="sub-container">
      <div>
        <h3>Card Details</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="small-flex-container">
          <div className="elements">
            <label>Groom's Name</label>
            <input
              className="input-box"
              style={{ display: "block" }}
              type="text"
              placeholder="Type Name"
              {...register("groomName", { required: true })}
            />
            {errors?.groomName?.type === "required" && (
              <p>this field is required</p>
            )}
          </div>
          <div className="elements">
            <label>Bride's Name</label>
            <input
              className="input-box"
              style={{ display: "block" }}
              type="text"
              placeholder="Type Name"
              {...register("brideName", { required: true })}
            />
            {errors?.brideName?.type === "required" && (
              <p>this field is required</p>
            )}
          </div>
        </div>

        <div className="small-flex-container">
          <div className="elements">
            <label>Venue</label>
            <input
              className="input-box"
              style={{ display: "block" }}
              type="text"
              placeholder="Enter venue"
              {...register("venue", { required: true })}
            />
          </div>
          <div className="elements">
            <label>Pincode</label>
            <input
              className="input-box"
              style={{ display: "block" }}
              type="text"
              placeholder="Pin"
              {...register("pincode", { required: true })}
            />
            {errors?.pincode?.type === "required" && (
              <p>this field is required</p>
            )}
          </div>
        </div>

        <div>Full Address</div>
        <div>
          <textarea
            className="input-box"
            rows="3"
            cols="40"
            type="text"
            placeholder="Type address..."
            {...register("address", { required: true })}
          />
        </div>

        <div className="date">
          <h3>Date</h3>
        </div>
        <div>
          Multiple Dates{" "}
          <Switch
            onChange={() => {
              setShowMultiples(!showMultipleDates);
            }}
            defaultChecked
          />
        </div>
        <div className="elements">
          {showMultipleDates ? (
            <>
              <span className="bold">
                {" "}
                <b>From</b>{" "}
              </span>
              <input
                className="input-box"
                type="date"
                {...register("startDate", { required: true })}
              />
              {errors?.startDate?.type === "required" && (
                <p>this field is required</p>
              )}
              <span className="bold">
                {" "}
                <b>To</b>{" "}
              </span>
              <input
                className="input-box"
                type="date"
                {...register("endDate", { required: true })}
              />
              {errors?.endDate?.type === "required" && (
                <p>this field is required</p>
              )}
            </>
          ) : (
            <>
              <span className="bold">
                <b>Event Date</b>
              </span>
              <input
                className="input-box"
                type="date"
                {...register("eventDate", { required: true })}
              />
              {errors?.eventDate?.type === "required" && (
                <p>this field is required</p>
              )}
            </>
          )}
        </div>
        <div>Enter Additional Details to add(if any)</div>
        <div className="elements">
          <textarea
            className="input-box"
            rows="3"
            cols="40"
            type="text"
            placeholder="Type"
            {...register("additionalInformation")}
          />
        </div>
        <button type="submit" className="blue cardForm-button">
          Save
        </button>
        <button className="cardForm-button">Cancel</button>
      </form>
    </div>
  );
}
