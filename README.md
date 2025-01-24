# Wisdom Peak Analytics Backend Assignment

## Objective
The purpose of this project is to develop a backend system for a basic Customer Relationship Management (CRM) application. The system will manage customer data, including contacts, companies, and interactions. The project involves creating a scalable, secure, and well-documented API that can handle CRUD (Create, Read, Update, Delete) operations, user authentication, and data validation.

---

## Prerequisites
- Node.js and npm installed on your system.
- MySQL installed and running.
- Thunder Client or any API testing tool.

---

## Setting up the Project Locally

### Step 1: Clone the Repository
git clone https://github.com/ALLUVENKATAREDDY/wisdom-backend/tree/master
cd wisdom-peak-analytics
```

### Step 2: Install Dependencies
Run the following command to install all required dependencies:

npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root of your project and configure the following variables:
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=wisdom
JWT_SECRET=your_secret_key
```

### Step 4: Set Up the Database
1. Create a database named `wisdom` in your MySQL server.
2. Run the migrations to set up the tables:

npx sequelize-cli db:migrate


### Step 5: Start the Server
Run the server using the following command:

npm start

By default, the server will run at `http://localhost:3000`.



## API Endpoints

### User Authentication

#### Register a User
**POST** `/users/register`
- **Payload:**
```json
{
  "username": "string",
  "password": "string",
  "role": "string"
}
```
- **Response:**
```json
{
  "message": "User registered",
  "user": { "username": "string", "role": "string" }
}
```

#### Login
**POST** `/users/login`
- **Payload:**
```json
{
  "username": "string",
  "password": "string"
}
```
- **Response:**
```json
{
  "message": "Login successful",
  "token": "string"
}
```

---

### Customer Management

#### Create a Customer
**POST** `/customers`
- **Headers:**
  - Authorization: `Bearer <JWT_TOKEN>`
- **Payload:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string"
}
```
- **Response:**
```json
{
  "message": "Customer created successfully",
  "customer": {
    "id": 1,
    "name": "string",
    "email": "string",
    "phone": "string",
    "company": "string"
  }
}
```

#### Get All Customers (with Pagination, Search, and Filtering)
**GET** `/customers`
- **Headers:**
  - Authorization: `Bearer <JWT_TOKEN>`
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Number of records per page (default: 10)
  - `name`: Filter by name (optional)
  - `email`: Filter by email (optional)
  - `phone`: Filter by phone (optional)
  - `company`: Filter by company (optional)
- **Response:**
```json
{
  "message": "Customers fetched successfully",
  "data": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10,
    "customers": [
      {
        "id": 1,
        "name": "string",
        "email": "string",
        "phone": "string",
        "company": "string"
      }
    ]
  }
}
```

#### Get a Customer by ID
**GET** `/customers/:id`
- **Headers:**
  - Authorization: `Bearer <JWT_TOKEN>`
- **Response:**
```json
{
  "message": "Customer fetched successfully",
  "customer": {
    "id": 1,
    "name": "string",
    "email": "string",
    "phone": "string",
    "company": "string"
  }
}
```

#### Update a Customer
**PUT** `/customers/:id`
- **Headers:**
  - Authorization: `Bearer <JWT_TOKEN>`
- **Payload:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string"
}
```
- **Response:**
```json
{
  "message": "Customer updated successfully",
  "customer": {
    "id": 1,
    "name": "string",
    "email": "string",
    "phone": "string",
    "company": "string"
  }
}
```

#### Delete a Customer
**DELETE** `/customers/:id`
- **Headers:**
  - Authorization: `Bearer <JWT_TOKEN>`
- **Response:**
```json
{
  "message": "Customer deleted successfully"
}
```

---

## Testing the APIs

### Using Postman
1. Import the API endpoints into Postman.
2. Use the `http://localhost:3000` base URL for local testing.
3. Include the JWT token in the `Authorization` header for protected routes.

### Sample Testing URLs
- Register: `http://localhost:3000/users/register`
- Login: `http://localhost:3000/users/login`
- Create Customer: `http://localhost:3000/customers`
- Get All Customers: `http://localhost:3000/customers`
- Get a Customer by ID: `http://localhost:3000/customers/1`
- Update Customer: `http://localhost:3000/customers/1`
- Delete Customer: `http://localhost:3000/customers/1`
-Filter Customers :`http://localhost:3000/customers?name=ram`
-Paginated Search and Filtering API:`http://localhost:3000/customers?page=1&limit=5&name=jake`

---

## Deployment
To deploy the project:
1. Configure environment variables for production.
2. Deploy to a platform like Heroku or AWS.
3. Test the live APIs using the deployed URL.

Wisdom Peak Backend API:https://wisdom-backend-hoqd.onrender.com