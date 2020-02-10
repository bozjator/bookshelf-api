import { HttpStatus } from "@nestjs/common";

const errResMsgs = {
  ERROR_USER_ALREADY_EXISTS: {
    statusCode: HttpStatus.CONFLICT,
    error: "ERROR_USER_ALREADY_EXISTS",
    message:
      "Occures when registering a user with an email that is already in use by another user."
  },
  ERROR_WRONG_LOGIN_CREDENTIALS: {
    statusCode: HttpStatus.UNAUTHORIZED,
    error: "ERROR_WRONG_LOGIN_CREDENTIALS",
    message: "Occurs when logging in with wrong credentials."
  },
  ERROR_REQUIRED_DATA_MISSING: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    error: "ERROR_REQUIRED_DATA_MISSING",
    message: "Occurs when required request data is missing."
  }
};

export default errResMsgs;
