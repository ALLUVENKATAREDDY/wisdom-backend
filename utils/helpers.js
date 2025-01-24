exports.handleSuccess = (res, message, data, status = 200) => {
  res.status(status).json({ message, data });
};

exports.handleError = (res, message, status = 500, error = '') => {
  res.status(status).json({ message, error });
};

exports.paginateQuery = async (query, page, limit) => {
  const offset = (page - 1) * limit;
  return query.findAll({ limit, offset });
};
