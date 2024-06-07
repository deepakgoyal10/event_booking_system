const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    event_code: { type: String, unique: true, required: true },
    date: { type: Date, required: true },
    time: { type: String },
    venue: { type: String, required: true },
    total_tickets: { type: Number },
    available_tickets: { type: Number },
  },
  {
    timestamps: true,
  }
);

let EventModal = mongoose.model("Event", EventSchema);
module.exports = EventModal;
