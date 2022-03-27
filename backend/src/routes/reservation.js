const ReservationRouter = require("express").Router();
const ReservationController = require("../controllers/reservation");
const AuthController = require("../controllers/auth");
const MyError = require("../utils/Error/Error");
const ErrorResponse = require("../utils/Error/ErrorResponse");
const ErrorMessage = require("../utils/Error/ErrorMessage");

/**
 * @description get reservation of student
 */
ReservationRouter.get("/", AuthController.isUser, async function (req, res) {
  const { email } = req.body.authenticatedUser;
  ReservationController.getUserReservation(email)
    .then((reservations) => res.send(reservations))
    .catch((e) => {
      return ErrorResponse(e, res);
    });
});

/**
 * @description add new reservation
 * @requires role: eligible student
 * @requestBody
 * - email
 * - projno
 */
ReservationRouter.post("/", AuthController.isUser, async function (req, res) {
  try {
    const { email, projno } = req.body;
    const reservation = await ReservationController.getReservation(
      email,
      projno
    );
    if (reservation) throw new MyError(ErrorMessage.ER_DUP_ENTRY);
    await ReservationController.addReservation(email, projno);
    return res.send();
  } catch (e) {
    return ErrorResponse(e, res);
  }
});

/**
 * @description delete reservation
 * @requires role: eligible student
 * @parameters
 * - email
 * - projno
 */
ReservationRouter.delete(
  "/:email&:projno",
  AuthController.isUser,
  async function (req, res) {
    const { email, projno } = req.params;
    ReservationController.deleteReservation(email, projno)
      .then(() => res.send())
      .catch((e) => {
        return ErrorResponse(e, res);
      });
  }
);

/**
 * @description get all reservation
 */
ReservationRouter.get(
  "/all",
  AuthController.isAdmin,
  async function (req, res) {
    ReservationController.getReservationReportData()
      .then((data) => res.send(data))
      .catch((e) => {
        return ErrorResponse(e, res);
      });
  }
);

module.exports = ReservationRouter;
