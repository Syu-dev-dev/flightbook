'use client';

import { signOut } from "next-auth/react";
import { Button } from "./ui/button"
import Link from 'next/link';
import Image from 'next/image';

const UserAccountNav = () => {
    // const session 

    return (
        <div className="flex items-center space-x-4">
          {(
            <div className="flex items-center space-x-2">
              {/* User Avatar */}
              <Link href="/profile">
                <Image
                  className="rounded-full border-2 border-blue-500 cursor-pointer"
                  src="/images/avatar.png" // Adjust this path for your user avatar
                  alt="User Avatar"
                  width={40}
                  height={40}
                />
              </Link>
              <Button onClick={()=> signOut({
            redirect:true,
            callbackUrl:`${window.location.origin}/sign-in`,
        })} variant='destructive'>Sign Out</Button>
              {/* <button
                onClick={() => signOut()}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                Sign Out
              </button> */}
            </div>
          ) }
        </div>
      
    // <div>
    //     <Button onClick={()=> signOut({
    //         redirect:true,
    //         callbackUrl:`${window.location.origin}/sign-in`,
    //     })} variant='destructive'>Sign Out</Button>
    // </div>
        );
  };

export default UserAccountNav;