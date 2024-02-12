const handleResponse = ({
  res,
  statusCode = 200,
  msg = "Success",
  data = {},
  result = 1,
}) => {
  res.status(statusCode).send({ result, msg, data });
};

const handleError = ({
  res,
  statusCode = 500,
  err_msg = "Error",
  error = "error",
  data = {},
  result = 0,
}) => {
  res.status(statusCode).send({
    result,
    err_msg,
    msg: error instanceof Error ? error.message : error.msg || error,
    data,
  });
};

module.exports = {
  handleResponse,
  handleError,
};
