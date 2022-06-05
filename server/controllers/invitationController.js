const Async = require("async");

const invitationTemplate = require("../models/invitationTemplate");
const user = require("../models/user");
const marriageDetails = require("../models/marriageDetails");
// const marriageDetailController = require("./marriageEventDetailsController");

const { ObjectId } = require("mongodb");

exports.getAllInvitationTemplatesAndRelativesSaved = async (req, res) => {
  const userId = req.query.id;
  // console.log("userId:", userId);
  const finalResult = await Async.parallel([
    function (callback) {
      invitationTemplate
        .find()
        .then((result) => {
          callback(null, result);
        })
        .catch((err) => {
          console.log("error in invitation template:", err);
        });
    },
    function (callback) {
      console.log("userId:", userId);
      marriageDetails
        .find({ user_id: userId })
        .then((result) => {
          callback(null, result);
        })
        .catch((err) => {
          console.log("error in user:", err);
        });
    },
  ])
    .then((results) => {
      console.log("results:", results);
      return results;
    })
    .catch((err) => {
      console.log(err);
    });
  res.send(finalResult);
};

exports.saveInvitationTemplateAndRelatives = (req, res) => {
  const data = req.body;
  console.log(
    "InvitaionTemplate id and relatives details from frontend:",
    data
  );

  const newMarriageDetails = new marriageDetails(data);
  newMarriageDetails
    .save()
    .then((response) => {
      console.log("data inserted:", response);
    })
    .catch((error) => {
      console.log(error);
    });
  // }
  res.send(`pahunch gayi information:`);
};

// module.exports.updateMarriageDetails = updateMarriageDetails;
// module.exports.getGuestList = getGuestList;
// module.exports.setTemplateCardDetails = setTemplateCardDetails;
// module.exports.setGuests = setGuests;
// module.exports.deleteRelative = deleteRelative;

// module.exports.marriageDetailController;
// const {
//   updateMarriageDetails,
//   getGuestList,
//   setTemplateCardDetails,
//   setGuests,
//   deleteRelative,
// } = marriageDetailController;

// = (req, res) => {
//   const userId = req.query.id;
//   const updates = req.body;
//   // console.log("userId:", userId);
//   console.log(
//     "InvitaionTemplate id and relatives details from frontend:",
//     updates
//   );

//   marriageDetails
//     .updateOne({ user_id: userId }, updates)
//     .then((response) => {
//       console.log("data updated:", response);
//     })
//     .catch((error) => {
//       console.log("error", error);
//     });

//   res.send(`marriage details information updated:`);
// };
