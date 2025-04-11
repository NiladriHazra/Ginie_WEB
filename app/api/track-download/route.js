import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email) {
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
    
    // Connection debug log
    console.log('Attempting to connect to MongoDB...');
    
    // Store the download information in MongoDB
    const client = await clientPromise;
    console.log('MongoDB connection established');
    
    const db = client.db(process.env.MONGODB_DB_NAME);
    console.log(`Using database: ${process.env.MONGODB_DB_NAME}`);
    
    const result = await db.collection('downloads').insertOne(downloadRecord);
    
    console.log(`New download recorded: ${data.name} (${data.email})`);
    
    return NextResponse.json(
      { success: true, message: 'Download recorded successfully', id: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Download tracking error details:', error);
    return NextResponse.json(
      { error: 'Failed to record download', details: error.message },
      { status: 500 }
    );
  }
}

// This GET endpoint allows admin to view download records
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
    const db = client.db(process.env.MONGODB_DB_NAME);
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
      { error: 'Failed to fetch download records' },
      { status: 500 }
    );
  }
}