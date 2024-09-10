import { useState, useEffect } from 'react';

interface FlightClassFormProps {
  onSubmit: (data: { fclassName: string, airlineId: number, flightNumberId:number, departureId:number, price:number }) => void;
  fcdata?: { id: number, fclassName: string, airlineId: number, flightNumberId: number, departureId: number, price: number };
  onClose: () => void;
}

interface RelatedData {
  airlines: { id: number; airlineName: string }[];
  flightNumbers: { id: number; flightno: string }[];
  departures: { id: number; departure: string }[];
}

const FlightClassForm: React.FC<FlightClassFormProps> = ({ onSubmit, fcdata, onClose }) => {
  const [fclassName, setName] = useState(fcdata?.fclassName || '');
  const [airlineId, setAirlineId] = useState(fcdata?.airlineId || undefined);
  const [flightNumberId, setFlightNumberId] = useState(fcdata?.flightNumberId || undefined);
  const [departureId, setDepartureId] = useState(fcdata?.departureId || undefined);
  const [price, setPrice] = useState(fcdata?.price || 0);

  const [relatedData, setRelatedData] = useState<RelatedData>({ airlines: [], flightNumbers: [], departures: [] });

  useEffect(() => {
    const fetchRelatedData = async () => {
      try {
        const [airlinesRes, flightNumbersRes, departuresRes] = await Promise.all([
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ fclassName, airlineId: airlineId || 0, flightNumberId: flightNumberId || 0, departureId: departureId || 0, price });
    onClose(); // Auto-close form after submit
  };

  useEffect(() => {
    if (fcdata) {
      setName(fcdata.fclassName);
      setAirlineId(fcdata.airlineId);
      setFlightNumberId(fcdata.flightNumberId);
      setDepartureId(fcdata.departureId);
      setPrice(fcdata.price);
    }
  }, [fcdata]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-4xl transform transition-transform duration-300 scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{fcdata ? 'Edit Flight Class' : 'Create Flight Class'}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Flight Class Name</label>
              <input
                type="text"
                id="name"
                value={fclassName}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="airline" className="block text-lg font-medium text-gray-700">Airline</label>
              <select
                id="airline"
                value={airlineId || ''}
                onChange={(e) => setAirlineId(Number(e.target.value))}
                required
                className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" disabled>Select an airline</option>
                {relatedData.airlines.map((airline) => (
                  <option key={airline.id} value={airline.id}>
                    {airline.airlineName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="flightNumber" className="block text-lg font-medium text-gray-700">Flight Number</label>
              <select
                id="flightNumber"
                value={flightNumberId || ''}
                onChange={(e) => setFlightNumberId(Number(e.target.value))}
                required
                className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" disabled>Select a flight number</option>
                {relatedData.flightNumbers.map((flightNumber) => (
                  <option key={flightNumber.id} value={flightNumber.id}>
                    {flightNumber.flightno}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="departure" className="block text-lg font-medium text-gray-700">Departure</label>
              <select
                id="departure"
                value={departureId || ''}
                onChange={(e) => setDepartureId(Number(e.target.value))}
                required
                className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" disabled>Select a departure</option>
                {relatedData.departures.map((departure) => (
                  <option key={departure.id} value={departure.id}>
                    {departure.departure}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-400 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition"
            >
              {fcdata ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlightClassForm;
