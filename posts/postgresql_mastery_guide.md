---
title: 'PostgreSQL Mastery: Advanced Database Guide'
subtitle: 'Master PostgreSQL with advanced queries, indexing, and performance tuning'
readTime: '22-26 minutes'
date: '2024-03-25'
language: 'postgresql'
meta_description: 'Complete PostgreSQL guide covering advanced SQL, JSON operations, full-text search, indexing, replication, and performance optimization.'
SEO_Keywords_List: 'PostgreSQL, Postgres, database, SQL, JSON, full-text search, database optimization, PostgreSQL tutorial'
---

# PostgreSQL Mastery: Advanced Database Guide

PostgreSQL is the world's most advanced open-source relational database. This guide covers advanced features and best practices for building high-performance database applications.

## Why PostgreSQL?

- 🚀 **ACID Compliant** - Reliable transactions
- 📊 **Advanced Features** - JSON, full-text search, geospatial
- 🔒 **Robust** - Data integrity and concurrency
- 🌍 **Open Source** - Free and community-driven
- 📈 **Scalable** - From small apps to enterprise systems

## Installation

```bash
# macOS
brew install postgresql@15
brew services start postgresql@15

# Ubuntu
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql

# Connect to PostgreSQL
psql -U postgres
```

## Basic Operations

### Database Management

```sql
-- Create database
CREATE DATABASE myapp;

-- List databases
\l

-- Connect to database
\c myapp

-- Drop database
DROP DATABASE myapp;

-- Create user
CREATE USER myuser WITH PASSWORD 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE myapp TO myuser;

-- Revoke privileges
REVOKE ALL PRIVILEGES ON DATABASE myapp FROM myuser;
```

### Table Operations

```sql
-- Create table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add column
ALTER TABLE users ADD COLUMN last_login TIMESTAMP;

-- Modify column
ALTER TABLE users ALTER COLUMN email TYPE VARCHAR(150);

-- Drop column
ALTER TABLE users DROP COLUMN last_login;

-- Rename table
ALTER TABLE users RENAME TO app_users;

-- Drop table
DROP TABLE users;

-- List tables
\dt

-- Describe table
\d users
```

## Advanced Data Types

### JSON and JSONB

```sql
-- Create table with JSONB
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    attributes JSONB
);

-- Insert JSON data
INSERT INTO products (name, attributes) VALUES
    ('Laptop', '{"brand": "Dell", "ram": "16GB", "storage": "512GB SSD"}'),
    ('Phone', '{"brand": "Apple", "model": "iPhone 14", "color": "black"}');

-- Query JSON fields
SELECT name, attributes->>'brand' AS brand
FROM products;

-- Query nested JSON
SELECT name, attributes->'specs'->>'cpu' AS cpu
FROM products;

-- JSON array operations
SELECT name
FROM products
WHERE attributes->'features' @> '["bluetooth"]';

-- Update JSON field
UPDATE products
SET attributes = jsonb_set(attributes, '{ram}', '"32GB"')
WHERE id = 1;

-- Add JSON field
UPDATE products
SET attributes = attributes || '{"warranty": "2 years"}'
WHERE id = 1;

-- Remove JSON field
UPDATE products
SET attributes = attributes - 'warranty'
WHERE id = 1;
```

### Arrays

```sql
-- Create table with array
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    tags TEXT[]
);

-- Insert array data
INSERT INTO posts (title, tags) VALUES
    ('PostgreSQL Guide', ARRAY['database', 'sql', 'postgres']),
    ('Docker Tutorial', ARRAY['docker', 'containers', 'devops']);

-- Query arrays
SELECT * FROM posts WHERE 'database' = ANY(tags);

-- Array functions
SELECT title, array_length(tags, 1) AS tag_count
FROM posts;

-- Append to array
UPDATE posts
SET tags = array_append(tags, 'tutorial')
WHERE id = 1;

-- Remove from array
UPDATE posts
SET tags = array_remove(tags, 'sql')
WHERE id = 1;
```

### UUID

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table with UUID
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id INTEGER,
    token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert with auto-generated UUID
INSERT INTO sessions (user_id, token)
VALUES (1, 'abc123');
```

## Full-Text Search

```sql
-- Create table for full-text search
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    search_vector tsvector
);

-- Create GIN index for full-text search
CREATE INDEX articles_search_idx ON articles USING GIN(search_vector);

-- Insert data with search vector
INSERT INTO articles (title, content, search_vector) VALUES
    ('PostgreSQL Tutorial', 'Learn PostgreSQL database...',
     to_tsvector('english', 'PostgreSQL Tutorial Learn PostgreSQL database'));

-- Update search vector automatically
CREATE TRIGGER articles_search_update
BEFORE INSERT OR UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION
tsvector_update_trigger(search_vector, 'pg_catalog.english', title, content);

-- Search query
SELECT title, content
FROM articles
WHERE search_vector @@ to_tsquery('english', 'postgresql & database');

-- Ranked search
SELECT title, ts_rank(search_vector, query) AS rank
FROM articles, to_tsquery('english', 'postgresql & database') query
WHERE search_vector @@ query
ORDER BY rank DESC;
```

## Advanced Queries

### Window Functions

```sql
-- Row number
SELECT
    name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num
FROM employees;

-- Rank with gaps
SELECT
    name,
    department,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM employees;

-- Running total
SELECT
    date,
    amount,
    SUM(amount) OVER (ORDER BY date) as running_total
FROM sales;

-- Moving average
SELECT
    date,
    amount,
    AVG(amount) OVER (
        ORDER BY date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as moving_avg_7_days
FROM sales;

-- Lag and Lead
SELECT
    date,
    amount,
    LAG(amount, 1) OVER (ORDER BY date) as previous_day,
    LEAD(amount, 1) OVER (ORDER BY date) as next_day
FROM sales;
```

### Common Table Expressions (CTEs)

```sql
-- Basic CTE
WITH high_earners AS (
    SELECT * FROM employees WHERE salary > 100000
)
SELECT department, COUNT(*) as count
FROM high_earners
GROUP BY department;

-- Recursive CTE (Organization hierarchy)
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers
    SELECT id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case
    SELECT e.id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy
ORDER BY level, name;
```

### Lateral Joins

```sql
-- Get top 3 products per category
SELECT c.name as category, p.name as product, p.price
FROM categories c
CROSS JOIN LATERAL (
    SELECT name, price
    FROM products
    WHERE category_id = c.id
    ORDER BY price DESC
    LIMIT 3
) p;
```

## Indexing Strategies

### Index Types

```sql
-- B-tree index (default)
CREATE INDEX idx_users_email ON users(email);

-- Unique index
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Partial index
CREATE INDEX idx_active_users ON users(email)
WHERE status = 'active';

-- Composite index
CREATE INDEX idx_users_name_email ON users(last_name, first_name, email);

-- GIN index for JSON
CREATE INDEX idx_products_attributes ON products USING GIN(attributes);

-- GiST index for full-text search
CREATE INDEX idx_articles_content ON articles USING GIST(search_vector);

-- Hash index
CREATE INDEX idx_users_id_hash ON users USING HASH(id);

-- Expression index
CREATE INDEX idx_users_lower_email ON users(LOWER(email));
```

### Index Management

```sql
-- List indexes
SELECT * FROM pg_indexes WHERE tablename = 'users';

-- Analyze index usage
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
WHERE tablename = 'users';

-- Drop index
DROP INDEX idx_users_email;

-- Reindex
REINDEX TABLE users;

-- Concurrent index creation (no table lock)
CREATE INDEX CONCURRENTLY idx_users_created_at ON users(created_at);
```

## Performance Optimization

### EXPLAIN and ANALYZE

```sql
-- Explain query plan
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';

-- Analyze actual execution
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- Detailed analysis
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT u.*, p.title
FROM users u
JOIN posts p ON u.id = p.user_id
WHERE u.created_at > '2024-01-01';
```

### Query Optimization

```sql
-- Use EXISTS instead of IN for large datasets
-- Slow
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total > 1000);

-- Fast
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.user_id = u.id AND o.total > 1000
);

-- Use LIMIT for pagination
SELECT * FROM posts
ORDER BY created_at DESC
LIMIT 20 OFFSET 40;

-- Better pagination with keyset
SELECT * FROM posts
WHERE created_at < '2024-01-01'
ORDER BY created_at DESC
LIMIT 20;
```

### Vacuum and Analyze

```sql
-- Manual vacuum
VACUUM users;

-- Vacuum with analyze
VACUUM ANALYZE users;

-- Full vacuum (locks table)
VACUUM FULL users;

-- Auto-vacuum settings (postgresql.conf)
autovacuum = on
autovacuum_max_workers = 3
autovacuum_naptime = 1min
```

## Transactions and Concurrency

### Transaction Isolation Levels

```sql
-- Read Committed (default)
BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;
-- Your queries
COMMIT;

-- Repeatable Read
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- Your queries
COMMIT;

-- Serializable
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- Your queries
COMMIT;
```

### Locks

```sql
-- Explicit row lock
BEGIN;
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;

-- Advisory locks
SELECT pg_advisory_lock(123);
-- Critical section
SELECT pg_advisory_unlock(123);
```

## Replication and High Availability

### Streaming Replication Setup

```sql
-- On primary server (postgresql.conf)
wal_level = replica
max_wal_senders = 3
wal_keep_size = 64

-- Create replication user
CREATE USER replicator WITH REPLICATION ENCRYPTED PASSWORD 'password';

-- On standby server (recovery.conf)
standby_mode = 'on'
primary_conninfo = 'host=primary_host port=5432 user=replicator password=password'
```

### Logical Replication

```sql
-- On publisher
CREATE PUBLICATION my_publication FOR TABLE users, posts;

-- On subscriber
CREATE SUBSCRIPTION my_subscription
CONNECTION 'host=publisher_host dbname=mydb user=replicator password=password'
PUBLICATION my_publication;
```

## Backup and Restore

```bash
# Backup database
pg_dump mydb > mydb_backup.sql

# Backup with compression
pg_dump mydb | gzip > mydb_backup.sql.gz

# Backup specific tables
pg_dump -t users -t posts mydb > tables_backup.sql

# Restore database
psql mydb < mydb_backup.sql

# Restore compressed backup
gunzip -c mydb_backup.sql.gz | psql mydb

# Continuous archiving (PITR)
# postgresql.conf
archive_mode = on
archive_command = 'cp %p /archive/%f'
```

## Using PostgreSQL with Node.js

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  user: 'postgres',
  password: 'password',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Query
async function getUsers() {
  const result = await pool.query('SELECT * FROM users LIMIT 10');
  return result.rows;
}

// Parameterized query
async function getUserById(id) {
  const result = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

// Transaction
async function transferMoney(fromId, toId, amount) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
      [amount, fromId]
    );

    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toId]
    );

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Prepared statements
async function getUsersPrepared() {
  const queryName = 'get-users';
  const queryText = 'SELECT * FROM users WHERE status = $1';

  const result = await pool.query({
    name: queryName,
    text: queryText,
    values: ['active']
  });

  return result.rows;
}
```

## Best Practices

1. **Use Connection Pooling** - Reuse database connections
2. **Parameterize Queries** - Prevent SQL injection
3. **Create Appropriate Indexes** - Speed up queries
4. **Regular VACUUM** - Maintain database health
5. **Monitor Performance** - Use pg_stat views
6. **Backup Regularly** - Protect your data
7. **Use Constraints** - Ensure data integrity
8. **Optimize Queries** - Use EXPLAIN ANALYZE

## Conclusion

PostgreSQL is a powerful, feature-rich database system. Master these advanced concepts to build high-performance, scalable database applications.

## Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL Wiki](https://wiki.postgresql.org/)
- [pgAdmin](https://www.pgadmin.org/)
