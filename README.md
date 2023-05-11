# Hospital Employee Management System

This is a fullstack project that manages employees in a hospital, including their personal information and their COVID-19 vaccinations and exposure information.

## Features

- Add and view employee information
- Record and view COVID-19 vaccination information for each employee
- Record and view COVID-19 exposure information for each employee

## Technologies Used

The server side of this project was built using Node.js with Express.js as the web framework. The database used is PostgreSQL and Sequelize was used as the ORM.

## Installation

To install this project, please follow these steps:

1. Clone the repository onto your local machine
2. Install the necessary dependencies by running `npm install`
3. Start the server by running `npm start`

## API Endpoints

Here are the endpoints that can be used to interact with the API:

| Endpoint                        | Method | Description                                            |
|---------------------------------|--------|--------------------------------------------------------|
| /employees                      | GET    | Get all employees                                      |
| /employees/:id                  | GET    | Get a single employee by ID                             |
| /employees                      | POST   | Create a new employee                                   |
| /employees/:id/vaccinations    | GET    | Get all COVID-19 vaccinations for an employee           |
| /employees/:id/vaccinations    | POST   | Add a new COVID-19 vaccination for an employee          |
| /employees/:id/exposures       | GET    | Get all COVID-19 exposures for an employee              |
| /employees/:id/exposures       | POST   | Add a new COVID-19 exposure for an employee             |

The client side of this project was built using React and Material UI.

## Installation

To install and run this project locally, please follow these steps:

1. Navigate into the client folder
2. Install the necessary dependencies by running `npm install`
3. Start the client by running `npm start`
4. Open your web browser and navigate to `http://localhost:3005`

## Usage

Once you have the client running, you can use the application to manage hospital employees and their COVID-19 information. The UI includes the following views:

- **Employee List:** A list of all employees with their basic information displayed.
- **Employee Detail:** The full details of a selected employee, including their personal information and COVID-19 vaccination and exposure history.
- **Add Employee:** A form for adding a new employee to the system.
- **Add Vaccination:** A form for recording a new COVID-19 vaccination for a selected employee.
- **Add Exposure:** A form for recording a new COVID-19 exposure for a selected employee.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes and commit them with a clear message
4. Push your changes to your forked repository
5. Create a pull request from your forked repository to this repository
