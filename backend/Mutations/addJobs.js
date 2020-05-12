const Job_Model = require("../Models/JobModel");
const Comp_Profile = require("../Models/CompProfileModel");

addJobs = async (args) => {
  let company_name = "";
  let email = "";
  let user = await Comp_Profile.findById(args.comp_id);
  if (user) {
    company_name = user.cname;
    email = user.email;
  }
  var newjob = new Job_Model({
    title: args.title,
    deadline: args.deadline,
    location: args.location,
    salary: args.salary,
    desc: args.desc,
    post: args.post,
    paid: args.paid,
    job_cat: args.job_cat,
    company_name: company_name,
    email: email,
    comp_id: args.comp_id,
  });
  newjob.save((error, user) => {
    if (error) {
      return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    } else {
      return { status: 200, message: "ADDED NEW JOB" };
    }
  });
};

exports.addJobs = addJobs;
