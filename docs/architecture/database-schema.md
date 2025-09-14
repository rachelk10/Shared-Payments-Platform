# Database Schema Design

## Overview
The system uses MongoDB as the primary database with a focus on scalability, performance, and maintainability. This design incorporates sharding strategies, efficient indexing, and data lifecycle management.

## Design Optimizations

### Performance Optimizations
1. Sharding Strategy
   - Users collection: Shard by user_id
   - Payments collection: Shard by group_id
   - Meters collection: Shard by group_id
   - Enable zone sharding for geographical distribution

2. Caching Layer
   - Redis cache for:
     - User profiles
     - Group configurations
     - Current meter readings
     - Payment summaries
   - Cache invalidation on write operations
   - TTL-based cache expiry

3. Compound Indexes
   - Optimize for common query patterns
   - Balance between write performance and query efficiency

### Data Lifecycle Management
1. Archival Strategy
   - Move completed payments older than 2 months to archive collection
   - Maintain summarized historical data
   - Implement data compression for archived records

2. TTL Indexes
   - Automatic cleanup of expired sessions
   - Remove unverified user registrations after 24 hours
   - Clear unused payment tokens after expiration

## Core Collections

### Users Collection
```json
{
  "_id": "ObjectId",
  "role": "enum('primary_payer', 'participant', 'admin')",
  "email": "string",
  "phone": "string",
  "name": "string",
  "passwordHash": "string",
  "twoFactorEnabled": "boolean",
  "twoFactorMethod": "enum('sms', 'email')",
  "notificationPreferences": {
    "email": "boolean",
    "sms": "boolean",
    "voice": "boolean",
    "push": "boolean"
  },
  "bankAccount": {
    "accountNumber": "string(encrypted)",
    "bankCode": "string",
    "branchNumber": "string"
  },
  "version": "number",
  "lastNotified": "date",
  "createdAt": "date",
  "updatedAt": "date",
  "lastLogin": "date"
}
```

### Groups Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "primaryPayerId": "ObjectId(ref: Users)",
  "type": "enum('apartment', 'office', 'other')",
  "participants": [{
    "userId": "ObjectId(ref: Users)",
    "role": "enum('member', 'meter_reader')",
    "joinDate": "date",
    "status": "enum('active', 'pending', 'inactive')",
    "distributionPercentage": "number",
    "fixedAmount": "number"
  }],
  "paymentSettings": {
    "distributionMethod": "enum('equal', 'percentage', 'fixed', 'meter')",
    "billingDay": "number",
    "reminderDays": ["number"],
    "autoApproval": "boolean",
    "paymentDueOffset": "number"
  },
  "meters": [{
    "meterId": "string",
    "type": "enum('water', 'electricity', 'gas')",
    "shared": "boolean",
    "readers": ["ObjectId(ref: Users)"],
    "distribution": [{
      "userId": "ObjectId(ref: Users)",
      "percentage": "number"
    }],
    "lastReading": {
      "value": "number",
      "date": "date"
    }
  }],
  "version": "number",
  "activeParticipants": "number",
  "lastBillingDate": "date",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Meters Collection
```json
{
  "_id": "ObjectId",
  "groupId": "ObjectId(ref: Groups)",
  "meterId": "string",
  "readings": [{
    "readingDate": "date",
    "value": "number",
    "readBy": "ObjectId(ref: Users)",
    "consumption": "number",
    "verified": "boolean",
    "anomalyDetected": "boolean",
    "anomalyReason": "string"
  }],
  "lastReading": {
    "value": "number",
    "date": "date",
    "consumption": "number"
  },
  "averageConsumption": "number",
  "version": "number",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Payments Collection
```json
{
  "_id": "ObjectId",
  "groupId": "ObjectId(ref: Groups)",
  "type": "enum('regular', 'one_time')",
  "status": "enum('pending', 'approved', 'processing', 'completed', 'failed')",
  "totalAmount": "number",
  "description": "string",
  "distributions": [{
    "userId": "ObjectId(ref: Users)",
    "amount": "number",
    "status": "enum('pending', 'paid', 'failed')",
    "paymentMethod": "string",
    "paymentToken": "string",
    "transactionId": "string",
    "retryCount": "number"
  }],
  "meterReadings": [{
    "meterId": "string",
    "reading": "number",
    "consumption": "number",
    "amount": "number"
  }],
  "version": "number",
  "scheduledDate": "date",
  "processedDate": "date",
  "dueDate": "date",
  "remindersSent": "number",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Transactions Collection
```json
{
  "_id": "ObjectId",
  "paymentId": "ObjectId(ref: Payments)",
  "userId": "ObjectId(ref: Users)",
  "type": "enum('charge', 'refund')",
  "amount": "number",
  "status": "enum('pending', 'completed', 'failed')",
  "gatewayResponse": "object",
  "receiptNumber": "string",
  "receiptUrl": "string",
  "retryCount": "number",
  "errorDetails": "object",
  "version": "number",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Notifications Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId(ref: Users)",
  "type": "enum('meter_reminder', 'payment_due', 'approval_needed', 'payment_processed')",
  "status": "enum('pending', 'sent', 'failed')",
  "channel": "enum('email', 'sms', 'voice', 'push')",
  "content": {
    "subject": "string",
    "body": "string",
    "templateId": "string"
  },
  "metadata": "object",
  "retryCount": "number",
  "priority": "number",
  "expiresAt": "date",
  "sentAt": "date",
  "createdAt": "date"
}
```

## Optimized Indexes

### Users Collection
```javascript
{
  "email": 1,                  // unique
  "phone": 1,                  // unique
  "role": 1,                   // frequent queries
  "lastLogin": 1,              // user activity tracking
  "createdAt": 1              // data lifecycle
}
```

### Groups Collection
```javascript
{
  "primaryPayerId": 1,         // frequent lookups
  "participants.userId": 1,    // participant queries
  "meters.meterId": 1,        // meter lookups
  "lastBillingDate": 1,       // billing operations
  "updatedAt": 1              // change tracking
}
```

### Meters Collection
```javascript
{
  "groupId": 1,               // group association
  "meterId": 1,               // direct lookups
  "readings.readingDate": 1,  // historical queries
  "lastReading.date": 1      // recent readings
}
```

### Payments Collection
```javascript
{
  "groupId": 1,                     // group association
  "status": 1,                      // payment tracking
  "scheduledDate": 1,               // payment scheduling
  "distributions.userId": 1,        // user payments
  "createdAt": 1                   // historical tracking
}
```

### Transactions Collection
```javascript
{
  "paymentId": 1,              // payment association
  "userId": 1,                 // user transactions
  "status": 1,                 // transaction tracking
  "createdAt": 1              // historical queries
}
```

### Notifications Collection
```javascript
{
  "userId": 1,                 // user notifications
  "status": 1,                 // notification tracking
  "type": 1,                   // notification filtering
  "expiresAt": 1,             // TTL index
  "createdAt": 1              // historical tracking
}
```

## Data Relationships and Constraints
- Users -> Groups (1:N) through primaryPayerId
- Users -> Groups (M:N) through participants
- Groups -> Meters (1:N)
- Groups -> Payments (1:N)
- Payments -> Transactions (1:N)
- Users -> Notifications (1:N)

## Validation and Data Integrity
1. Schema Validation
   - Enforce document structure
   - Validate enum values
   - Check data types and ranges

2. Data Security
   - Encrypt sensitive fields at rest
   - Mask sensitive data in logs
   - Implement field-level encryption

3. Consistency Rules
   - All amounts in cents/agorot
   - Dates in UTC
   - Versioning for conflict resolution
   - Audit trails for changes

## Change Management
1. Schema Versioning
   - Track schema versions
   - Support backwards compatibility
   - Migration scripts for updates

2. Change Streams
   - Real-time updates
   - Event-driven architecture
   - Audit logging

3. Monitoring
   - Index usage statistics
   - Query performance metrics
   - Storage utilization tracking