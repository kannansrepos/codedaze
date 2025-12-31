---
title: 'SQL Mastery: From Basics to Advanced Queries'
subtitle: 'Complete guide to SQL with practical examples and optimization techniques'
readTime: '20-25 minutes'
date: '2024-07-10'
language: 'sql'
meta_description: 'Master SQL with this comprehensive guide covering SELECT, JOIN, subqueries, indexes, and query optimization for better database performance.'
SEO_Keywords_List: 'SQL, SQL tutorial, database queries, SQL joins, SQL optimization, database indexing, SQL best practices'
---

# SQL Mastery: From Basics to Advanced Queries

SQL (Structured Query Language) is the standard language for managing relational databases. This guide covers everything from basic queries to advanced optimization techniques.

## Why Learn SQL?

- 📊 **Universal** - Works across all major databases
- 💼 **In-Demand** - Essential skill for developers and analysts
- 🔍 **Powerful** - Query millions of records efficiently
- 📈 **Scalable** - From small apps to enterprise systems

## Basic SQL Queries

### SELECT Statement

```sql
-- Select all columns
SELECT * FROM employees;

-- Select specific columns
SELECT first_name, last_name, salary
FROM employees;

-- Select with alias
SELECT
    first_name AS "First Name",
    last_name AS "Last Name",
    salary * 12 AS "Annual Salary"
FROM employees;
```

### WHERE Clause

```sql
-- Filter with conditions
SELECT * FROM employees
WHERE department = 'IT' AND salary > 50000;

-- Using IN operator
SELECT * FROM employees
WHERE department IN ('IT', 'HR', 'Finance');

-- Using LIKE for pattern matching
SELECT * FROM employees
WHERE last_name LIKE 'S%';  -- Starts with S

-- Using BETWEEN
SELECT * FROM employees
WHERE salary BETWEEN 40000 AND 80000;
```

## Joins: Combining Tables

### INNER JOIN

```sql
SELECT
    e.first_name,
    e.last_name,
    d.department_name,
    e.salary
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
```

### LEFT JOIN

```sql
-- Get all employees, even those without departments
SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
```

### RIGHT JOIN

```sql
-- Get all departments, even those without employees
SELECT
    d.department_name,
    COUNT(e.id) as employee_count
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id
GROUP BY d.department_name;
```

### FULL OUTER JOIN

```sql
-- Get all records from both tables
SELECT
    e.first_name,
    d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;
```

## Aggregate Functions

```sql
-- COUNT, SUM, AVG, MIN, MAX
SELECT
    department_id,
    COUNT(*) as employee_count,
    AVG(salary) as avg_salary,
    MIN(salary) as min_salary,
    MAX(salary) as max_salary,
    SUM(salary) as total_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 60000
ORDER BY avg_salary DESC;
```

## Subqueries

### Subquery in WHERE Clause

```sql
-- Find employees earning more than average
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary) FROM employees
);
```

### Subquery in FROM Clause

```sql
-- Use subquery as a table
SELECT dept_name, avg_sal
FROM (
    SELECT
        d.department_name as dept_name,
        AVG(e.salary) as avg_sal
    FROM employees e
    JOIN departments d ON e.department_id = d.id
    GROUP BY d.department_name
) AS dept_salaries
WHERE avg_sal > 70000;
```

### Correlated Subquery

```sql
-- Find employees earning more than their department average
SELECT e1.first_name, e1.last_name, e1.salary, e1.department_id
FROM employees e1
WHERE salary > (
    SELECT AVG(salary)
    FROM employees e2
    WHERE e2.department_id = e1.department_id
);
```

## Common Table Expressions (CTEs)

```sql
-- Using WITH clause for better readability
WITH DepartmentStats AS (
    SELECT
        department_id,
        AVG(salary) as avg_salary,
        COUNT(*) as emp_count
    FROM employees
    GROUP BY department_id
)
SELECT
    d.department_name,
    ds.avg_salary,
    ds.emp_count
FROM DepartmentStats ds
JOIN departments d ON ds.department_id = d.id
WHERE ds.avg_salary > 60000;
```

### Recursive CTE

```sql
-- Find employee hierarchy
WITH RECURSIVE EmployeeHierarchy AS (
    -- Base case: top-level managers
    SELECT id, first_name, last_name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: employees reporting to managers
    SELECT e.id, e.first_name, e.last_name, e.manager_id, eh.level + 1
    FROM employees e
    INNER JOIN EmployeeHierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM EmployeeHierarchy
ORDER BY level, last_name;
```

## Window Functions

```sql
-- ROW_NUMBER, RANK, DENSE_RANK
SELECT
    first_name,
    last_name,
    department_id,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) as row_num,
    RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as dense_rank
FROM employees;

-- Running total
SELECT
    order_date,
    amount,
    SUM(amount) OVER (ORDER BY order_date) as running_total
FROM orders;

-- Moving average
SELECT
    order_date,
    amount,
    AVG(amount) OVER (
        ORDER BY order_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) as moving_avg_3_days
FROM orders;
```

## Indexes for Performance

### Creating Indexes

```sql
-- Single column index
CREATE INDEX idx_employees_last_name
ON employees(last_name);

-- Composite index
CREATE INDEX idx_employees_dept_salary
ON employees(department_id, salary);

-- Unique index
CREATE UNIQUE INDEX idx_employees_email
ON employees(email);

-- Partial index (PostgreSQL)
CREATE INDEX idx_active_employees
ON employees(last_name)
WHERE status = 'active';
```

### Analyzing Index Usage

```sql
-- PostgreSQL
EXPLAIN ANALYZE
SELECT * FROM employees WHERE last_name = 'Smith';

-- MySQL
EXPLAIN
SELECT * FROM employees WHERE last_name = 'Smith';
```

## Transactions

```sql
-- Start transaction
BEGIN TRANSACTION;

-- Perform operations
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Commit if successful
COMMIT;

-- Or rollback if error
ROLLBACK;
```

### Transaction Isolation Levels

```sql
-- Set isolation level
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

BEGIN TRANSACTION;
-- Your queries here
COMMIT;
```

## Advanced Techniques

### CASE Statements

```sql
SELECT
    first_name,
    last_name,
    salary,
    CASE
        WHEN salary < 40000 THEN 'Low'
        WHEN salary BETWEEN 40000 AND 80000 THEN 'Medium'
        WHEN salary > 80000 THEN 'High'
        ELSE 'Unknown'
    END as salary_category
FROM employees;
```

### PIVOT (SQL Server)

```sql
SELECT *
FROM (
    SELECT department_name, year, revenue
    FROM sales
) AS SourceTable
PIVOT (
    SUM(revenue)
    FOR year IN ([2021], [2022], [2023])
) AS PivotTable;
```

### JSON Functions (PostgreSQL)

```sql
-- Query JSON data
SELECT
    id,
    data->>'name' as name,
    data->>'email' as email
FROM users
WHERE data->>'city' = 'New York';

-- Aggregate JSON
SELECT
    department_id,
    json_agg(json_build_object(
        'name', first_name || ' ' || last_name,
        'salary', salary
    )) as employees
FROM employees
GROUP BY department_id;
```

## Query Optimization Tips

### 1. Use EXPLAIN to Analyze Queries

```sql
EXPLAIN ANALYZE
SELECT e.*, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.salary > 50000;
```

### 2. Avoid SELECT *

```sql
-- Bad
SELECT * FROM employees;

-- Good
SELECT id, first_name, last_name, email FROM employees;
```

### 3. Use EXISTS Instead of IN for Large Datasets

```sql
-- Less efficient
SELECT * FROM employees
WHERE department_id IN (SELECT id FROM departments WHERE location = 'NY');

-- More efficient
SELECT * FROM employees e
WHERE EXISTS (
    SELECT 1 FROM departments d
    WHERE d.id = e.department_id AND d.location = 'NY'
);
```

### 4. Limit Results

```sql
-- PostgreSQL, MySQL
SELECT * FROM employees
ORDER BY hire_date DESC
LIMIT 10;

-- SQL Server
SELECT TOP 10 * FROM employees
ORDER BY hire_date DESC;
```

## Common Patterns

### Pagination

```sql
-- PostgreSQL, MySQL
SELECT * FROM employees
ORDER BY id
LIMIT 20 OFFSET 40;  -- Page 3, 20 items per page

-- SQL Server
SELECT * FROM employees
ORDER BY id
OFFSET 40 ROWS
FETCH NEXT 20 ROWS ONLY;
```

### Upsert (Insert or Update)

```sql
-- PostgreSQL
INSERT INTO employees (id, first_name, last_name, email)
VALUES (1, 'John', 'Doe', 'john@example.com')
ON CONFLICT (id)
DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    email = EXCLUDED.email;

-- MySQL
INSERT INTO employees (id, first_name, last_name, email)
VALUES (1, 'John', 'Doe', 'john@example.com')
ON DUPLICATE KEY UPDATE
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    email = VALUES(email);
```

### Finding Duplicates

```sql
SELECT email, COUNT(*) as count
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;
```

### Deleting Duplicates

```sql
-- Keep only the first occurrence
DELETE FROM employees
WHERE id NOT IN (
    SELECT MIN(id)
    FROM employees
    GROUP BY email
);
```

## Best Practices

1. **Use Meaningful Names** - Clear table and column names
2. **Normalize Data** - Reduce redundancy
3. **Index Wisely** - Don't over-index
4. **Use Constraints** - PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK
5. **Parameterize Queries** - Prevent SQL injection
6. **Regular Backups** - Protect your data
7. **Monitor Performance** - Use query profiling tools

## Conclusion

SQL is a powerful language for data manipulation and analysis. Master these concepts to write efficient, maintainable database queries that scale with your application.

## Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [SQL Server Documentation](https://docs.microsoft.com/en-us/sql/)
