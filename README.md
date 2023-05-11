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

| Endpoint                     | Method | Description                                                                                      | Parameters |
| ----------------------------| ------ | ------------------------------------------------------------------------------------------------ | ---------- |
| `/employees`                 | GET    | Retrieves a list of all employees in the hospital                                                |            |
| `/employees/:tz`             | GET    | Retrieves the details of a single employee                                                       | `tz`: The ID of the employee to retrieve, in the URL path<br>Example: `/employees/123` |
| `/employees`                 | POST   | Adds a new employee to the system                                                                 | ```{ "first_name": "riki", "last_name": "schulman", "tz": 115799562, "address": {"city": "bet shemesh", "street": "nachal tamar", "number": "8"}, "dob": "1997-01-20", "landline": 29910274, "mobile_phone": 587638128}``` |
| `/coronainfos`              | GET    | Retrieves a list of all COVID-19 vaccinations for all employees in the hospital                  |            |
| `/coronainfos/:tz`          | GET    | Retrieves the details of a single COVID-19 vaccination                                            | `tz`: The ID of the vaccination to retrieve, in the URL path<br>Example: `/coronainfos/123` |
| `/coronainfos`| POST   | Adds a new COVID-19 vaccination for a specific employee                                           |```{  "tz": 328781786,"vaccination_date": "2022-09-11",\n  "vaccination_manufacturer": "pfizer", "exposure_date": "2022-11-11", "recovery_date": "2022-12-11"}``` |


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
