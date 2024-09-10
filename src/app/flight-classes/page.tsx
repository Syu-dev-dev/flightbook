'use client';
import { useEffect, useState } from 'react';

interface FlightClass {
  id: number;
  className: string;
  price: number;
  description: string;
}

const FlightClassesPage = () => {
  const [flightClasses, setFlightClasses] = useState<FlightClass[]>([]);

  useEffect(() => {
    const storedClasses = sessionStorage.getItem('flightClasses');
    if (storedClasses) {
      setFlightClasses(JSON.parse(storedClasses));
    }
  }, []);

  return (
    <div className="min-h-screen mt-40 px-4">
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">
          Available Flight Classes
        </h2>

        {flightClasses.length > 0 ? (
          <table className="w-full text-left border-collapse bg-gray-100 rounded-lg overflow-hidden">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="px-4 py-2">Airline</th> 
                <th className="px-4 py-2">Flight No</th> 
                <th className="px-4 py-2">Departure ~ Arrival </th> 
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {flightClasses.map((flightClass) => (
                <tr
                  key={flightClass.id}
                  className="border-b border-gray-300"
                >
                  <td className="px-4 py-3">{flightClass.className}</td>
                  <td className="px-4 py-3">{flightClass.className}</td>
                  <td className="px-4 py-3">{flightClass.className}</td>

                  <td className="px-4 py-3">{flightClass.className}</td>
                  <td className="px-4 py-3">${flightClass.price.toFixed(2)}</td>
                  <td className="px-4 py-3">{flightClass.description}</td>
                  <td className="px-4 py-3">
                    <button
                      className="py-1 px-3 bg-blue-600 text-white font-semibold rounded-md border border-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                      onClick={() => alert(`Booking ${flightClass.className}`)}
                    >
                      Book Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-700 text-center">No flight classes available for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FlightClassesPage;
