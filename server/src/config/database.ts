import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a mock pool for development if pg fails to load
let realPool: any;
let mockPool = {
  query: async (text: string, params?: any[]) => {
    console.log('Mock database query:', { text, params });
    return { rows: [], rowCount: 0 };
  },
  connect: async () => {
    console.log('Mock database connection');
    return {
      release: () => {},
      query: async () => ({ rows: [], rowCount: 0 })
    };
  },
  on: (event: string, callback: (err: Error) => void) => {
    console.log(`Mock event listener for ${event}`);
    return mockPool;
  }
};

// Try to load the real pg module
try {
  const { Pool } = require('pg');
  
  // Create database connection pool
  realPool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DB || 'toolzone',
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 5000, // How long to wait for a connection
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  // Add event handler for pool errors
  realPool.on('error', (err: Error) => {
    console.error('Unexpected error on idle client', err);
    // Don't crash the server in development
    if (process.env.NODE_ENV === 'production') {
      process.exit(-1);
    }
  });
  
  console.log('PostgreSQL pool initialized');
} catch (err) {
  console.warn('Failed to initialize PostgreSQL pool:', err);
  console.warn('Using mock database - data will not persist!');
  realPool = null;
}

// Export the real pool if it's available, otherwise use the mock
export const pool = realPool || mockPool;

/**
 * Initialize database with required tables
 */
export const initializeDatabase = async (): Promise<void> => {
  if (!realPool) {
    console.warn('Skipping database initialization - using mock database');
    return;
  }
  
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        google_id VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        stripe_customer_id VARCHAR(255)
      )
    `);

    // Create payment_intents table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS payment_intents (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        stripe_id VARCHAR(255) NOT NULL,
        amount INTEGER NOT NULL,
        currency VARCHAR(10) NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    // Create subscriptions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        stripe_id VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL,
        price_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    // Create user_tools table for tracking tool usage
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_tools (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        tool_name VARCHAR(100) NOT NULL,
        used_at TIMESTAMP NOT NULL DEFAULT NOW(),
        parameters JSONB
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database (tables will be created later):', error);
    // Don't throw error, just log it - allows server to start without DB
  }
};

/**
 * Check database connection
 */
export const checkDatabaseConnection = async (): Promise<boolean> => {
  if (!realPool) {
    console.warn('Using mock database - connection check skipped');
    return false;
  }
  
  try {
    const client = await pool.connect();
    client.release();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    // Return false instead of throwing
    return false;
  }
}; 