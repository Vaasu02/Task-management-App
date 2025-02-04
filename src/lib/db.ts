import mongoose from 'mongoose';
import chalk from 'chalk'; 

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  try {
    if (cached.conn) {
      console.log(chalk.green('✓ Using cached MongoDB connection'));
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      console.log(chalk.yellow('⧖ Connecting to MongoDB...'));
      cached.promise = mongoose.connect(MONGODB_URI, opts);
    }

    try {
      cached.conn = await cached.promise;
      console.log(chalk.green('✓ Successfully connected to MongoDB!'));
      // Log database name and host
      const dbName = mongoose.connection.name;
      const dbHost = mongoose.connection.host;
      console.log(chalk.blue(`📦 Database: ${dbName}`));
      console.log(chalk.blue(`🖥️  Host: ${dbHost}`));
    } catch (e) {
      cached.promise = null;
      console.error(chalk.red('✕ MongoDB connection error:'), e);
      throw e;
    }

    return cached.conn;
  } catch (error) {
    console.error(chalk.red('✕ Failed to connect to MongoDB:'), error);
    throw error;
  }
}

// Listen for connection events
mongoose.connection.on('connected', () => {
  console.log(chalk.green('✓ MongoDB connected'));
});

mongoose.connection.on('error', (err) => {
  console.error(chalk.red('✕ MongoDB connection error:'), err);
});

mongoose.connection.on('disconnected', () => {
  console.log(chalk.yellow('⚠ MongoDB disconnected'));
});

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log(chalk.yellow('✓ MongoDB connection closed through app termination'));
    process.exit(0);
  } catch (err) {
    console.error(chalk.red('✕ Error closing MongoDB connection:'), err);
    process.exit(1);
  }
}); 