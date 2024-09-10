'use client';
import Navbar from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";
import User from "@/components/ui/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import {useRouter} from "next/navigation";
// import {useRouter} from "next/router";
import { useState, useEffect } from 'react';

interface ClientHomeProps {
    session: any; // You can type this according to your session object structure
  }

interface Dept {
  id : number;
  departure: string;
  // arrivalLocation: string;
}

interface FlightClass {
    id: number;
    className: string;
  }

export default function ClientHome({ session }: ClientHomeProps) {
  
  // const session = await getServerSession(authOptions);
  const router  = useRouter();

  const [depts, setDepts] = useState<Dept[]>([]);
  const [departureLocationId, setDepartureLocationId] = useState<number | null>(null);
  const [flightClasses, setFlightClasses] = useState<FlightClass[]>([]);


  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const response = await fetch('/api/getdepartures');
        const data = await response.json();
        setDepts(data);
        console.log('..........mm8',data)
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    fetchDepts();
  }, []);
  // return (
  //   <div>
  // <h1 className='text-4xl'>Home</h1>
  // <Link className={buttonVariants()} href='/admin'> Open my admin</Link>
  // <h2>
  //   Client session
  // </h2>
 

  // <h2>Server Session</h2>
  // {JSON.stringify(session)}
   
  // </div>
  // );
  // return (
  //   <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
  //     <div className="container mx-auto px-4 py-12">
  //       {/* Hero Section */}
  //       <div className="text-center text-white">
  //         <h1 className="text-5xl font-extrabold mb-4">
  //           Welcome to FlightBooker
  //         </h1>
  //         <p className="text-xl mb-8">
  //           Your one-stop solution for booking flights worldwide.
  //         </p>
  //         <a
  //           href="/about"
  //           className="bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300"
  //         >
  //           Learn More
  //         </a>
  //       </div>

  //       {/* Features Section */}
  //       <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
  //         <div className="bg-white p-8 rounded-lg shadow-lg text-center">
  //           <svg className="w-12 h-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  //           </svg>
  //           <h3 className="text-2xl font-semibold mb-2">Easy Booking</h3>
  //           <p className="text-gray-700">Book your flights quickly and easily with our user-friendly interface.</p>
  //         </div>

  //         <div className="bg-white p-8 rounded-lg shadow-lg text-center">
  //           <svg className="w-12 h-12 text-purple-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 11h4m6 6h.01M12 16h.01M16 11h.01M12 16h.01M8 7h8" />
  //           </svg>
  //           <h3 className="text-2xl font-semibold mb-2">Wide Selection</h3>
  //           <p className="text-gray-700">Choose from a wide range of flight options to suit your travel needs.</p>
  //         </div>

  //         <div className="bg-white p-8 rounded-lg shadow-lg text-center">
  //           <svg className="w-12 h-12 text-pink-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  //           </svg>
  //           <h3 className="text-2xl font-semibold mb-2">24/7 Support</h3>
  //           <p className="text-gray-700">Our support team is available around the clock to assist with any issues.</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // useEffect(() => {
    const fetchFlightClasses = async () => {
      if (departureLocationId) {
        try {
          const response = await fetch(`/api/getuniflightclass?departureId=${departureLocationId}`);
          const data = await response.json();
          console.log('............ flightclasses api data2',data)
          setFlightClasses(data);
          // router.push('/flight-classes')

          sessionStorage.setItem('flightClasses', JSON.stringify(data));
      
          // Navigate to the new page
          router.push('/flight-classes');
            
      // router.push({
      //       pathname: '/flight-classes',
      //       query: { classes: JSON.stringify(data) },
      //     });    
        } catch (error) {
          console.error('Error fetching flight classes:', error);
        }
      }
    };
  // }, [departureLocationId,router]);
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('....submitting 77')
    fetchFlightClasses();
    // Handle the form submission (e.g., search flights based on selected criteria)
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center py-4">
      {/* <Navbar /> */}
      {/* Flight Search Box with Margin-Top */}
      <div>Find Your Flight Flight</div>
      {/* <div>Find Your Flight Flight</div>
      <div>Find Your Flight Flight</div> */}


      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-7 mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Find Your Flight
    
        </h2>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="date-start" className="block text-gray-700 font-medium mb-2">
              DEPART DATE
            </label>
            <input
              id="date-start"
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          {/* <div>
            <label htmlFor="date-end" className="block text-gray-700 font-medium mb-2">
              RETURN
            </label>
            <input
              id="date-end"
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div> */}
          <div>
            <label htmlFor="dept" className="block text-lg font-medium text-gray-700">
              Departure Location
            </label>
            <select
              id="dept"
              value={departureLocationId || ''}
              onChange={(e) => setDepartureLocationId(Number(e.target.value))}
              required
              className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>
                Select a departure location
              </option>
              {depts.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.departure}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label htmlFor="trip-type" className="block text-gray-700 font-medium mb-2">
              DEPARTURE ~ ARRIVAL
            </label>
            <select
              id="trip-type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="one-way">One-Way</option>
              <option value="round-trip">Round-Trip</option>
              <option value="multi-city">Multi-City</option>
            </select>
          </div> */}
          <div>
            <label htmlFor="trip-type" className="block text-gray-700 font-medium mb-2">
              TRIP TYPE
            </label>
            <select
              id="trip-type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="one-way">One-Way</option>
              <option value="round-trip">Round-Trip</option>
              <option value="multi-city">Multi-City</option>
            </select>
          </div>
          <div className="lg:col-span-3 flex justify-center mt-6">
              <button
                type="submit"
                className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search Flights
              </button>
            </div>
          {/* <div className="md:col-span-3 flex justify-center mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search Flights
            </button>
          </div> */}
        </form>
      </div>

      {/* Hero Section */}
      <div className="text-center text-white">
        <h1 className="text-5xl font-extrabold mb-2">
          Welcome to FlightBooker
        </h1>
        <p className="text-xl mb-6">
          Your one-stop solution for booking flights worldwide.
        </p>
        <Link
          href="/about"
          className="bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Book Now
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <svg className="w-12 h-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-2xl font-semibold mb-2">Easy Booking</h3>
          <p className="text-gray-700">Book your flights quickly and easily with our user-friendly interface.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <svg className="w-12 h-12 text-purple-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 11h4m6 6h.01M12 16h.01M16 11h.01M12 16h.01M8 7h8" />
          </svg>
          <h3 className="text-2xl font-semibold mb-2">Wide Selection</h3>
          <p className="text-gray-700">Choose from a wide range of flight options to suit your travel needs.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <svg className="w-12 h-12 text-pink-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-2xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-700">Our support team is available around the clock to assist with any issues.</p>
        </div>
      </div>
    </div>
  );
}
