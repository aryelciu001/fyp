const csv = require("csvtojson");
const multer = require("multer");
const upload = multer();
const ProjectRouter = require("express").Router();
const ProjectController = require("../controllers/project");
const AuthController = require("../controllers/auth");
const ErrorResponse = require("../utils/Error/ErrorResponse");

/**
 * @description get list of Projects
 * @requires role:any
 * @returns project[]
 */
ProjectRouter.get("/", AuthController.isUser, function (req, res) {
  ProjectController.getProject()
    .then((project) => res.send(project))
    .catch((e) => {
      return ErrorResponse(e, res);
    });
});

/**
 * @description add new Project
 * @requires role:admin
 * @requestBody
 * - title
 * - projno
 * - summary
 * - supervisor
 * - email
 */
ProjectRouter.post("/", AuthController.isAdmin, function (req, res) {
  const { title, projno, summary, supervisor, email } = req.body;
  ProjectController.addProject(title, projno, summary, supervisor, email)
    .then(() => res.send())
    .catch((e) => {
      return ErrorResponse(e, res);
    });
});

/**
 * @description edit Project
 * @requires role:admin
 * @requestBody
 * - title
 * - projno
 * - summary
 * - supervisor
 * - email
 */
ProjectRouter.put("/", AuthController.isAdmin, function (req, res) {
  const { title, projno, summary, supervisor, email } = req.body;
  ProjectController.editProject(title, projno, summary, supervisor, email)
    .then(() => res.send())
    .catch((e) => {
      return ErrorResponse(e, res);
    });
});

/**
 * @description delete Project
 * @requires role:admin
 * @param projno
 */
ProjectRouter.delete("/:id", AuthController.isAdmin, function (req, res) {
  const { id } = req.params;
  ProjectController.deleteProject(id)
    .then(() => res.send())
    .catch((e) => {
      return ErrorResponse(e, res);
    });
});

/**
 * @description add project via csv file
 * @requires role:admin
 * @requestBody
 * - csv file
 */
ProjectRouter.post(
  "/csv",
  upload.single("csvFile"),
  AuthController.isAdmin,
  async function (req, res) {
    const file = req.file.buffer;
    const data = file.toString();
    const projects = await csv().fromString(data);
    const promises = [];
    projects.forEach((project) => {
      promises.push(
        ProjectController.addProject(
          project["Title"],
          project["Proj No"],
          project["Summary"],
          project["Supervisor"],
          project["Email"]
        )
      );
    });
    Promise.allSettled(promises)
      .then(() => res.send())
      .catch((e) => {
        return ErrorResponse(e, res);
      });
  }
);

module.exports = ProjectRouter;
