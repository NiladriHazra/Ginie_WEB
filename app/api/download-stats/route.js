import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

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
    
    // Get client
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    
    // Get total downloads
    const totalDownloads = await db.collection('downloads').countDocuments();
    
    // Get downloads by date (last 7 days)
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    const dailyStats = await db.collection('downloads').aggregate([
      {
        $match: {
          timestamp: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();
    
    return NextResponse.json(
      {
        totalDownloads,
        dailyStats: dailyStats.map(stat => ({
          date: stat._id,
          count: stat.count
        }))
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching download stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch download stats' },
      { status: 500 }
    );
  }
}