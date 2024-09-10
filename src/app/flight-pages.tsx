import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface FlightClass {
  id: number;
  className: string;
}

const FlightClassesPage = () => {
  const router = useRouter();
  const [flightClasses, setFlightClasses] = useState<FlightClass[]>([]);

  useEffect(() => {
    const { classes } = router.query;
    if (classes) {
      setFlightClasses(JSON.parse(classes as string));
    }
  }, [router.query]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-7 mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Available Flight Classes
        </h2>

        {flightClasses.length > 0 ? (
          <ul className="list-disc list-inside">
            {flightClasses.map((flightClass) => (
              <li key={flightClass.id} className="py-2">
                {flightClass.className}
              </li>
            ))}
          </ul>
        ) : (
          <p>No flight classes available for the selected criteria.</p>
        )}

        {/* Back Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.back()}
            className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightClassesPage;
