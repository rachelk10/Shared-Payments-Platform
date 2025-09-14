# Authentication and Authorization Flows

## Overview
This document outlines the authentication and authorization flows for the Shared Payment System, implementing secure, multi-factor authentication with role-based access control.

## Authentication Flows

### 1. Primary Payer Registration Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth Service
    participant N as Notification Service
    participant DB as Database

    U->>F: Complete registration form
    F->>A: Submit registration data
    A->>DB: Validate email uniqueness
    A->>A: Hash password
    A->>DB: Create user account
    A->>N: Trigger verification email/SMS
    N-->>U: Send verification code
    U->>F: Enter verification code
    F->>A: Verify code
    A->>DB: Activate account
    A-->>F: Return JWT + refresh token
    F-->>U: Redirect to dashboard
```

### 2. Participant Onboarding Flow

```mermaid
sequenceDiagram
    participant PP as Primary Payer
    participant F as Frontend
    participant A as Auth Service
    participant N as Notification Service
    participant P as Participant

    PP->>F: Add participant (email/phone)
    F->>A: Create invitation
    A->>N: Send secure invitation link
    N-->>P: Deliver invitation
    P->>F: Access invitation link
    F->>A: Validate invitation token
    P->>F: Complete registration
    F->>A: Create participant account
    A->>N: Send 2FA setup instructions
    A-->>F: Return JWT + refresh token
    F-->>P: Show setup wizard
```

### 3. Login Flow with 2FA

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth Service
    participant N as Notification Service

    U->>F: Enter credentials
    F->>A: Submit login request
    A->>A: Validate credentials
    A->>A: Generate 2FA code
    A->>N: Send 2FA code
    N-->>U: Deliver code
    U->>F: Enter 2FA code
    F->>A: Verify 2FA code
    A-->>F: Return JWT + refresh token
    F-->>U: Access granted
```

### 4. Token Refresh Flow

```mermaid
sequenceDiagram
    participant F as Frontend
    participant A as Auth Service
    participant DB as Database

    F->>A: Send refresh token
    A->>DB: Validate refresh token
    A->>A: Generate new tokens
    A-->>F: Return new JWT + refresh token
```

## Authorization Flows

### 1. Role-Based Access Control

```mermaid
graph TB
    A[Request] --> B{Has Valid JWT?}
    B -->|No| C[Return 401]
    B -->|Yes| D{Valid Permissions?}
    D -->|No| E[Return 403]
    D -->|Yes| F[Process Request]
```

### 2. Group Access Control

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth Service
    participant G as Group Service
    participant DB as Database

    U->>F: Request group access
    F->>A: Validate token
    A->>G: Check group permissions
    G->>DB: Fetch user role in group
    G->>G: Validate permissions
    G-->>F: Grant/deny access
    F-->>U: Show/hide content
```

## Security Measures

### Password Requirements
- Minimum 10 characters
- Must include uppercase, lowercase, numbers, and special characters
- Password history prevention (last 5 passwords)
- Bcrypt hashing with salt

### Token Management
- JWT expiration: 15 minutes
- Refresh token expiration: 7 days
- Secure httpOnly cookies
- Token rotation on refresh

### 2FA Implementation
- Time-based one-time passwords (TOTP)
- SMS/Email backup codes
- Remember device option (30 days)
- Rate limiting for verification attempts

### Session Management
- Device tracking
- Concurrent session limits
- Force logout capability
- Session activity logging

## Error Handling

### Authentication Errors
- Invalid credentials
- Expired tokens
- Invalid 2FA codes
- Account lockout
- Rate limit exceeded

### Authorization Errors
- Insufficient permissions
- Invalid role
- Group access denied
- Resource not found
- Operation not allowed

## API Security Headers

```yaml
Security Headers:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Strict-Transport-Security: max-age=31536000; includeSubDomains
  - Content-Security-Policy: default-src 'self'
  - Referrer-Policy: strict-origin-when-cross-origin
```

## Compliance Measures

### Data Protection
- Personal data encryption
- Audit logging
- Data access controls
- Right to be forgotten implementation

### Security Monitoring
- Failed login attempts tracking
- Suspicious activity detection
- Real-time security alerts
- Regular security audits

### Access Logs
- Login attempts
- Permission changes
- Token refreshes
- Critical operations