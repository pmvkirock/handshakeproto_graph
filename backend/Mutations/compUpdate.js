const Comp_Profile = require("../Models/CompProfileModel");

const login = async (args) => {
  Comp_Profile.findOne({ _id: args._id }, (error, user) => {
    if (error) {
      return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    } else {
      user.cname = args.cname;
      user.location = args.location;
      user.desc = args.desc;
      user.type = args.type;
      user.noofemp = args.noofemp;
      user.website = args.website;
      user.email = args.email;
      user.owner_ship = args.owner_ship;
      user.save();
      return { status: 200, message: "UPDATED" };
    }
  });
};

exports.compUpdate = login;
