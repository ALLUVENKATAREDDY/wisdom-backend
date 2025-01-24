const { body, validationResult } = require('express-validator');

// Validate customer data
function validateCustomer() {
  return [
    body('name').isString().withMessage('Name must be a string').notEmpty(),
    body('email').isEmail().withMessage('Email must be valid').notEmpty(),
    body('phone').isString().withMessage('Phone must be a string').notEmpty(),
    body('company').optional().isString().withMessage('Company must be a string if provided'),
  ];
}

// Validate user login data
function validateLogin() {
  return [
    body('username').isString().withMessage('Username must be a string').notEmpty(),
    body('password').isString().withMessage('Password must be a string').notEmpty(),
  ];
}

// Handle validation errors
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { validateCustomer, validateLogin, handleValidationErrors };
