# ToolsZone API Documentation

This document outlines the API contracts for the ToolsZone backend services. It provides comprehensive details about endpoints, request formats, response structures, and authentication requirements.

## Base URL

The base URL for all API endpoints is: `http://localhost:5000` (development) or your production domain.

## Authentication

Most endpoints require authentication using JWT tokens.

**Authentication Header:**
```
Authorization: Bearer <your_token>
```

## Endpoints

### Authentication

#### Register

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "message": "User registered successfully",
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid input data
  - `409 Conflict`: User already exists

#### Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid input data
  - `401 Unauthorized`: Invalid credentials

#### Google Authentication

- **URL**: `/api/auth/google`
- **Method**: `POST`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "idToken": "google_id_token_here"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid input data
  - `401 Unauthorized`: Invalid Google token

#### Get Current User

- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Authentication**: Required
- **Response**: `200 OK`
  ```json
  {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    }
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Not authenticated
  - `404 Not Found`: User not found

#### Logout

- **URL**: `/api/auth/logout`
- **Method**: `POST`
- **Authentication**: Required
- **Response**: `200 OK`
  ```json
  {
    "message": "Logout successful"
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Not authenticated

### Payment Processing

#### Create Payment Intent

- **URL**: `/api/payment/create-payment-intent`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "amount": 1000,
    "currency": "usd",
    "description": "Payment for premium features"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "clientSecret": "pi_client_secret_xxx",
    "paymentIntentId": "pi_xxx"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid input data
  - `401 Unauthorized`: Not authenticated
  - `500 Internal Server Error`: Failed to create payment intent

#### Create Subscription

- **URL**: `/api/payment/subscription`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "priceId": "price_xxx",
    "customerId": "cus_xxx"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "subscriptionId": "sub_xxx",
    "clientSecret": "pi_client_secret_xxx"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid input data
  - `401 Unauthorized`: Not authenticated
  - `500 Internal Server Error`: Failed to create subscription

#### Create/Get Stripe Customer

- **URL**: `/api/payment/customer`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "customerId": "cus_xxx",
    "customer": {
      "id": "cus_xxx",
      "name": "John Doe",
      "email": "user@example.com"
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid input data
  - `401 Unauthorized`: Not authenticated
  - `500 Internal Server Error`: Failed to create/retrieve customer

#### Stripe Webhook Handler

- **URL**: `/api/payment/webhook`
- **Method**: `POST`
- **Authentication**: None (Stripe signature verification)
- **Request Body**: Stripe event payload
- **Response**: `200 OK`
  ```json
  {
    "received": true
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid webhook payload

### PDF Merger Tool

#### Merge PDFs

- **URL**: `/api/tools/pdf-merger/merge`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**: `multipart/form-data`
  - Files: Multiple PDF files (at least 2)
- **Response**: `200 OK`
  - Content-Type: `application/pdf`
  - Binary PDF data
- **Error Responses**:
  - `400 Bad Request`: Invalid files or missing files
  - `401 Unauthorized`: Not authenticated

### Resume Maker Tool

#### Get Resume Templates

- **URL**: `/api/tools/resume-maker/templates`
- **Method**: `GET`
- **Authentication**: None
- **Response**: `200 OK`
  ```json
  {
    "templates": [
      {
        "id": "modern",
        "name": "Modern",
        "thumbnail": "/images/templates/modern.png",
        "description": "A clean, modern resume template with a sidebar"
      },
      {
        "id": "professional",
        "name": "Professional",
        "thumbnail": "/images/templates/professional.png",
        "description": "Traditional resume format suitable for corporate environments"
      },
      {
        "id": "minimal",
        "name": "Minimal",
        "thumbnail": "/images/templates/minimal.png",
        "description": "Simple and straightforward design with minimal styling"
      },
      {
        "id": "creative",
        "name": "Creative",
        "thumbnail": "/images/templates/creative.png",
        "description": "Bold design for creative professionals"
      }
    ]
  }
  ```
- **Error Responses**:
  - `500 Internal Server Error`: Failed to fetch templates

#### Generate Resume

- **URL**: `/api/tools/resume-maker/generate`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "resumeData": {
      "personalInfo": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "123-456-7890",
        "location": "New York, NY",
        "website": "https://johndoe.com",
        "linkedin": "https://linkedin.com/in/johndoe",
        "github": "https://github.com/johndoe"
      },
      "summary": "Software Engineer with 5 years of experience...",
      "workExperience": [
        {
          "title": "Senior Developer",
          "company": "Tech Company",
          "location": "New York, NY",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "description": [
            "Led the development of a key product feature",
            "Mentored junior developers"
          ]
        }
      ],
      "education": [
        {
          "degree": "BS Computer Science",
          "institution": "Example University",
          "location": "Boston, MA",
          "graduationDate": "May 2018",
          "gpa": "3.8/4.0",
          "achievements": [
            "Dean's List",
            "Senior Project Award"
          ]
        }
      ],
      "skills": [
        "JavaScript",
        "React",
        "Node.js",
        "TypeScript"
      ],
      "projects": [
        {
          "title": "Project Name",
          "description": "A description of the project",
          "technologies": ["React", "Node.js"],
          "link": "https://project-link.com"
        }
      ],
      "certifications": [
        {
          "name": "AWS Certified Developer",
          "issuer": "Amazon Web Services",
          "date": "June 2022"
        }
      ]
    },
    "template": "modern"
  }
  ```
- **Response**: `200 OK`
  - Content-Type: `application/pdf`
  - Binary PDF data
- **Error Responses**:
  - `400 Bad Request`: Invalid resume data
  - `401 Unauthorized`: Not authenticated

## Status Codes

- `200 OK`: The request was successful
- `201 Created`: A new resource was successfully created
- `400 Bad Request`: The request was invalid or cannot be served
- `401 Unauthorized`: Authentication is required or failed
- `403 Forbidden`: The authenticated user does not have permission
- `404 Not Found`: The requested resource does not exist
- `409 Conflict`: The request conflicts with current state
- `500 Internal Server Error`: An error occurred on the server

## Data Models

### User
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user"
}
```

### Template
```json
{
  "id": "modern",
  "name": "Modern",
  "thumbnail": "/images/templates/modern.png",
  "description": "A clean, modern resume template with a sidebar"
}
```

### Format
```json
{
  "id": "jpeg",
  "name": "JPEG",
  "description": "Joint Photographic Experts Group format, good for photographs",
  "supportsTransparency": false
}
```

## Implementation Notes

- JWT tokens expire after 24 hours
- File upload size limit is 10MB
- PDF merger requires at least 2 PDF files
- Image conversion supports JPEG, PNG, WebP, and GIF formats
- Resume generation supports 4 template styles: modern, professional, minimal, and creative
