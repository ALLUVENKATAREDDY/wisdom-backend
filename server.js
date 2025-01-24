const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Simulate a simple database
let users = []; // For registered users
let customers = []; // For storing customer data

// Secret key for signing JWT
const SECRET_KEY = 'your_secret_key_here';

// Register route
app.post('/users/register', (req, res) => {
  const { username, password, role } = req.body;

  if (username && password && role) {
    users.push({ username, password, role });
    res.status(200).send({
      message: 'User registered successfully!',
      user: { username, role },
    });
  } else {
    res.status(400).send({ message: 'Missing fields for registration' });
  }
});

// Login route
app.post('/users/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, {expiresIn: '7days' });
    res.status(200).send({
      message: 'Login successful!',
      user: { username: user.username, role: user.role },
      token,
    });
  } else {
    res.status(401).send({ message: 'Invalid credentials!' });
  }
});

// Add a customer
app.post('/customers', (req, res) => {
  const { name, email, phone, company } = req.body;

  if (!name || !email || !phone || !company) {
    return res.status(400).send({ message: 'Missing fields for customer data' });
  }

  const customer = { id: customers.length + 1, name, email, phone, company };
  customers.push(customer);

  res.status(201).send({
    message: 'Customer added successfully!',
    customer,
  });
});

app.get('/customers', (req, res) => {
    const { page = 1, limit = 10, name, email, phone, company } = req.query;
  
    // Filters: Apply filters to the array
    let filteredCustomers = customers;
  
    if (name) {
      filteredCustomers = filteredCustomers.filter(customer =>
        customer.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (email) {
      filteredCustomers = filteredCustomers.filter(customer =>
        customer.email.toLowerCase().includes(email.toLowerCase())
      );
    }
    if (phone) {
      filteredCustomers = filteredCustomers.filter(customer =>
        customer.phone.includes(phone)
      );
    }
    if (company) {
      filteredCustomers = filteredCustomers.filter(customer =>
        customer.company.toLowerCase().includes(company.toLowerCase())
      );
    }
  
    // Pagination: Calculate start and end index
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
  
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);
  
    // Metadata for pagination
    const response = {
      total: filteredCustomers.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredCustomers.length / limit),
      customers: paginatedCustomers,
    };
  
    res.status(200).send({
      message: 'Customers retrieved successfully!',
      data: response,
    });
  });
  

// Get a customer by ID
app.get('/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const customer = customers.find(c => c.id === id);

  if (customer) {
    res.status(200).send({
      message: 'Customer retrieved successfully!',
      customer,
    });
  } else {
    res.status(404).send({ message: 'Customer not found' });
  }
});

// Update a customer by ID
app.put('/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone, company } = req.body;

  const customerIndex = customers.findIndex(c => c.id === id);

  if (customerIndex !== -1) {
    customers[customerIndex] = {
      ...customers[customerIndex],
      name: name || customers[customerIndex].name,
      email: email || customers[customerIndex].email,
      phone: phone || customers[customerIndex].phone,
      company: company || customers[customerIndex].company,
    };

    res.status(200).send({
      message: 'Customer updated successfully!',
      customer: customers[customerIndex],
    });
  } else {
    res.status(404).send({ message: 'Customer not found' });
  }
});

// Delete a customer by ID
app.delete('/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const customerIndex = customers.findIndex(c => c.id === id);

  if (customerIndex !== -1) {
    const removedCustomer = customers.splice(customerIndex, 1);
    res.status(200).send({
      message: 'Customer deleted successfully!',
      customer: removedCustomer[0],
    });
  } else {
    res.status(404).send({ message: 'Customer not found' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
