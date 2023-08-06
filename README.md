Food Ordering System
====================

The Food Ordering System is a backend application that allows users to browse a menu, place orders for food items, and manage their orders. The system provides functionalities for user management, menu management, order management, and advanced reporting. It is built using Node.js, Express.js, Sequelize (an ORM for Node.js), and MySQL for the database.


Table of Contents
=================
* 1. Features
* 2. Setup Instructions
* 3. API Endpoints
* 4. Advanced Reporting
* 5. Data Validation
* 6. Error Handling
* 7. Contributing
* 8. License

# Features

The Food Ordering System provides the following features:

## 1. User Management:

User registration and login with JWT authentication
User profile management

## 2. Menu Management:

Adding, updating, and deleting food items in the menu
Categorizing food items

## 3. Order Management:

Placing orders for food items
Viewing and updating order status
Viewing order history

## 4. Advanced Reporting:

Generating reports for total sales over a given time period (daily, weekly, monthly)
Displaying the top-selling menu items based on the number of orders or total revenue
Calculating the average order value for a given time period

## 5. Data Validation:

Request body validation using AJV

## 6. Error Handling:

Proper error handling and error responses for all endpoints

## Setup Instructions

To set up and run the Food Ordering System, follow these steps:

### 1. Install the dependencies:

npm install

### 2. Configure the database:

Create a MySQL database and user for the application.
Update the database credentials in the config/config.json file.

### 3. Run the database migrations:

npx sequelize db:migrate

### 4. Seed the database with initial data:

npx sequelize db:seed:all

### 5. Start the server:

npm run dev

The server will run at http://localhost:3001


API Endpoints
=============

1. User Management:

* POST /user/register: Register a new user
* POST /user/login: Login an existing user
* GET /user/info/limit/:limit/offset/:offset : Get all the user's profile (requires authentication)

2. Menu Management:

### A. Category Management

* GET /getallcategory/limit/:limit/offset/:offset: Get all food categories in the menu (requires authentication)
* GET /category/getcategory/id/:id : Get a food category using the ID (requires authentication)
* POST /category/add: Add a new category to the menu (requires authentication)
* PUT /category/update: Update a category item in the menu (requires authentication)
* DELETE /category/delete/id/:id : Delete a category from the menu (requires authentication)

### B. Dish Management

* GET /dish/getdish/id/:id : Get food item from ID (requires authentication)
* GET /dish/getalldishes/limit/:limit/offset/:offset : Get all food items(requires authentication)
* POST /dish/add: Add a new dish to the menu (requires authentication)
* PUT /dish/update: Update a dish item in the menu (requires authentication)
* DELETE /category/delete/id/:id : Delete a dish item from the menu (requires authentication)

### C. Rating's Management

* GET /rating/getrating/id/:id: Get the rating for a food item (requires authentication)
* GET /rating/getallratings/limit/:limit/offset/:offset : Get all the ratings given to all the dishes (requires authentication)
* POST /rating/add: Add a new rating to a dish (requires authentication)
* PUT /rating/update: Update the rating for a food item (requires authentication)
* DELETE /rating/delete/id/:id : Delete the rating for a food item (requires authentication)

3. Order Management:

* GET /order/id/:id : Get an order by ID (requires authentication)
* POST /order/place-order: Place a new order (requires authentication)
* PATCH /order/id/:id/status: Update the status for an order via ID (requires authentication)
* PATCH /order/id/:id/complete: Update an order to mark as complete (requires authentication)


Advanced Reporting
==================

The advanced reporting functionality provides the following reports:

1. Total Sales Report:

* GET /report/sales/start/:start/end/:end: Generate a report that shows the total sales for a given time period (daily, weekly, monthly).

2. Top Selling Items by Revenue Report:

* GET /report/top-selling-items/revenue: Generate a report that displays the top-selling menu items based on total revenue.

3. Average Order Value Report:

* GET /report/average-order-value/start/:start/end/:end: Generate a report that shows the average order value for a given time period.

4.  Top Selling Items by Order Report:

* GET /report/top-selling-items/orders : Generate a report that displays the top-selling menu items based on orders.

5. Create a new task

* POST /task/add : This endpoint will create a new task.

6. Get list of tasks

* GET /task/get-tasks?status=complete&priority=Medium&startDate=2023-01-01&endDate=2023-07-31 : This endpoint will get the list of tasks based on the query parameters.

7. Get list of tasks 

* GET /task/get-tasks?page=1&perPage=5 : The request is asking the server to provide a list of tasks with pagination


Data Validation
===============

Request bodies are validated using AJV wherever it's necessary to ensure that the data provided is valid and meets the required format.


Error Handling
==============

The API endpoints are designed to handle errors gracefully and provide meaningful error responses.


Contributing
============

Contributions to the Food Ordering System are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.


License
=======

The Food Ordering System is open-source software licensed under the MIT License.


Conclusion
==========

This README file provides an overview of the Food Ordering System, its features, setup instructions, API endpoints, reporting functionality, data validation, error handling, and information on how to contribute. Please customize it further with specific details relevant to your project.

