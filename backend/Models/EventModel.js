const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var eventSchema = new Schema(
  {
    company_name: { type: String },
    email: { type: String },
    idcompany: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date },
    location: { type: String },
    desc: { type: String },
    eligibility: { type: String },
    posting_date: { type: Date, default: Date.now },
    time: { type: String },
  },
  {
    versionKey: false,
  }
);

const eventModel = mongoose.model("events", eventSchema);
module.exports = eventModel;
