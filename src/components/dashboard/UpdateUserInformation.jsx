import { useForm } from "react-hook-form";
import Axios from "axios";

export default function UpdateUserInformation() {
  console.log(JSON.parse(sessionStorage.getItem("userInformation"))._id);
  const userId = JSON.parse(sessionStorage.getItem("userInformation"))._id;
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    console.log("data:", data);
    const receivedData = await Axios.post(
      "http://localhost:5000/updateUserInfo",
      { userId, ...data }
    )
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log("error:", error.message);
      });
  };
  return (
    <>
      <div>
        <h1>Updation Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input-box"
            type="text"
            placeholder="FirstName"
            {...register("firstName")}
          />

          <input
            className="input-box"
            type="text"
            placeholder="LastName"
            {...register("lastName")}
          />
          <br></br>
          <input
            className="input-box"
            type="number"
            placeholder="Mobile"
            {...register("mobile", {
              valueAsNumber: true,
              minLength: 10,
              maxLength: 10,
            })}
          />
          {(errors?.mobile?.type === "minLength" ||
            errors?.mobile?.type === "maxLength") && (
            <p>mobile number should be of 10 digits</p>
          )}
          <br></br>
          <textarea
            className="input-box"
            placeholder="Address"
            {...register("address")}
          />
          {/* <input
            type="number"
            placeholder="Pin-code"
            {...register("pincode", {
              valueAsNumber: true,
              minLength: 6,
              maxLength: 6,
            })}
          />

          {(errors?.pincode?.type === "minLength" ||
            errors?.pincode?.type === "maxLength") && (
            <>pincode should be of 6 digits</>
          )} */}
          <br></br>
          <input
            className="input-box"
            type="email"
            placeholder="E-mail"
            {...register("email")}
          />
          <br></br>
          <input
            className="input-box"
            type="password"
            placeholder="current Password"
            {...register("currentPassword", { required: true })}
          />
          {errors?.oldPassword?.type === "required" && (
            <p>this field is required</p>
          )}
          <br></br>
          <input
            className="input-box"
            type="password"
            placeholder="Password"
            {...register("newPassword")}
          />
          <br></br>
          <input
            className="input-box"
            id="confirm-password"
            type="password"
            placeholder="confirm Password"
            {...register("confirmNewPassword")}
          />

          <br></br>
          <input className="blue generic-button" type="submit" value="Save" />
        </form>
      </div>
    </>
  );
}
