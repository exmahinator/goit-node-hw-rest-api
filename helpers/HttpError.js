const messages = {
  400: "Bad request. Some fields are missing or has not a proper type :( Please ensure that all of the necessary data with necessary type are provided...",
  401: "Oh my, oh my... Seems somebody is not authorized to do this action... Be careful - we're watching! We're everywhere... -_o",
  403: "Forbidden",
  404: "User not found :( Please ensure that requested ID/info is correct...",
  409: "Conflict",
};

const HttpError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
