const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var appEventSchema = new Schema(
  {
    idcompany: { type: String, required: true },
    idstudent: { type: String, required: true },
    idjob: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

const appModel = mongoose.model("app_event", appEventSchema);
module.exports = appModel;
