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
