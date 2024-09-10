// 'use client';
// import Link from "next/link";
// import { Table, Container, Button } from "react-bootstrap";
// import { useEffect, useState } from "react";


// import ModalAirline from "@/components/airlinemodal";

// import { ModalKind } from "@/lib/types";


// const Airlinelist = async () => {
//     // const session = await getServerSession(authOptions)
//     // console.log('....session', session)
//     // return <div> Welcome Airline List page! </div>;
//     return (
//         <div className="min-h-screen">
//           {/* Content area */}

//           <div className="container mx-auto px-4 py-4">
//             {/* Admin Welcome Text */}
//             <h1 className="text-4xl font-bold text-center text-white mb-8">
//               Welcome Admin
//             </h1>

//             return (
//     <div className="my-4">
//       <Button className="mb-3" onClick={() => set_data("new")}>
//         Create New Airline
//       </Button>

//           <Link href="/admin/airlines">
            
//             <div className="bg-white text-blue-500 px-6 py-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition duration-300">
//               <h2 className="text-xl font-semibold">Create New Airline</h2>
//             </div>
//           </Link>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>NO</th>
//             <th>タイトル</th>
//             <th>ステータス</th>
//             <th>公開日</th>
//             <th>終了日</th>
//             <th></th>
//           </tr>
//         </thead>
//         </Table>
//         </div>
//         </div>
//     </div>
//     );
// }
// export default Airlinelist;
'use client';

import { useState, useEffect } from 'react';
import FlightnoForm from '@/components/flightnomodal';
import { Table } from 'react-bootstrap';
import Link from 'next/link';

interface FliNumber {
  id: number;
  flightno: string;
  // country: string;
}

type ModalKind = 'create' | 'edit';

const Flightnumberlist: React.FC = () => {
  // useState<Array<{ airlineName: string }>>([]);
  const [data, setData] = useState<Array<FliNumber>>([]);
  const [mode, setMode] = useState<ModalKind | null>(null);
  const [selected, setSelected] = useState<FliNumber | null>(null);

  // Fetch airlines from API
  useEffect(() => {
    console.log('..................... starting airlist page');
    
    const fetchAirlines = async () => {
      try {
        const response = await fetch('/api/getflightno', {
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

  const handleCreate = async (flinoData: { flightno: string }) => {
    const res = await fetch('/api/flightnumber', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flinoData),
    });

    if (res.ok) {
      const newAirline = await res.json();
      setData([...data, newAirline]);
      setMode(null); // Close modal after creation
    }
  };

  const handleEdit = async (flinoData: { flightno: string }) => {
    if (!selected) return;

    const res = await fetch(`/api/airlines/${selected.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flinoData),
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

  const openEditForm = (flino: FliNumber) => {
    setMode('edit');
    setSelected(flino);
  };
  // return (<>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</>);
  return (

    
    // airline forms
    <div className="min-h-screen">
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
      {/* <div className="container mx-auto px-4 py-4"></div>
      <div className="container mx-auto px-4 py-4"></div>
      <div className="container mx-auto px-4 py-4"></div> */}
      <div className="flex justify-center mb-4">
      <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
      onClick={openCreateForm}>Create Flight No.</button></div>

      {mode === 'create' && <FlightnoForm onSubmit={handleCreate} onClose={() => setMode(null)} />}
      {mode === 'edit' && selected && (
        <FlightnoForm
          flightnodata={selected}
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
            <th className="py-2 px-4 text-left w-12/12">Flight No.</th>
            {/* <th className="py-2 px-4 text-left ">Country</th> */}

            <th className="py-2 px-4 text-left ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((flino, index) => (
            <tr key={flino.id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{flino.flightno}</td>
              {/* <td className="py-2 px-4">{airline.country}</td> */}
              <td className="py-2 px-4">
                <button
                  onClick={() => openEditForm(flino)}
                  className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(flino.id)}
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
  );
};

export default Flightnumberlist;
