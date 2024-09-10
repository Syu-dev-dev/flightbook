import {db} from '@/lib/db';
import { NextResponse } from 'next/server';



export async function PUT(req: Request) {
  console.log('..........api getting data', req)
  const url = new URL (req.url)
  const searchParams = new URLSearchParams (url.searchParams)
  const flightclassID = searchParams.get('id')
  
  
      try {
          const flightclasses = await db.flightClassRole.findMany(
            {
                where: {
                    id: Number(flightclassID),
                  },
            //   select: {
            //     airlineName: true, // Only select airlineName field
            //   },
            }
          );
          return NextResponse.json(flightclasses,{status:200});
      } catch (error) {
          return NextResponse.json({message:"Something went wrong!"},{status:201});
      }
}