import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Print environment variables (credentials masked)
    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_URI_EXISTS: !!process.env.MONGODB_URI,
      MONGODB_URI_PREFIX: process.env.MONGODB_URI ? 
        process.env.MONGODB_URI.substring(0, 20) + '...' : 'undefined',
      MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'undefined'
    };
    
    console.log('Environment variables check:', envVars);
    
    // Check the MongoDB URI format
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined');
    }
    
    // Analyze URI components (safely)
    const uriParts = {
      isValidPrefix: uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://'),
      hasUsername: uri.includes('@') && uri.split('@')[0].split('//')[1].includes(':'),
      hasPassword: uri.includes('@') && uri.split('@')[0].split(':').length > 2,
      hasHost: uri.includes('@') && uri.split('@').length > 1,
      hasQuery: uri.includes('?'),
      containsEncodedCharacters: uri.includes('%')
    };
    
    return NextResponse.json({
      message: 'MongoDB connection string analysis',
      analysis: uriParts,
      envCheck: envVars
    }, { status: 200 });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      error: 'Debug information error',
      details: error.message
    }, { status: 500 });
  }
}