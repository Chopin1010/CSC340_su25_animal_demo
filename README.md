# su25_CamdenGregory_LionAPI

Simple Full Stack Web App with React frontend and Spring-Boot backend for managing lions in a database. 

## Base URL
```
http://localhost:8080/api/lions
```

## How to Run the Application

To get this full-stack application up and running, follow these steps:

### 1. Start the Backend (Spring Boot API)

Navigate to the root of this project (`CSC340_animal_demo`) in your terminal and run the Spring Boot application:

```bash
cd CSC340_animal_demo
./mvnw clean install
./mvnw spring-boot:run
```

The backend API will typically run on `http://localhost:8080`.

### 2. Start the Frontend (React Application)

Open a **new terminal window** (keep the backend running in its own terminal), navigate to the `front_end/` directory, install the necessary Node.js dependencies, and then start the React development server:

```bash
cd front_end
npm install
npm run dev
```

The frontend application will typically open in your browser at `http://localhost:5173`.

Enjoy exploring the Majestic Lion App!

## Endpoints

### Get All Lions
- **URL**: `/`
- **Method**: `GET`
- **Description**: Retrieves all lions from the database
- **Response**: List of lion objects

### Get Lion by ID
- **URL**: `/{id}`
- **Method**: `GET`
- **Description**: Retrieves a specific lion by its ID
- **Response**: Lion object or 404 if not found

### Add New Lion
- **URL**: `/`
- **Method**: `POST`
- **Description**: Creates a new lion
- **Request Body**: Lion object with required fields
- **Response**: Created lion object

### Update Lion
- **URL**: `/{id}`
- **Method**: `PUT`
- **Description**: Updates an existing lion
- **Request Body**: Updated lion object
- **Response**: Updated lion object or 404 if not found

### Delete Lion
- **URL**: `/{id}`
- **Method**: `DELETE`
- **Description**: Deletes a lion by ID
- **Response**: 200 OK if successful

### Get Lions by Species
- **URL**: `/species/{species}`
- **Method**: `GET`
- **Description**: Retrieves all lions of a specific species
- **Response**: List of lion objects

### Search Lions by Name
- **URL**: `/search?name={name}`
- **Method**: `GET`
- **Description**: Searches for lions whose names contain the given string
- **Response**: List of matching lion objects

### Get Lions by Habitat
- **URL**: `/habitat/{habitat}`
- **Method**: `GET`
- **Description**: Retrieves all lions from a specific habitat
- **Response**: List of lion objects

## Lion Object Structure
```json
{
    "lionId": "long",
    "name": "string",
    "description": "string",
    "species": "string",
    "habitat": "string",
    "weight": "double",
    "birthDate": "date"
}
``` 

## Tested endpoints passed
- GET /api/lions
- GET /api/lions/{id}
- POST /api/lions
- PUT /api/lions/{id}
- DELETE /api/lions/{id}
- GET /api/lions/species/{species}
- GET /api/lions/search?name={name}
- GET /api/lions/habitat/{habitat}

