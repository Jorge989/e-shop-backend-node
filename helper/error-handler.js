function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizadError") {
    return res.status(500).json({ messgae: "The user is not authorized" });
  }
  if (err.name === "ValidationError") {
    return res.status(401).json({ message: err });
  }
  return res.status(500).json({ messgae: err });
}
module.exports = errorHandler;
