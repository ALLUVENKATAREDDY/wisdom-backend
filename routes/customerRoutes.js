const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer'); // Assuming you have a Customer model

// POST /customers/
router.post('/', async (req, res) => {
  const { name, email, phone, company } = req.body;

  // Basic validation
  if (!name || !email || !phone || !company) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create the new customer in the database
    const newCustomer = await Customer.create({ name, email, phone, company });

    // Return success message and the created customer data
    res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating customer', error });
  }
});

module.exports = router;
