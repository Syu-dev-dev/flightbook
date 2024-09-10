import {db} from '@/lib/db';
import { NextResponse } from 'next/server';



export async function GET(req: Request) {
  console.log('..........api getting data', req)
  
  const url = new URL (req.url)
  const searchParams = new URLSearchParams (url.searchParams)
  const departure = searchParams.get('departureId')

//   const response = await fetch(`/api/generateVerificationLink?email=${email}`, {
//     method: 'GET',
//     headers: {
//       'content-type': 'application/json'
//     },

//   })
  
  if (!departure) {
    return NextResponse.json({ error: 'Departure location ID is required' });
  }
      try {
          const flightdatares = await db.flightClassRole.findMany({
            where: {
                departureId: Number(departure),
              },
            // {
            //   select: {
            //     airlineName: true, // Only select airlineName field
            //   },
            // }
      });
          return NextResponse.json(flightdatares,{status:200});
      } catch (error) {
          return NextResponse.json({message:"Something went wrong!"},{status:201});
      }
}