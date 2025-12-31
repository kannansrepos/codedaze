---
title: 'MongoDB Complete Guide: NoSQL Database Mastery'
subtitle: 'Learn MongoDB from basics to advanced aggregation pipelines and performance optimization'
readTime: '18-22 minutes'
date: '2024-06-20'
language: 'mongodb'
meta_description: 'Master MongoDB NoSQL database with CRUD operations, aggregation pipelines, indexing, and best practices for scalable applications.'
SEO_Keywords_List: 'MongoDB, NoSQL, MongoDB tutorial, aggregation pipeline, MongoDB indexing, document database, MongoDB Atlas'
---

# MongoDB Complete Guide: NoSQL Database Mastery

MongoDB is a powerful NoSQL document database that provides high performance, high availability, and easy scalability. This guide covers everything you need to build production-ready MongoDB applications.

## Why MongoDB?

- 📄 **Document-Oriented** - Store data in flexible JSON-like documents
- 🚀 **Scalable** - Horizontal scaling with sharding
- ⚡ **High Performance** - Fast reads and writes
- 🔄 **Flexible Schema** - Adapt to changing requirements
- 🌍 **Distributed** - Built-in replication and high availability

## Installation and Setup

```bash
# Install MongoDB (macOS)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Connect to MongoDB shell
mongosh
```

## CRUD Operations

### Create (Insert)

```javascript
// Insert one document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York",
    zipCode: "10001"
  },
  hobbies: ["reading", "gaming", "coding"],
  createdAt: new Date()
});

// Insert multiple documents
db.users.insertMany([
  {
    name: "Jane Smith",
    email: "jane@example.com",
    age: 28,
    hobbies: ["painting", "yoga"]
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    age: 35,
    hobbies: ["photography", "travel"]
  }
]);
```

### Read (Find)

```javascript
// Find all documents
db.users.find();

// Find with query
db.users.find({ age: { $gte: 30 } });

// Find one document
db.users.findOne({ email: "john@example.com" });

// Projection (select specific fields)
db.users.find(
  { age: { $gte: 30 } },
  { name: 1, email: 1, _id: 0 }
);

// Sorting
db.users.find().sort({ age: -1 }); // Descending

// Limit and Skip (pagination)
db.users.find()
  .skip(10)
  .limit(5);
```

### Update

```javascript
// Update one document
db.users.updateOne(
  { email: "john@example.com" },
  {
    $set: { age: 31 },
    $push: { hobbies: "swimming" }
  }
);

// Update multiple documents
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { status: "young" } }
);

// Replace entire document
db.users.replaceOne(
  { email: "john@example.com" },
  {
    name: "John Doe",
    email: "john@example.com",
    age: 31,
    status: "active"
  }
);

// Upsert (insert if not exists)
db.users.updateOne(
  { email: "new@example.com" },
  { $set: { name: "New User", age: 25 } },
  { upsert: true }
);
```

### Delete

```javascript
// Delete one document
db.users.deleteOne({ email: "john@example.com" });

// Delete multiple documents
db.users.deleteMany({ age: { $lt: 18 } });

// Delete all documents in collection
db.users.deleteMany({});
```

## Query Operators

### Comparison Operators

```javascript
// $eq, $ne, $gt, $gte, $lt, $lte
db.users.find({ age: { $gte: 25, $lte: 35 } });

// $in, $nin
db.users.find({ status: { $in: ["active", "pending"] } });
```

### Logical Operators

```javascript
// $and
db.users.find({
  $and: [
    { age: { $gte: 25 } },
    { status: "active" }
  ]
});

// $or
db.users.find({
  $or: [
    { age: { $lt: 25 } },
    { age: { $gt: 60 } }
  ]
});

// $not
db.users.find({ age: { $not: { $gte: 30 } } });
```

### Element Operators

```javascript
// $exists
db.users.find({ phone: { $exists: true } });

// $type
db.users.find({ age: { $type: "number" } });
```

### Array Operators

```javascript
// $all - array contains all elements
db.users.find({ hobbies: { $all: ["reading", "coding"] } });

// $elemMatch - array element matches condition
db.orders.find({
  items: {
    $elemMatch: { price: { $gte: 100 }, quantity: { $gte: 2 } }
  }
});

// $size - array has specific length
db.users.find({ hobbies: { $size: 3 } });
```

## Aggregation Pipeline

### Basic Aggregation

```javascript
db.orders.aggregate([
  // Stage 1: Match documents
  { $match: { status: "completed" } },

  // Stage 2: Group and calculate
  {
    $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$amount" },
      orderCount: { $sum: 1 },
      avgOrderValue: { $avg: "$amount" }
    }
  },

  // Stage 3: Sort results
  { $sort: { totalSpent: -1 } },

  // Stage 4: Limit results
  { $limit: 10 }
]);
```

### Advanced Aggregation

```javascript
db.sales.aggregate([
  // Unwind array field
  { $unwind: "$items" },

  // Lookup (join) with products collection
  {
    $lookup: {
      from: "products",
      localField: "items.productId",
      foreignField: "_id",
      as: "productDetails"
    }
  },

  // Project (reshape documents)
  {
    $project: {
      orderId: 1,
      productName: { $arrayElemAt: ["$productDetails.name", 0] },
      quantity: "$items.quantity",
      revenue: { $multiply: ["$items.quantity", "$items.price"] }
    }
  },

  // Group by product
  {
    $group: {
      _id: "$productName",
      totalQuantity: { $sum: "$quantity" },
      totalRevenue: { $sum: "$revenue" }
    }
  },

  // Sort by revenue
  { $sort: { totalRevenue: -1 } }
]);
```

### Date Aggregation

```javascript
db.orders.aggregate([
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      },
      totalSales: { $sum: "$amount" },
      orderCount: { $sum: 1 }
    }
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
]);
```

## Indexing

### Creating Indexes

```javascript
// Single field index
db.users.createIndex({ email: 1 }); // 1 for ascending, -1 for descending

// Compound index
db.users.createIndex({ age: 1, city: 1 });

// Unique index
db.users.createIndex({ email: 1 }, { unique: true });

// Text index for full-text search
db.articles.createIndex({ title: "text", content: "text" });

// Geospatial index
db.locations.createIndex({ coordinates: "2dsphere" });

// TTL index (auto-delete after time)
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
);
```

### Index Management

```javascript
// List all indexes
db.users.getIndexes();

// Drop an index
db.users.dropIndex("email_1");

// Analyze query performance
db.users.find({ email: "john@example.com" }).explain("executionStats");
```

## Schema Validation

```javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "age"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+$",
          description: "must be a valid email"
        },
        age: {
          bsonType: "int",
          minimum: 0,
          maximum: 120,
          description: "must be an integer between 0 and 120"
        },
        status: {
          enum: ["active", "inactive", "pending"],
          description: "can only be one of the enum values"
        }
      }
    }
  }
});
```

## Transactions

```javascript
const session = db.getMongo().startSession();
session.startTransaction();

try {
  const accountsCollection = session.getDatabase("bank").accounts;

  // Debit from account A
  accountsCollection.updateOne(
    { accountId: "A" },
    { $inc: { balance: -100 } },
    { session }
  );

  // Credit to account B
  accountsCollection.updateOne(
    { accountId: "B" },
    { $inc: { balance: 100 } },
    { session }
  );

  session.commitTransaction();
} catch (error) {
  session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

## Using MongoDB with Node.js

```javascript
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('myapp');
    const users = database.collection('users');

    // Insert
    const result = await users.insertOne({
      name: "John Doe",
      email: "john@example.com",
      age: 30
    });
    console.log(`Inserted document with _id: ${result.insertedId}`);

    // Find
    const user = await users.findOne({ email: "john@example.com" });
    console.log(user);

    // Update
    await users.updateOne(
      { email: "john@example.com" },
      { $set: { age: 31 } }
    );

    // Delete
    await users.deleteOne({ email: "john@example.com" });

  } finally {
    await client.close();
  }
}

run().catch(console.error);
```

## Best Practices

### 1. Design for Your Query Patterns

```javascript
// Embed related data for frequently accessed together
{
  _id: ObjectId("..."),
  title: "Blog Post",
  author: {
    name: "John Doe",
    email: "john@example.com"
  },
  comments: [
    { user: "Jane", text: "Great post!" },
    { user: "Bob", text: "Thanks for sharing" }
  ]
}
```

### 2. Use Appropriate Data Types

```javascript
// Good
{
  age: 30,  // Number
  createdAt: new Date(),  // Date
  isActive: true  // Boolean
}

// Bad
{
  age: "30",  // String
  createdAt: "2024-01-01",  // String
  isActive: "true"  // String
}
```

### 3. Limit Document Size

```javascript
// Keep documents under 16MB
// Use references for large arrays
{
  userId: ObjectId("..."),
  orderIds: [ObjectId("..."), ObjectId("...")]  // References
}
```

### 4. Use Projection

```javascript
// Only fetch needed fields
db.users.find(
  { status: "active" },
  { name: 1, email: 1, _id: 0 }
);
```

## Performance Optimization

### 1. Use Covered Queries

```javascript
// Index covers the query
db.users.createIndex({ age: 1, name: 1 });
db.users.find({ age: 30 }, { name: 1, _id: 0 });
```

### 2. Avoid Large Skip Values

```javascript
// Bad for large skip values
db.users.find().skip(10000).limit(10);

// Better: Use range queries
db.users.find({ _id: { $gt: lastSeenId } }).limit(10);
```

### 3. Use Aggregation Pipeline Optimization

```javascript
// Put $match and $sort early in pipeline
db.orders.aggregate([
  { $match: { status: "completed" } },  // Filter early
  { $sort: { amount: -1 } },  // Sort early
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
]);
```

## Conclusion

MongoDB provides a flexible, scalable solution for modern applications. Master these concepts to build high-performance NoSQL database applications.

## Resources

- [MongoDB Official Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
