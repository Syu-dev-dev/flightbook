'use client';
import { useEffect, useState } from 'react';

interface FlightClass {
  id: number;
  className: string;
  airlineId: number;
  flightNumberId:number;
  departureId:number;
  price: number;
  description: string;
}
interface RelatedData {
  // fliclass: { id: number; className: string }[];
  airlines: { id: number; name: string }[];
  flightNumbers: { id: number; number: string }[];
  departures: { id: number; location: string }[];
}

const FlightClassesPage = () => {
  const [flightClasses, setFlightClasses] = useState<FlightClass[]>([]);
  const [relatedData, setRelatedData] = useState<RelatedData>({ airlines: [], flightNumbers: [], departures: [] });

  useEffect(() => {
    const storedClasses = sessionStorage.getItem('flightClasses');
    if (storedClasses) {
      setFlightClasses(JSON.parse(storedClasses));
    }

    const fetchRelatedData = async () => {
      try {
        const [airlinesRes, flightNumbersRes, departuresRes] = await Promise.all([
          fetch('/api/getflightclass'),
          fetch('/api/getairlines'),
          fetch('/api/getflightno'),
          fetch('/api/getdepartures'),
        ]);

        const [airlines, flightNumbers, departures] = await Promise.all([
          airlinesRes.json(),
          flightNumbersRes.json(),
          departuresRes.json(),
        ]);

        setRelatedData({ airlines, flightNumbers, departures });
      } catch (error) {
        console.error('Error fetching related data:', error);
      }
    };

    
    fetchRelatedData();
  }, []);

  const getNameById = <T extends { id: number; airlineName?: string; flightno?: string; departure?: string }>(
    id: number,
    list: T[]
  ): string => {
    const item = list.find((i) => i.id === id);
    return item ? (item.airlineName || item.flightno || item.departure || 'Unknown') : 'Unknown';
  };

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
                {/* <th className="px-4 py-2">Description</th> */}
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {flightClasses.map((flightClass) => (
                <tr
                  key={flightClass.id}
                  className="border-b border-gray-300"
                >
                {/* <td className="py-2 px-4">{getNameById(flightClass.airlineId, relatedData.airlines)}</td> */}
                {/* <td className="py-2 px-4">{getNameById(flightClass.flightNumberId, relatedData.flightNumbers)}</td>
                <td className="py-2 px-4">{getNameById(flightClass.flightNumberId, relatedData.flightNumbers)}</td> */}
                <td className="py-2 px-4">{getNameById(flightClass.airlineId, relatedData.airlines)}</td>
                <td className="py-2 px-4">{getNameById(flightClass.airlineId, relatedData.airlines)}</td>
                <td className="py-2 px-4">{getNameById(flightClass.departureId, relatedData.departures)}</td>

                  <td className="px-4 py-3">{flightClass.className}</td>
                  <td className="px-4 py-3">${flightClass.price.toFixed(2)}</td>
                  {/* <td className="px-4 py-3">{flightClass.description}</td> */}
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
