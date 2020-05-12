const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var compSchema = new Schema(
  {
    cname: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    website: { type: String },
    desc: { type: String },
    noofemp: { type: Number },
    owner_ship: { type: String },
    prof_pic: { type: String },
    company_type: { type: String }
  },
  {
    versionKey: false
  }
);

const compModel = mongoose.model("comp_prof", compSchema);
module.exports = compModel;
