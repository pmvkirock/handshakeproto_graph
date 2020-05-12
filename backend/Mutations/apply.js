const Application = require("../Models/ApplicationModel");
const Stud_Profile = require("../Models/StudProfileModel");

apply = async (args) => {
  console.log("Inside book kafka backend");
  let fname = "";
  let lname = "";
  let user = await Stud_Profile.findById(args.idstudent);
  if (user) {
    fname = user.fname;
    lname = user.lname;
  }
  var newappli = new Application({
    idcompany: args.idcompany,
    idstudent: args.idstudent,
    idjob: args.idjob,
    fname: fname,
    lname: lname,
  });
  var res = await newappli.save();
  console.log(res);
  if (res._id) {
    return { status: 200, message: "Applied successfully" };
  }
};

exports.apply = apply;
