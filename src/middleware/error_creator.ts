class UnAuthorizedError extends Error {
  private statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "UnAuthorized Error";
    Error.captureStackTrace(this);
    this.statusCode = 403;
  }
}

class NotExistError extends Error {
  private statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "Not Exist Error";
    Error.captureStackTrace(this);
    this.statusCode = 404;
  }
}

class BadRequestError extends Error {
  private statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
    Error.captureStackTrace(this);
    this.statusCode = 400;
  }
}

export { BadRequestError, NotExistError, UnAuthorizedError };
