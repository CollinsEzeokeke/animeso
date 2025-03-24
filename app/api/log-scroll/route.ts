import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    // check of height and width are in the request
    // const { width, height } = await request.json();
    // check for scroll progress
    const { scrollProgress } = await request.json();
    
    // Create logs directory if it doesn't exist
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }

    // Append to log file
    const logFile = path.join(logsDir, 'scroll-progress.log');
    fs.appendFileSync(logFile, `The scrollProgress on Y is : ${new Date().toISOString()}: ${scrollProgress}\n`);
    // fs.appendFileSync(logFile, `The height is : ${new Date().toISOString()}: ${height}\n`);
    // fs.appendFileSync(logFile, `The width is : ${new Date().toISOString()}: ${width}\n`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging scroll progress:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}