import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  console.log('Starting track-download POST request');
  
  try {
    // Parse request body
    const data = await request.json();
    console.log('Received form data:', { name: data.name, email: data.email });
    
    // Validate required fields
    if (!data.name || !data.email) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    // Add timestamp
    const downloadRecord = {
      ...data,
      timestamp: new Date(),
      date: new Date().toISOString().split('T')[0],
      userAgent: request.headers.get('user-agent') || 'Unknown',
    };
    
    console.log('Connecting to MongoDB...');
    
    // Wrap MongoDB operations in a timeout to prevent hanging
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('MongoDB connection timeout after 5000ms'));
      }, 5000);
    });
    
    // Connect to MongoDB and insert record
    const dbPromise = (async () => {
      try {
        const client = await clientPromise;
        console.log('MongoDB client connected successfully');
        
        const dbName = process.env.MONGODB_DB_NAME || 'ginie_app';
        console.log(`Using database: ${dbName}`);
        
        const db = client.db(dbName);
        const result = await db.collection('downloads').insertOne(downloadRecord);
        
        console.log(`Download record inserted with ID: ${result.insertedId}`);
        return result;
      } catch (err) {
        console.error('MongoDB operation failed:', err);
        throw err;
      }
    })();
    
    // Wait for either operation to complete or timeout
    const result = await Promise.race([dbPromise, timeoutPromise]);
    clearTimeout(timeoutId);
    
    console.log('Download successfully recorded');
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Download recorded successfully',
        id: result.insertedId
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Download tracking error:', error);
    
    // Return detailed error for debugging
    return NextResponse.json(
      { 
        error: 'Failed to record download', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// Keep the GET method unchanged
export async function GET(request) {
  try {
    // Get the search params
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    
    // Check admin password
    if (password !== process.env.DOWNLOAD_ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get downloads from MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || 'ginie_app');
    const downloads = await db.collection('downloads')
      .find({})
      .sort({ timestamp: -1 })
      .toArray();
    
    return NextResponse.json(
      { downloads },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching download records:', error);
    return NextResponse.json(
      { error: 'Failed to fetch download records', details: error.message },
      { status: 500 }
    );
  }
}