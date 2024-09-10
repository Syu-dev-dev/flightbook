import {db} from '@/lib/db';
import { NextResponse } from 'next/server';



export async function GET(req: Request) {
  console.log('..........api getting data', req)
  
      try {
          const flightdatares = await db.flightNumber.findMany(
            // {
            //   select: {
            //     airlineName: true, // Only select airlineName field
            //   },
            // }
          );
          return NextResponse.json(flightdatares,{status:200});
      } catch (error) {
          return NextResponse.json({message:"Something went wrong!"},{status:201});
      }
}