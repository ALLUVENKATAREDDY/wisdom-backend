const Customer = require('../models/Customer');
const { Op } = require('sequelize');
const { paginateQuery, handleError, handleSuccess } = require('../utils/helpers');

// Create customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;
    
    // Assuming that the user ID is available in req.userId (authentication middleware)
    const newCustomer = await Customer.create({
      name, 
      email, 
      phone, 
      company, 
      userId: req.userId  // Attach userId from request (auth middleware)
    });

    handleSuccess(res, 'Customer created successfully', newCustomer, 201);
  } catch (error) {
    handleError(res, 'Error creating customer', 400, error.message);
  }
};

// Get all customers with pagination and filtering
exports.getCustomers = async (req, res) => {
  const { page = 1, limit = 10, name, email, phone, company } = req.query;
  const filters = { where: {} };

  if (name) filters.where.name = { [Op.like]: `%${name}%` };
  if (email) filters.where.email = { [Op.like]: `%${email}%` };
  if (phone) filters.where.phone = { [Op.like]: `%${phone}%` };
  if (company) filters.where.company = { [Op.like]: `%${company}%` };

  try {
    const customers = await paginateQuery(Customer.findAll(filters), page, limit);
    handleSuccess(res, 'Customers fetched successfully', customers);
  } catch (error) {
    handleError(res, 'Error fetching customers', 500, error.message);
  }
};
