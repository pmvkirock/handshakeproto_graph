const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

var jobSchema = new Schema(
  {
    title: { type: String, required: true },
    deadline: { type: Date },
    location: { type: String },
    salary: { type: String },
    desc: { type: String },
    paid: { type: String },
    job_cat: { type: String },
    posting_date: { type: Date, default: Date.now },
    company_name: { type: String },
    email: { type: String },
    comp_id: { type: String },
  },
  {
    versionKey: false,
  }
);

jobSchema.plugin(paginate);
const jobModel = mongoose.model("jobs", jobSchema);
module.exports = jobModel;
