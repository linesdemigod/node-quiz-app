const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;

  let response = {
    title: "Error",
    message: err.message || "An unexpected error occurred",
    stackTrace: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  switch (statusCode) {
    case 404:
      response.title = "Not Found";
      response.message = "The requested resource was not found";
      break;
    case 422:
      response.title = "Validation Failed";
      response.message = "Input validation failed";
      break;
    case constants.NOT_FOUND:
      response.title = "Not Found";
      response.message = "The requested resource was not found";
      break;
    case constants.UNAUTHORIZED:
      response.title = "Unauthorized";
      response.message = "You are not authorized to access this resource";
      break;
    case constants.FORBIDDEN:
      response.title = "Forbidden";
      response.message = "You do not have permission to access this resource";
      break;
    case constants.VALIDATION_ERROR:
      response.title = "Validation Error";
      response.message = "Input validation failed";
      break;
    case constants.SERVER_ERROR:
      response.title = "Server Error";
      response.message = "An unexpected server error occurred";
      break;
    default:
      response.title = "Unknown Error";
      response.message = "An unexpected error occurred";
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
