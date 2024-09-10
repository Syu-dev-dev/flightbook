'use client';

import Navbar from "@/components/Navbar";
import User from "@/components/ui/User";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/auth/signin"); // Redirect to sign-in if not authenticated
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

  if (session) {
    return (
      
      <div>
        {/* profile */}
        {/* <Navbar /> */}
        <h1>Profile Page</h1>
        {/* {session.name === "ADMIN" ? (
          <AdminProfile session={session} />
        ) : (
          <ClientProfile session={session} />
        )} */}
        <User />
      </div>
    );
  }

//   return <p>Please sign in to view your profile.</p>;
}

// const AdminProfile = ({ session }) => {
//   return (
//     <div>
//       <h2>Admin Profile</h2>
//       <p>Welcome, Admin {session.user.name}!</p>
//       <p>Email: {session.user.email}</p>
//       <p>Role: {session.user.role}</p>
//       <div>
//         <h3>Manage Users</h3>
//         <p>Access to user management and other admin functionalities.</p>
//       </div>
//     </div>
//   );
// };

// const ClientProfile = ({ session }) => {
//   return (
//     <div>
//       <h2>Client Profile</h2>
//       <p>Welcome, {session.user.name}!</p>
//       <p>Email: {session.user.email}</p>
//       <p>Role: {session.user.role}</p>
//       <div>
//         <h3>Your Bookings</h3>
//         <p>Access to your personal bookings and preferences.</p>
//       </div>
//     </div>
//   );
// };
