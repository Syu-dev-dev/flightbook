import {db} from '@/lib/db';
import { NextResponse } from 'next/server';
import {hash} from 'bcrypt';
import * as z from 'zod';

const UserSchema = z
  .object({
    name: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })
  

// export async function GET(request: Request) {
//     NextResponse.json('')
    
// }

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const {email, password, name} = UserSchema.parse(body);
        const exitingUserbyEmail = await db.user.findUnique({
            where: {email: email}
        })
        if(exitingUserbyEmail){
            return NextResponse.json({user:null, message:"User With this email aleready exits."},{status:409});
        }
        // const exitingUserbyUsername = await db.user.findUnique({
        //     where: {name : name}
        // })
        // if(exitingUserbyUsername)
        //     {
        //         return NextResponse.json({user:null, message:"User wiht this username aleready exits."},{status:409});
        //     }
    const hashedPassword =await hash(password,10);
    const newUser = await db.user.create({
            data:{
                email,
                password:hashedPassword,
                name}
        });
    const {password:newUserPassword,...rest}=newUser;

    return NextResponse.json({user:newUser,message:"User Create Successfully!"},{status:200});
    }catch (error){
        return NextResponse.json({message:"Something went wrong!"},{status:200});
    };
   

}
