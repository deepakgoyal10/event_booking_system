const { default: mongoose } = require("mongoose");
const EventModal = require("../models/events.model");
const usersModel = require("../models/users.model");
const UsersModel = require("../models/users.model");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/helpers");

exports.book_event = async (req, res) => {
  try {
    // Find the event by event_code from the request parameters
    const event = await EventModal.findOne({
      event_code: req.params.event_code,
    });
    // If event is not found, send a failure response

    if (!event)
      return sendSuccessResponse(res, "Failed", "Event not found", 404);

    // If requested tickets are more than available tickets, send an error response
    if (event?.available_tickets < req.body.tickets) {
      return sendErrorResponse(
        res,
        "Failed",
        "Not enough tickets available",
        400
      );
    }
    // Update the available tickets count
    event.available_tickets =
      Number(event.available_tickets) - Number(req.body.tickets);
    await event.save();

    // Find the user by ID from the request user data that set in auth middleware
    const user = await UsersModel.findById({ _id: req.user.id });
    user.bookings.push(event);
    await user.save();

    return sendSuccessResponse(res, "success", "Booking successful");
  } catch (error) {
    console.log("[BOOK_EVENT]", error);
    sendErrorResponse(res, "Internal Error", error);
  }
};

exports.get_user_booking = async (req, res) => {
  try {
    // Find the user by ID and populate the bookings with event details using aggregate
    const user = await usersModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $lookup: {
          localField: "bookings",
          foreignField: "_id",
          from: "events",
          as: "bookingData",
        },
      },
    ]);
    console.log(user);

    // Mapping Data that to be send  removed all sensitive information
    const bookingDetails = user[0].bookingData.map((event) => ({
      name: event.name,
      description: event.description,
      event_code: event.event_code,
      date: event.date,
      time: event.time,
      venue: event.venue,
      available_tickets: event.available_tickets,
      createdAt: event.createdAt,
    }));
    sendSuccessResponse(res, "success", bookingDetails);
  } catch (error) {
    console.log("[MY-BOOKING]", error);
    sendErrorResponse(res, "Internal", error);
  }
};
