require("dotenv").config();
const bcrypt = require("bcrypt");

const Admin = require("../models/admin");

const { ObjectId } = require("mongodb");
const { hash } = require("bcrypt");

const saltRounds = parseInt(process.env.SALTROUNDS);

exports.Login = async (req, res) => {
  //   console.log(req.query);
  //   const data = req.query;
  const { username, password } = req.query;

  console.log(username + "   " + password);

  console.log(Admin);

  const userId = await Admin.findOne({
    _id: new ObjectId("629b964d8daa76f8f65db471"),
  })
    .then(async (userInfo) => {
      console.log("userInfo:", userInfo);

      const match = await bcrypt.compare(password, userInfo.password);
      console.log(match);
      if (match) {
        console.log("login successfully");
        return userInfo;
      }
      return "login failed";
    })
    .catch((error) => {
      console.log("error:", error);
    });
  console.log(userId);
  if (userId) {
    res.send(userId);
  }
};

exports.Signup = async (req, res) => {
  console.log(req.body);
  const data = req.body;

  const hashedPassword = await bcrypt
    .hash(data.password, saltRounds)
    .then((response) => {
      console.log(response);
      return response;
    });

  const newAdmin = new Admin({
    username: data.username,
    password: hashedPassword,
  });

  console.log(newAdmin);

  //saving new user in user collection
  const responseFromDb = await newAdmin
    .save()
    .then((response) => {
      console.log("data inserted:", response);
      console.log("data inserted:Signup successfully");
      return "data inserted:Signup successfully";
    })
    .catch((error) => {
      console.log("error:", error);
      return "unexpected error!\n Please check backend console.";
    });

  res.send(responseFromDb);
};
