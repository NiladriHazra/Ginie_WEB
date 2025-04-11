import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    // Hard-code the connection string with properly encoded special characters
    const uri = "mongodb+srv://niladrihazra100xDevs:%24Humi192003@cluster0.ydx27wq.mongodb.net/ginie_app?retryWrites=true&w=majority";
    
    console.log('Testing direct MongoDB connection...');
    
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    await client.connect();
    console.log('Connected to MongoDB!');
    
    const db = client.db('ginie_app');
    const collection = db.collection('test');
    
    // Insert a test document
    const result = await collection.insertOne({
      test: true,
      timestamp: new Date()
    });
    
    await client.close();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      insertedId: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Test connection error:', error);
    
    return NextResponse.json({
      error: 'Connection test failed',
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}