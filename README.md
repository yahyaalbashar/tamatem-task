# Digital Game Items Management System

This project consists of two interdependent applications: a **backend API service** and a **frontend client**. Together, they manage and display a list of digital game items from a CSV file, support user authentication, product listing with pagination, detailed product views, and a simple purchase flow.

Note: There is a sqlite database file that you can use but it is not recommended, better to migrate and use the new database.
---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [API Documentation](#api-documentation)
7. [Design Decisions and Assumptions](#design-decisions-and-assumptions)

---

## Project Overview

- **Backend**: Built using Django REST Framework (DRF) with PostgreSQL as the database.
- **Frontend**: Built using React.js with TailwindCSS for styling.
- **Authentication**: Token-based authentication using JWT.
- **Features**:
  - Import game items from a CSV file into the database.
  - Paginated and filterable product listing.
  - Detailed product view.
  - Purchase flow with order storage and receipt generation.

---

## Prerequisites

Before running the project, ensure you have the following installed:

1. **Python** (v3.8 or higher): For the backend.
2. **Node.js** (v16 or higher): For the frontend.
3. **PostgreSQL**: As the database for the backend.
4. **Git**: To clone the repository.
5. **Browser**: Modern browsers like Chrome, Firefox, or Edge.

---

## Backend Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yahyaalbashar/tamatem-task.git
cd backend
```

### 2. Install Dependencies
Create a virtual environment and install Python dependencies:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Run Migrations
Apply migrations to set up the database schema:
```bash
python manage.py migrate
```

### 4. Import CSV Data
Run the script to import data from the CSV file:
```bash
python manage.py csv_reader path/to/items.csv
```

### 5. Create admin user
Create superuser
```bash
python manage.py createsuperuser --username admin --email admin@admin.com
```
then follow the prompts for the password

### 6. Start the Backend Server
```bash
python manage.py runserver
```
The backend will be available at `http://localhost:8000`.

---

## Frontend Setup

### 1. Navigate to the Frontend Directory
```bash
cd ../frontend
```

### 2. Install Dependencies
Install Node.js dependencies:
```bash
npm install
```

### 3. Start the Frontend Development Server
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`.

---

## Running the Application

1. **Start the Backend**:
   - Ensure the backend server is running (`http://localhost:8000`).

2. **Start the Frontend**:
   - Ensure the frontend development server is running (`http://localhost:5173`).

3. **Access the Application**:
   - Open your browser and navigate to `http://localhost:5173`.
   - Log in with valid credentials to access the application.

---

## API Documentation

The backend API is documented using Swagger/OpenAPI. You can explore and test the endpoints interactively:

- **Swagger UI**: `http://localhost:8000/swagger/`
- **Raw OpenAPI Schema**: `http://localhost:8000/api/schema/`

### Endpoints
1. **Authentication**:
   - `POST /api/login/`: Authenticate users and retrieve a JWT token.
   - `POST /api/token/refresh/`: Refresh expired access tokens.

2. **Products**:
   - `GET /api/products/`: Paginated list of products (optional filtering by location).
   - `GET /api/products/<id>/`: Retrieve detailed information about a specific product.

3. **Purchase**:
   - `POST /api/purchase/`: Buy a product and generate an order record.

---

## Design Decisions and Assumptions

### Backend
1. **Database Choice**:
   - PostgreSQL was chosen for its scalability, advanced querying capabilities, and compatibility with Django ORM.

2. **Authentication**:
   - JWT-based authentication ensures secure and stateless communication between the frontend and backend.

3. **Pagination Defaults**:
   - Default page size is set to `10`, with a maximum allowed page size of `100`.

4. **Error Handling**:
   - All endpoints return meaningful error messages for invalid requests or unexpected errors.

### Frontend
1. **Styling**:
   - TailwindCSS was used for utility-first styling, ensuring a responsive and modern UI.

2. **State Management**:
   - React Context was used to manage authentication tokens and application state.

3. **Responsiveness**:
   - The UI is designed to adapt to both desktop and mobile screen sizes using CSS Grid and media queries.

4. **Assumptions**:
   - Users will only purchase one product at a time.
   - The CSV file structure remains consistent with the provided sample.

---

## Additional Notes

- **Testing**:
  - Both backend and frontend include basic error handling and validation, but additional testing (e.g., unit tests, integration tests) is recommended for production use.

- **Deployment**:
  - For production, consider deploying the backend using a platform like AWS, Heroku, or Docker.
  - Deploy the frontend using platforms like Netlify, Vercel, or a static hosting service.

- **Future Enhancements**:
  - Add user registration functionality.
  - Implement role-based access control (e.g., admin vs. regular users).
  - Optimize performance for large datasets.