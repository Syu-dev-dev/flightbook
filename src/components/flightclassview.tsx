'use client';

import { useState, useEffect } from 'react';
import FlightClassForm from './flightclassmodal';
import { Table } from 'react-bootstrap';
import Link from 'next/link';

interface FlightClass {
  id: number;
  className: string;
  airlineId: number;
  flightNumberId: number;
  departureId: number;
  price: number;
}

interface RelatedData {
  fliclass: { id: number; className: string }[];
  airlines: { id: number; name: string }[];
  flightNumbers: { id: number; number: string }[];
  departures: { id: number; location: string }[];
}

type ModalKind = 'create' | 'edit';

const FlightClasslist: React.FC = () => {
  const [data, setData] = useState<Array<FlightClass>>([]);
  const [relatedData, setRelatedData] = useState<RelatedData>({ fliclass: [],airlines: [], flightNumbers: [], departures: [] });
  const [mode, setMode] = useState<ModalKind | null>(null);
  const [selected, setSelected] = useState<FlightClass | null>(null);

  useEffect(() => {
    const fetchFlightClasses = async () => {
      try {
        const response = await fetch('/api/getflightclass', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Error fetching flight classes');
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching flight classes:', error);
      }
    };

    const fetchRelatedData = async () => {
      try {
        const [flightclassics, airlinesRes, flightNumbersRes, departuresRes] = await Promise.all([
          fetch('/api/getflightclass'),
          fetch('/api/getairlines'),
          fetch('/api/getflightno'),
          fetch('/api/getdepartures'),
        ]);

        const [fliclass, airlines, flightNumbers, departures] = await Promise.all([
          flightclassics.json(),
          airlinesRes.json(),
          flightNumbersRes.json(),
          departuresRes.json(),
        ]);

        setRelatedData({ fliclass,airlines, flightNumbers, departures });
      } catch (error) {
        console.error('Error fetching related data:', error);
      }
    };

    fetchFlightClasses();
    fetchRelatedData();
  }, []);

  const handleCreate = async (flightcdata: { className: string; airlineId: number; flightNumberId: number; departureId: number; price: number }) => {
    try {
      const res = await fetch('/api/flightclass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flightcdata),
      });

      if (res.ok) {
        const newFlightClass = await res.json();
        setData([...data, newFlightClass]);
        setMode(null);
      }
    } catch (error) {
      console.error('Error creating flight class:', error);
    }
  };

  const handleEdit = async (flightcdata: { className: string; airlineId: number; flightNumberId: number; departureId: number; price: number }) => {
    if (!selected) return;

    try {
      const res = await fetch(`/api/flightclass/${selected.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flightcdata),
      });

      if (res.ok) {
        const updatedFlightClass = await res.json();
        setData(data.map((item) => (item.id === selected.id ? updatedFlightClass : item)));
        setMode(null);
        setSelected(null);
      }
    } catch (error) {
      console.error('Error updating flight class:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/flightclass/${id}`, { method: 'DELETE' });

      if (res.ok) {
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting flight class:', error);
    }
  };

  const openCreateForm = () => {
    setMode('create');
    setSelected(null);
  };

  const openEditForm = (flightclass: FlightClass) => {
    setMode('edit');
    setSelected(flightclass);
  };

  const getNameById = <T extends { id: number; airlineName?: string; flightno?: string; departure?: string }>(
    id: number,
    list: T[]
  ): string => {
    const item = list.find((i) => i.id === id);
    return item ? (item.airlineName || item.flightno || item.departure || 'Unknown') : 'Unknown';
  };

  return (
    <div className="min-h-screen">
      {/* <div className="container mx-auto px-4 py-4"> */}
      <div className="container px-4 py-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Welcome Admin</h1>

        <div className="flex justify-center space-x-8 mb-8">
          <Link href="/admin">
            <div className="bg-white text-blue-500 px-6 py-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition duration-300">
              <h2 className="text-xl font-semibold">AIR LINE LIST</h2>
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

        <div className="flex justify-center mb-4">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            onClick={openCreateForm}
          >
            Create Class
          </button>
        </div>

        {mode === 'create' && 
          <FlightClassForm onSubmit={handleCreate} onClose={() => setMode(null)} />
        }
        {mode === 'edit' && selected && (
          <FlightClassForm
            fcdata={selected}
            onSubmit={handleEdit}
            onClose={() => {
              setMode(null);
              setSelected(null);
            }}
          />
        )}

        <Table striped bordered hover>
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Class</th>
              <th className="py-2 px-4 text-left">Airline</th>
              <th className="py-2 px-4 text-left">Flight Number</th>
              <th className="py-2 px-4 text-left">Departure</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">NO. OF SEAT</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((fclass, index) => (
              <tr key={fclass.id}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{fclass.className}</td>
                <td className="py-2 px-4">{getNameById(fclass.airlineId, relatedData.airlines)}</td>
                <td className="py-2 px-4">{getNameById(fclass.flightNumberId, relatedData.flightNumbers)}</td>
                <td className="py-2 px-4">{getNameById(fclass.departureId, relatedData.departures)}</td>
                <td className="py-2 px-4">{fclass.price}</td>
                <td className="py-2 px-4">{100}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => openEditForm(fclass)}
                    className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(fclass.id)}
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

export default FlightClasslist;
