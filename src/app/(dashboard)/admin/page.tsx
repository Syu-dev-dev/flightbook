'use client';

// import FlightForm from "@/components/flightmadal";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";


import { useState, useEffect } from 'react';
import AirlineForm from '@/components/airlinemodal';
import { Table } from 'react-bootstrap';

interface Airline {
  id: number;
  airlineName: string;
  country: string;
}

type ModalKind = 'create' | 'edit';

const page: React.FC = () => {
  // useState<Array<{ airlineName: string }>>([]);
  const [data, setData] = useState<Array<Airline>>([]);
  const [mode, setMode] = useState<ModalKind | null>(null);
  const [selected, setSelected] = useState<Airline | null>(null);

  // Fetch airlines from API
  useEffect(() => {
    console.log('..................... starting airlist page');
    
    const fetchAirlines = async () => {
      try {
        const response = await fetch('/api/getairlines', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        console.log("........ response1",response.json)
        console.log("........ response2",response.body)
        if (!response.ok) {
          throw new Error('Error fetching airlines');
        }
        const data = await response.json();
        console.log('....seeting data airline list')
        setData(data);
        console.log('.............. sss33',data)
      } catch (error) {
        console.error('Error fetching airlines:', error);
      }
    };

    fetchAirlines(); // Call the async function

  }, []);
  // useEffect(() => {
  //   console.log('..................... starting airlist page')
  //   fetch('/api/getairlines',{method: 'GET',
  //     headers: { 'Content-Type': 'application/json' }})
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  //     .catch((error) => console.error('Error fetching airlines:', error));
  // }, []);

  const handleCreate = async (airlineData: { airlineName: string, country: string }) => {
    const res = await fetch('/api/airlines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(airlineData),
    });

    if (res.ok) {
      const newAirline = await res.json();
      setData([...data, newAirline]);
      setMode(null); // Close modal after creation
    }
  };

  const handleEdit = async (airlineData: { airlineName: string, country: string }) => {
    if (!selected) return;

    const res = await fetch(`/api/airlines/${selected.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(airlineData),
    });

    if (res.ok) {
      const updatedAirline = await res.json();
      setData(data.map((airline) => (airline.id === selected.id ? updatedAirline : airline)));
      setMode(null);
      setSelected(null); // Clear selection after update
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/airlines/${id}`, { method: 'DELETE' });

    if (res.ok) {
      setData(data.filter((airline) => airline.id !== id));
    }
  };

  const openCreateForm = () => {
    setMode('create');
    setSelected(null);
  };

  const openEditForm = (airline: Airline) => {
    setMode('edit');
    setSelected(airline);
  };


// const page = async () => {
//     const session = await getServerSession(authOptions)
//     console.log('....session', session)
  

    return (
      <div className="min-h-screen">
        {/* Content area */}
        <div className="container mx-auto px-4 py-4">
          {/* Admin Welcome Text */}
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            Welcome Admin
          </h1>
  
          {/* Menu Section */}
          <div className="flex justify-center space-x-8">
            <Link href="/admin">
            
              <div className="bg-white text-blue-500 px-6 py-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition duration-300">
                <h2 className="text-xl font-semibold">AIRLINE LIST</h2>
              </div>
            </Link>
  
            <Link href="/admin/flightnumbers">
              <div className="bg-white text-blue-500 px-6 py-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition duration-300">
                <h2 className="text-xl font-semibold">FLIGHT NUMBER LIST</h2>
              </div>
            </Link>
  
            <Link href="/admin/departures">
              <div className="bg-white text-blue-500 px-6 py-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition duration-300">
                <h2 className="text-xl font-semibold">DEPARTURE ~ ARRIVAL</h2>
              </div>
            </Link>

            <Link href="/admin/flightclass">
              <div className="bg-white text-blue-500 px-6 py-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition duration-300">
                <h2 className="text-xl font-semibold">FLIGHT CLASS</h2>
              </div>
            </Link>
          </div>
        </div>

        {/* Airline Create Form */}
        <div >
      {/* <div className="container mx-auto px-4 py-4"></div>
      <div className="container mx-auto px-4 py-4"></div>
      <div className="container mx-auto px-4 py-4"></div> */}
      <div className="flex justify-center mb-4">
      <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
      onClick={openCreateForm}>Create Airline</button></div>

      {mode === 'create' && <AirlineForm onSubmit={handleCreate} onClose={() => setMode(null)} />}
      {mode === 'edit' && selected && (
        <AirlineForm
          airline={selected}
          onSubmit={handleEdit}
          onClose={() => {
            setMode(null);
            setSelected(null);
          }}
        />
      )}

<Table striped bordered hover>
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left ">#</th>
            <th className="py-2 px-4 text-left w-12/12">Airline Name</th>
            <th className="py-2 px-4 text-left ">Country</th>

            <th className="py-2 px-4 text-left ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((airline, index) => (
            <tr key={airline.id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{airline.airlineName}</td>
              <td className="py-2 px-4">{airline.country}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => openEditForm(airline)}
                  className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(airline.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
      </div>
    );
  };
  
export default page;