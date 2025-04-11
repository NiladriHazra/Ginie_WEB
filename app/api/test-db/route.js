import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB_NAME || 'ginie_app';
    
    // Just connect and get the database info
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      database: dbName,
      collections: collections.map(c => c.name)
    }, { status: 200 });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json({
      error: 'Database connection failed',
      details: error.message
    }, { status: 500 });
  }
}