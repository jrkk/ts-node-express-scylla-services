# Postman Collections for Express TypeScript Node Services

This directory contains Postman collections and environments for testing the Express TypeScript Node Services API.

## Files

### 1. `express-ts-node-services.postman_collection.json`
Main Postman collection containing all API endpoints organized by functionality:

**Health Check Endpoints:**
- `GET /api/health` - Check application health status

**User Management Endpoints:**
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user

### 2. `local-environment.postman_environment.json`
Environment configuration for local development with predefined variables:
- `base_url`: http://localhost:3000
- `api_prefix`: /api
- `user_id`: 1 (default user ID for testing)

## How to Import into Postman

### Import Collection
1. Open Postman
2. Click "Import" button
3. Select `express-ts-node-services.postman_collection.json`
4. The collection will appear in your Collections sidebar

### Import Environment
1. Click the gear icon (⚙️) in the top-right corner
2. Select "Manage Environments"
3. Click "Import" and select `local-environment.postman_environment.json`
4. Select the "Express TS Node Services - Local" environment from the environment dropdown

## Using the Collection

### Prerequisites
- Make sure your Express TypeScript Node Services server is running on `http://localhost:3000`
- The server should be accessible via the `/api` prefix

### Testing Endpoints

1. **Health Check**: Start with the health endpoint to verify the server is running
2. **Create User**: Use the POST request to create a new user
3. **Get All Users**: Retrieve all users to see your created user
4. **Get User by ID**: Test retrieving a specific user

### Sample Requests

#### Create User
```json
POST /api/users
{
  "email": "test@example.com",
  "firstName": "Test",
  "lastName": "User"
}
```

#### Expected Response Format
All endpoints follow a consistent response format:

**Success Response:**
```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "message": "Error description"
  }
}
```

## Automated Testing

The collection includes built-in test scripts that automatically:
- Verify response structure (success/error format)
- Check response time (< 2000ms)
- Validate proper HTTP status codes

## Environment Variables

You can customize the environment variables:
- Change `base_url` for different deployment environments
- Modify `api_prefix` if your API structure changes
- Update `user_id` for different test scenarios

## Different Environments

To create additional environments for staging, production, etc.:
1. Duplicate the local environment file
2. Modify the `base_url` and other variables as needed
3. Import the new environment into Postman
4. Switch between environments using the environment dropdown

## API Documentation

For detailed API documentation, refer to the route files in the `src/Routes/` directory:
- [Health Routes](../src/Routes/healthRoutes.ts)
- [User Routes](../src/Routes/userRoutes.ts)