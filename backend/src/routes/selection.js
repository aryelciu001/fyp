const SelectionRouter = require("express").Router();
const AuthController = require("../controllers/auth");
const UserController = require("../controllers/user");
const ProjecController = require("../controllers/project");
const SelectionController = require("../controllers/selection");
const SelectionInfoController = require("../controllers/selectioninfo");
const MyError = require("../utils/Error/Error");
const ErrorResponse = require("../utils/Error/ErrorResponse");
const ErrorMessage = require("../utils/Error/ErrorMessage");

/**
 * @description select project
 * @requestBody
 * - projno
 * - email
 */
SelectionRouter.post(
  "/",
  AuthController.isEligibleStudent,
  async function (req, res) {
    try {
      const { projno, email } = req.body;

      // check if project has been selected
      const projectSelected = await SelectionController.getSelectionWithProjno(
        projno
      );
      if (projectSelected.length)
        throw new MyError(ErrorMessage.PROJECT_SELECTED);

      // check if user has selected
      const userHasSelected = await SelectionController.getSelectionWithEmail(
        email
      );
      if (userHasSelected.length)
        throw new MyError(ErrorMessage.USER_HAS_SELECTED);

      // check if selection time is open
      const selectionInfo = await SelectionInfoController.getSelectionInfo();
      if (!selectionInfo.selectionopen)
        throw new MyError(ErrorMessage.SELECTION_CLOSED);

      // check if current time is within open period
      const now = new Date().getTime();
      if (selectionInfo.selectionopentime > now)
        throw new MyError(ErrorMessage.SELECTION_CLOSED);
      if (selectionInfo.selectionclosetime < now)
        throw new MyError(ErrorMessage.SELECTION_CLOSED);

      // add selection to db
      await SelectionController.selectProject(projno, email);

      // set project as selected
      await ProjecController.selectProject(projno);

      // update student matric number according to admin-supplied matric number
      await UserController.updateMatricNumber(email);

      return res.send();
    } catch (e) {
      return ErrorResponse(e, res);
    }
  }
);

/**
 * @description get selection of student
 */
SelectionRouter.get("/", AuthController.isUser, async function (req, res) {
  const { authenticatedUser } = req.body;
  SelectionController.getUserSelection(authenticatedUser.email)
    .then((selection) => res.send(selection))
    .catch((e) => {
      return ErrorResponse(e, res);
    });
});

/**
 * @description get all selection
 */
SelectionRouter.get("/all", AuthController.isAdmin, async function (req, res) {
  SelectionController.getSelectionReportData()
    .then((data) => res.send(data))
    .catch((e) => {
      return ErrorResponse(e, res);
    });
});

module.exports = SelectionRouter;
