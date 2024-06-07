const EventModal = require("../models/events.model");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/helpers");

exports.get_event = async (req, res) => {
  try {
    // Extract query parameters from the request
    const queryObject = req.query;
    console.log(req.query);

    // Create a Mongoose query object from the query parameters
    const mongooseQueryObj = { ...queryObject };

    // Fetch events from the database based on the query object
    const fetchEvents = await EventModal.find(mongooseQueryObj);

    // If no events are found, send a 404 response
    if (!fetchEvents) return res.status(404).send("Event not found");

    sendSuccessResponse(res, "success", fetchEvents);
  } catch (error) {
    console.log("[GET_EVENT]", error);
    sendErrorResponse(res, "Internal error", error);
  }
};

exports.create_event = async (req, res) => {
  try {
    // Create a new Event object from the request body
    const createEventObj = new EventModal({ ...req.body });
    const saveEvent = await createEventObj.save();
    sendSuccessResponse(res, "Created Event successfully", saveEvent);
  } catch (error) {
    console.log("[CREATE_EVENT]", error);
    sendErrorResponse(res, "Internal error", error);
  }
};
