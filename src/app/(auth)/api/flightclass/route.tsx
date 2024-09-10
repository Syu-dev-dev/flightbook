import {db} from '@/lib/db';
import { NextResponse } from 'next/server';


export async function POST(breq: Request) {
    console.log('......bb11')
    try{
        const body = await breq.json();
        // console.log('.....bb33',body)
        const {airlineId,flightNumberId ,departureId,price,className} = body;

        // const sampledata={
        //     airlineId: 1,
        //     flightNumberId: 2,
        //     departureId: 1,
        //     price: 10000,
        //     createAt:"2024-09-07T12:30:00.000Z",
        //     updatedAt:"2024-09-07T12:30:00.000Z",
        //     className:'Test1',
        //   }
        // const data= { airlineId:airlineId,
        //     flightNumberId:flightNumberId ,
        //     departureId:departureId,
        //     price:price,
        //     className:className
        // }
        // console.log('..............dd1',data)
        // console.log('..............dd2',sampledata)

    const newClassies = await db.flightClassRole.create({
            data:{ airlineId:airlineId,
                flightNumberId:flightNumberId ,
                departureId:departureId,
                price:price,
                className:className
            }
            // data:{
            //     airlineId: 1,
            //     flightNumberId: 2,
            //     departureId: 1,
            //     price: 10000,
            //     // createdAt:"2024-09-07T12:30:00.000Z",
            //     // updatedAt:"2024-09-07T12:30:00.000Z",
            //     className:'Test4',
            //   }
        });
        console.log('...bb22',newClassies)
    // const {airlineName}=newAirline;
    return NextResponse.json({depData:newClassies,message:"Flight classic Create Successfully!"},{status:200});

    // return NextResponse.json({airline:newAirline,message:"User Create Successfully!"},{status:200});
    }catch (error){
        return NextResponse.json({message:"Something went wrong!"},{status:201});
    }
}