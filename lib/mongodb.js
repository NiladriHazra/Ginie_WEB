import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

// Parse and validate the connection string
// This is just a temporary fix to escape the $ character
const uri = process.env.MONGODB_URI.replace('$', '%24');
console.log('MongoDB URI format check:', uri.startsWith('mongodb+srv://') ? 'Valid prefix' : 'Invalid prefix');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000, // 10 seconds
  socketTimeoutMS: 45000,  // 45 seconds
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement)
  if (!global._mongoClientPromise) {
    try {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect().catch(err => {
        console.error('MongoDB connection error:', err);
        throw err;
      });
    } catch (err) {
      console.error('Failed to initialize MongoDB client:', err);
      throw err;
    }
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  try {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  } catch (err) {
    console.error('Failed to initialize MongoDB client in production:', err);
    throw err;
  }
}

export default clientPromise;