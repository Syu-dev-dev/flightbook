import {db} from '@/lib/db';
import { NextResponse } from 'next/server';


export async function POST(breq: Request) {
    console.log('......ppp3')
    try{
        const body = await breq.json();
        const {flightno} = body;

    const newFlightno = await db.flightNumber.create({
            data:{
                flightno,
                }
        });
    // const {airlineName}=newAirline;
    return NextResponse.json({flinodata:newFlightno,message:"User Create Successfully!"},{status:200});

    // return NextResponse.json({airline:newAirline,message:"User Create Successfully!"},{status:200});
    }catch (error){
        return NextResponse.json({message:"Something went wrong!"},{status:201});
    }
}