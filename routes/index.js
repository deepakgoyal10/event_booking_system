const { Router } = require("express");
const router = Router();
const eventRouter = require("./event.routes");
const bookingRouter = require("./booking.routes");
const userRouter = require("./user.routes");
module.exports = router
  .use("/event", eventRouter)
  .use("/booking", bookingRouter)
  .use("/auth", userRouter);
