import { Client } from 'cassandra-driver';
import { config } from '@/Config/App.Config';

// Initialize Cassandra client for ScyllaDB
const client = new Client({
  contactPoints: config.database.contactPoints,
  localDataCenter: config.database.datacenter,
  keyspace: config.database.keyspace,
  protocolOptions: {
    port: config.database.port,
  },
  credentials:
    config.database.username && config.database.password
      ? {
          username: config.database.username,
          password: config.database.password,
        }
      : undefined,
  pooling: {
    maxRequestsPerConnection: 32768,
  },
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await client.connect();
    console.log('[INFO] Database connection has been established successfully.');

    // Initialize keyspace and table schema
    await initializeSchema();
  } catch (error) {
    console.error('[ERROR] Unable to connect to the database:', error);
    throw error;
  }
};

/**
 * Initialize the database schema (keyspace and tables)
 */
const initializeSchema = async (): Promise<void> => {
  try {
    // Create keyspace if it doesn't exist
    const createKeyspaceQuery = `
      CREATE KEYSPACE IF NOT EXISTS ${config.database.keyspace}
      WITH replication = {
        'class': 'SimpleStrategy',
        'replication_factor': 1
      }
    `;
    await client.execute(createKeyspaceQuery);

    // Use the keyspace
    await client.execute(`USE ${config.database.keyspace}`);

    // Create users table if it doesn't exist
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY,
        email text,
        first_name text,
        last_name text,
        created_at timestamp,
        updated_at timestamp
      )
    `;
    await client.execute(createUsersTableQuery);

    // Create index on email for efficient lookups
    const createEmailIndexQuery = `
      CREATE INDEX IF NOT EXISTS users_email_idx ON users (email)
    `;
    await client.execute(createEmailIndexQuery);

    console.log('[INFO] Database schema initialized successfully');
  } catch (error) {
    console.error('[ERROR] Error initializing database schema:', error);
    throw error;
  }
};

export const closeDatabase = async (): Promise<void> => {
  try {
    await client.shutdown();
    console.log('[INFO] Database connection closed successfully.');
  } catch (error) {
    console.error('[ERROR] Error closing database connection:', error);
    throw error;
  }
};

export default client;
