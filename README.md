# su25_CamdenGregory_LionAPI

Simple RESTful API for managing lions in a database. 

## Base URL
```
http://localhost:8080/api/lions
```

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