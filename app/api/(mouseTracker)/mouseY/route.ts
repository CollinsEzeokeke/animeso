import { NextResponse } from "next/server";
import fs from "fs";
import path from 'path';


export async function POST(request: Request) {
    try {
        const { mouseY } = await request.json();
            
    // Create logs directory if it doesn't exist
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }
    
    // Append to log file
    const logFile = path.join(logsDir, 'mouseY.log');
    fs.appendFileSync(logFile, `The mouseY is : ${new Date().toISOString()}: ${mouseY}\n`);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error logging mouseY:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
