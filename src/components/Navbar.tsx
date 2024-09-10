

import React from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { signIn,signOut } from 'next-auth/react';
import UserAccountNav from './userAccountNav';



const Navbar = async () => {
  const session = await getServerSession(authOptions)
  
  // return (
  //   <nav className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-4">
  //   <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
  //     <div className='container flex items-center justify-between'>
  //       <Link href='/'>
  //         <HandMetal />
  //       </Link>
  //       <div className="hidden md:flex space-x-8 items-center">
  //           <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-lg font-medium">
  //             Home
  //           </Link>
  //           <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-lg font-medium">
  //             About
  //           </Link>
  //           <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-lg font-medium">
  //             Contact Us
  //           </Link>
  //         </div>
  //       {session?.user? (
  //         <UserAccountNav />
  //       ): 
  //       (<Link className={buttonVariants()} href='/sign-in'>
  //       Sign in
  //     </Link>)
  //       }
  //     </div>
  //   </div>
  //   </nav>
  // );
//   return (
//     <nav className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-4 fixed top-0 left-0 z-50">
//   <div className="container mx-auto px-4 flex items-center justify-between">
//     <div className="text-white text-2xl font-bold">
//       <Link href="/">FlightBooker</Link>
//     </div>
//     <div className="flex space-x-4">
//       <Link href="/" className="text-white hover:text-gray-200">Newsletter</Link>
//       <Link href="/about" className="text-white hover:text-gray-200">About</Link>
//       <Link href="/contact" className="text-white hover:text-gray-200">Contact Us</Link>
//       {session?.user ? (
//         <UserAccountNav />
//       ) : (
//         <Link className={buttonVariants()} href='/sign-in'>
//           Sign in
//         </Link>
//       )}
//     </div>
//   </div>
// </nav>
//   );



return (
  <div className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        {/* <Link href='/'>
          <HandMetal />
        </Link>
        <Link className={buttonVariants()} href='/sign-in'>
          Sign in
        </Link> */}
        <div className="text-white text-2xl font-bold">
<Link href="/">FlightBooker</Link>
</div>
    <div className="flex space-x-4">
    <Link href="/admin" className="text-white hover:text-gray-200">Admin Dashboard</Link>
      <Link href="/" className="text-white hover:text-gray-200">Newsletter</Link>
      <Link href="/about" className="text-white hover:text-gray-200">About</Link>
      <Link href="/contact" className="text-white hover:text-gray-200">Contact Us</Link>
      {session?.user ? (
        <UserAccountNav />
      ) : (
        <Link className={buttonVariants()} href='/sign-in'>
          Sign in
        </Link>
      )}
    </div>
      </div>
    </div>

  // <div>Welcome Nav Bar</div>
  // <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
  //   <div className='container flex items-center justify-between'>
  //     <Link href='/'>
  //       <HandMetal />
  //     </Link>
  //     <Link className={buttonVariants()} href='/sign-in'>
  //       Sign in
  //     </Link>
  //   </div>
  // </div>
);
};

export default Navbar;
