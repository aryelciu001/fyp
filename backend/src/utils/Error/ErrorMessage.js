module.exports = {
  PROJECT_SELECTED: {
    code: "PROJECT_SELECTED",
    message: "The project has been selected",
    statusCode: 409,
  },
  USER_HAS_SELECTED: {
    code: "USER_HAS_SELECTED",
    message: "The user has selected another project",
    statusCode: 409,
  },
  SERVER_ERROR: {
    code: "SERVER_ERROR",
    message: "Something is wrong",
    statusCode: 500,
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: "User is unauthorized",
    statusCode: 401,
  },
  ER_DUP_ENTRY: {
    code: "ER_DUP_ENTRY",
    message: "Duplicate record",
    statusCode: 409,
  },
  SELECTION_CLOSED: {
    code: "SELECTION_CLOSED",
    message: "Selection closed",
    statusCode: 401,
  },
  WRONG_VERIFICATION_CODE: {
    code: "WRONG_VERIFICATION_CODE",
    message: "wrong verification code",
    statusCode: 401,
  },
  DIFFERENT_REGISTERED_MATRIC_NUMBER: {
    code: "DIFFERENT_REGISTERED_MATRIC_NUMBER",
    message: "valid matric number is different from registered matric number",
    statusCode: 400,
  },
};
