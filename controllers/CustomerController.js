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



exports.getCustomers = async (req, res) => {
  const { page = 1, limit = 10, name, email, phone, company } = req.query;

  // Filters: Build the `where` object dynamically based on query params
  const filters = {};
  if (name) filters.name = { [Op.like]: `%${name}%` };
  if (email) filters.email = { [Op.like]: `%${email}%` };
  if (phone) filters.phone = { [Op.like]: `%${phone}%` };
  if (company) filters.company = { [Op.like]: `%${company}%` };

  // Pagination: Calculate `limit` and `offset`
  const offset = (page - 1) * limit;

  try {
    // Fetch paginated and filtered data with total count
    const { rows: customers, count: total } = await Customer.findAndCountAll({
      where: filters,   // Apply filters
      limit: parseInt(limit), // Apply limit
      offset: parseInt(offset), // Apply offset
      order: [['createdAt', 'DESC']], // Sort by creation date (optional)
    });

    // Prepare response with metadata
    const response = {
      total,               // Total number of matching records
      page: parseInt(page),  // Current page
      limit: parseInt(limit), // Limit per page
      totalPages: Math.ceil(total / limit), // Total pages
      customers,            // List of customers for the current page
    };

    // Send success response
    handleSuccess(res, 'Customers fetched successfully', response);
  } catch (error) {
    // Send error response
    handleError(res, 'Error fetching customers', 500, error.message);
  }
};
