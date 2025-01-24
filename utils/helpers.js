function paginateQuery(query, page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  return query.limit(limit).offset(offset);
}

function handleError(res, message, statusCode = 400, details = {}) {
  return res.status(statusCode).json({ error: message, details });
}

function handleSuccess(res, message, data = {}, statusCode = 200) {
  return res.status(statusCode).json({ message, data });
}

module.exports = { paginateQuery, handleError, handleSuccess };
