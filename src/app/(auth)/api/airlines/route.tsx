import {db} from '@/lib/db';
import { NextResponse } from 'next/server';


export async function POST(breq: Request) {
    try{
        const body = await breq.json();
        const {airlineName,country} = body;

    const newAirline = await db.airline.create({
            data:{
                airlineName,
                country,
                }
        });
    // const {airlineName}=newAirline;
    return NextResponse.json({user:newAirline,message:"User Create Successfully!"},{status:200});

    // return NextResponse.json({airline:newAirline,message:"User Create Successfully!"},{status:200});
    }catch (error){
        return NextResponse.json({message:"Something went wrong!"},{status:201});
    }
}