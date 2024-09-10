import {db} from '@/lib/db';
import { NextResponse } from 'next/server';


export async function POST(breq: Request) {
    console.log('......ppp3')
    try{
        const body = await breq.json();
        const {departure} = body;

    const newDeparture = await db.departure.create({
            data:{
                departure,
                }
        });
    // const {airlineName}=newAirline;
    return NextResponse.json({depData:newDeparture,message:"User Create Successfully!"},{status:200});

    // return NextResponse.json({airline:newAirline,message:"User Create Successfully!"},{status:200});
    }catch (error){
        return NextResponse.json({message:"Something went wrong!"},{status:201});
    }
}