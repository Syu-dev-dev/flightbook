// // src/components/AirlineForm.tsx
// 'use client';
// import { useState } from 'react';

// export default function AirlineForm() {
//   const [airlineName, setAirlineName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     const response = await fetch('/api/airlines', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         airlineName,
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       setMessage('Airline created successfully!');
//       setAirlineName(''); // Clear form
//     } else {
//       setMessage(`Error: ${data.error}`);
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-12">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Airline</h2>
//       {message && <p className="text-center mb-4">{message}</p>}
//       <div className="mb-4">
//         <label htmlFor="airlineName" className="block text-gray-700 font-medium mb-2">
//           Airline Name
//         </label>
//         <input
//           id="airlineName"
//           type="text"
//           value={airlineName}
//           onChange={(e) => setAirlineName(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
//           required
//         />
//       </div>
//       <div className="mt-6 flex justify-center">
//         <button
//           type="submit"
//           className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           disabled={loading}
//         >
//           {loading ? 'Loading...' : 'Create Airline'}
//         </button>
//       </div>
//     </form>
//   );
// }


import { useState, useEffect } from 'react';

interface AirlineFormProps {
  onSubmit: (data: { airlineName: string, country: string }) => void;
  airline?: { id: number, airlineName: string, country: string };
  onClose: () => void;
}

const AirlineForm: React.FC<AirlineFormProps> = ({ onSubmit, airline, onClose }) => {
  const [airlineName, setName] = useState(airline?.airlineName || '');
  const [country, setCountry] = useState(airline?.country || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ airlineName, country });
    onClose(); // Auto-close form after submit
  };

  useEffect(() => {
    if (airline) {
      setName(airline.airlineName);
      setCountry(airline.country);
    }
  }, [airline]);

  // return (
  //   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
  //     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl transform transition-transform duration-300 scale-100">
  //       <h2 className="text-2xl font-bold mb-6 text-gray-800">{airline ? 'Edit Airline' : 'Create Airline'}</h2>
  //       <form onSubmit={handleSubmit}>
  //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
  //           <div>
  //             <label htmlFor="name" className="block text-sm font-medium text-gray-700">Airline Name</label>
  //             <input
  //               type="text"
  //               id="name"
  //               value={name}
  //               onChange={(e) => setName(e.target.value)}
  //               required
  //               className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //             />
  //           </div>
  //           <div>
  //             <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
  //             <input
  //               type="text"
  //               id="country"
  //               value={country}
  //               onChange={(e) => setCountry(e.target.value)}
  //               required
  //               className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //             />
  //           </div>
  //         </div>
  //         <div className="flex justify-end space-x-3">
  //           <button
  //             type="button"
  //             onClick={onClose}
  //             className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition"
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             type="submit"
  //             className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-md shadow hover:bg-indigo-700 transition"
  //           >
  //             {airline ? 'Update' : 'Create'}
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-4xl transform transition-transform duration-300 scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{airline ? 'Edit Airline' : 'Create Airline'}</h2>
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
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Airline Name</label>
              <input
                type="text"
                id="name"
                value={airlineName}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-lg font-medium text-gray-700">Country</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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
              {airline ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="country">Country:</label>
//         <input
//           type="text"
//           id="country"
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">{airline ? 'Update' : 'Create'}</button>
//     </form>
//   );
};

export default AirlineForm;
