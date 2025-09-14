# API Endpoints Specification

## Overview
RESTful API endpoints for the Shared Payment System, following OpenAPI 3.0 specification.

## Base URL
```
Production: https://api.sharedpayments.com/v1
Staging: https://api-staging.sharedpayments.com/v1
```

## Common Headers
```yaml
Request Headers:
  Authorization: Bearer {jwt_token}
  Content-Type: application/json
  Accept: application/json
  X-Request-ID: uuid
  X-Client-Version: string

Response Headers:
  Content-Type: application/json
  X-Request-ID: uuid
  X-Rate-Limit-Remaining: number
```

## Authentication Endpoints

### User Registration
```yaml
POST /auth/register
Request:
  {
    "email": "string",
    "phone": "string",
    "name": "string",
    "password": "string",
    "role": "primary_payer|participant",
    "notificationPreferences": {
      "email": boolean,
      "sms": boolean,
      "voice": boolean,
      "push": boolean
    }
  }
Response:
  201:
    {
      "userId": "string",
      "verificationId": "string",
      "message": "Verification code sent"
    }
  400:
    {
      "error": "Validation error",
      "details": [...errors]
    }
```

### Verify Registration
```yaml
POST /auth/verify
Request:
  {
    "verificationId": "string",
    "code": "string"
  }
Response:
  200:
    {
      "accessToken": "string",
      "refreshToken": "string",
      "user": {
        "id": "string",
        "email": "string",
        "name": "string",
        "role": "string"
      }
    }
```

### Login
```yaml
POST /auth/login
Request:
  {
    "email": "string",
    "password": "string"
  }
Response:
  200:
    {
      "twoFactorRequired": true,
      "twoFactorId": "string"
    }
  401:
    {
      "error": "Invalid credentials"
    }
```

### 2FA Verification
```yaml
POST /auth/2fa/verify
Request:
  {
    "twoFactorId": "string",
    "code": "string"
  }
Response:
  200:
    {
      "accessToken": "string",
      "refreshToken": "string"
    }
```

## User Management

### Get User Profile
```yaml
GET /users/me
Response:
  200:
    {
      "id": "string",
      "email": "string",
      "name": "string",
      "phone": "string",
      "role": "string",
      "notificationPreferences": {...},
      "groups": [
        {
          "id": "string",
          "name": "string",
          "role": "string"
        }
      ]
    }
```

### Update User Profile
```yaml
PATCH /users/me
Request:
  {
    "name": "string",
    "phone": "string",
    "notificationPreferences": {...}
  }
Response:
  200:
    {
      "id": "string",
      "message": "Profile updated"
    }
```

## Group Management

### Create Group
```yaml
POST /groups
Request:
  {
    "name": "string",
    "type": "apartment|office|other",
    "paymentSettings": {
      "distributionMethod": "equal|percentage|fixed|meter",
      "billingDay": number,
      "reminderDays": [number],
      "autoApproval": boolean
    }
  }
Response:
  201:
    {
      "groupId": "string",
      "inviteLink": "string"
    }
```

### Add Participant to Group
```yaml
POST /groups/{groupId}/participants
Request:
  {
    "email": "string",
    "role": "member|meter_reader",
    "distributionPercentage": number,
    "fixedAmount": number
  }
Response:
  201:
    {
      "participantId": "string",
      "inviteLink": "string"
    }
```

### Add Meter to Group
```yaml
POST /groups/{groupId}/meters
Request:
  {
    "type": "water|electricity|gas",
    "shared": boolean,
    "readers": ["userId"],
    "distribution": [
      {
        "userId": "string",
        "percentage": number
      }
    ]
  }
Response:
  201:
    {
      "meterId": "string"
    }
```

## Meter Reading Management

### Submit Meter Reading
```yaml
POST /meters/{meterId}/readings
Request:
  {
    "value": number,
    "readingDate": "string"
  }
Response:
  201:
    {
      "readingId": "string",
      "consumption": number,
      "anomalyDetected": boolean
    }
```

### Get Meter History
```yaml
GET /meters/{meterId}/readings
Query:
  startDate: string
  endDate: string
Response:
  200:
    {
      "readings": [
        {
          "id": "string",
          "value": number,
          "readingDate": "string",
          "consumption": number,
          "readBy": "string"
        }
      ]
    }
```

## Payment Management

### Create Payment
```yaml
POST /groups/{groupId}/payments
Request:
  {
    "type": "regular|one_time",
    "totalAmount": number,
    "description": "string",
    "scheduledDate": "string",
    "meterReadings": [
      {
        "meterId": "string",
        "reading": number
      }
    ]
  }
Response:
  201:
    {
      "paymentId": "string",
      "distributions": [
        {
          "userId": "string",
          "amount": number
        }
      ]
    }
```

### Get Payment Details
```yaml
GET /payments/{paymentId}
Response:
  200:
    {
      "id": "string",
      "groupId": "string",
      "type": "string",
      "status": "string",
      "totalAmount": number,
      "description": "string",
      "distributions": [...],
      "meterReadings": [...],
      "scheduledDate": "string",
      "processedDate": "string"
    }
```

### Approve Payment
```yaml
POST /payments/{paymentId}/approve
Response:
  200:
    {
      "status": "approved",
      "processedDate": "string"
    }
```

## Transaction Management

### Get Transaction History
```yaml
GET /transactions
Query:
  startDate: string
  endDate: string
  type: string
  status: string
Response:
  200:
    {
      "transactions": [
        {
          "id": "string",
          "paymentId": "string",
          "type": "string",
          "amount": number,
          "status": "string",
          "receiptUrl": "string",
          "createdAt": "string"
        }
      ],
      "pagination": {
        "total": number,
        "page": number,
        "pageSize": number
      }
    }
```

## Notification Management

### Get Notifications
```yaml
GET /notifications
Query:
  type: string
  status: string
Response:
  200:
    {
      "notifications": [
        {
          "id": "string",
          "type": "string",
          "content": {...},
          "status": "string",
          "createdAt": "string"
        }
      ]
    }
```

### Update Notification Preferences
```yaml
PATCH /notifications/preferences
Request:
  {
    "email": boolean,
    "sms": boolean,
    "voice": boolean,
    "push": boolean
  }
Response:
  200:
    {
      "message": "Preferences updated"
    }
```

## Error Responses

### Common Error Format
```yaml
Error Response:
  {
    "error": {
      "code": "string",
      "message": "string",
      "details": [...],
      "requestId": "string"
    }
  }

Status Codes:
  400: Bad Request
  401: Unauthorized
  403: Forbidden
  404: Not Found
  422: Unprocessable Entity
  429: Too Many Requests
  500: Internal Server Error
```

## Rate Limiting

```yaml
Rate Limits:
  - Authentication endpoints: 10 requests per minute
  - User endpoints: 60 requests per minute
  - Group endpoints: 30 requests per minute
  - Payment endpoints: 30 requests per minute
  - Meter reading endpoints: 60 requests per minute

Headers:
  X-Rate-Limit-Limit: number
  X-Rate-Limit-Remaining: number
  X-Rate-Limit-Reset: timestamp
```

## Versioning Strategy

- URL versioning (/v1/)
- Custom header versioning (X-API-Version)
- Backwards compatibility maintained for one major version
- Deprecation notices via response headers