const Stud_Profile = require("../Models/StudProfileModel");

const login = async (args) => {
  let user = await Stud_Profile.findOne({
    email: args.email,
    password: args.password,
  });
  if (user) {
    return { status: 200, message: user._id.toString() };
  } else {
    return { status: 500, message: "INTERNAL_SERVER_ERROR" };
  }
};

exports.login = login;
