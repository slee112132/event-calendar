import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';

const FILTER_TYPES = ['Workshop', 'Festival', 'Meetup', 'Performance', 'Class'];

export default function Home() {
  const [data, setData]             = useState([]);
  const [filter, setFilter]         = useState();
  const [search, setSearch]         = useState('');
  const [debouncedSearch]           = useDebounce(search, 500);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen]     = useState(false);
  const [rsvped, setRsvped]         = useState([]); // holds _id strings

  const openModal  = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchEvents = () => {
    setLoading(true);
    setError(false);

    const params = {
      ...(filter         ? { type: filter }         : {}),
      ...(debouncedSearch ? { search: debouncedSearch } : {})
    };

    axios.get('/api/events', { params })
      .then(res => { setData(res.data); setLoading(false); })
      .catch(()  => { setError(true);    setLoading(false); });
  };

  useEffect(fetchEvents, [filter, debouncedSearch]);

  const handleRSVP = (id) => {
    axios.post(`/api/events/${id}/rsvp`)
      .then(() => setRsvped(prev => [...prev, id]))
      .catch(() => alert('RSVP failed'));
  };
  const handleCancel = (id) => {
    axios.post(`/api/events/${id}/cancelRSVP`)
      .then(() => setRsvped(prev => prev.filter(x => x !== id)))
      .catch(() => alert('Cancel RSVP failed'));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight">Community Events</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* search */}
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search events…"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />

        {/* filters */}
        <div className="flex flex-wrap gap-2">
          {FILTER_TYPES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(filter === cat ? undefined : cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                filter === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* status */}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="h-8 w-8 rounded-full border-4 border-blue-500 border-solid border-r-transparent animate-spin"></div>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">No events match your search or filter.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map(ev => (
              <div key={ev._id} className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl p-5 flex flex-col border border-gray-100">
                <img
                  src={ev.imageURI}
                  alt={ev.name}
                  className="w-full h-44 object-cover rounded-xl mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900">{ev.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium', timeStyle: 'short',
                    timeZone: 'America/New_York'
                  }).format(new Date(ev.date))}
                </p>
                <p className="text-sm text-gray-600 mb-1">{ev.location}</p>
                <p className="text-sm text-gray-700 mb-4">{ev.description}</p>

                <div className="mt-auto flex gap-2 pt-2">
                  {rsvped.includes(ev._id) ? (
                    <button
                      onClick={() => handleCancel(ev._id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Cancel RSVP
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRSVP(ev._id)}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      RSVP
                    </button>
                  )}
                  <button
                    onClick={() => { setSelectedEvent(ev); openModal(); }}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-11/12 md:w-1/2 p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <h2 className="text-2xl font-bold">{selectedEvent.name}</h2>
            <img
              src={selectedEvent.imageURI}
              alt={selectedEvent.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-gray-600">
              {new Intl.DateTimeFormat('en-US', {
                dateStyle: 'full', timeStyle: 'long',
                timeZone: 'America/New_York'
              }).format(new Date(selectedEvent.date))}
            </p>
            <p className="text-gray-600">{selectedEvent.location}</p>
            <p className="text-gray-700">{selectedEvent.extended}</p>

            <div className="flex gap-2 pt-4">
              {rsvped.includes(selectedEvent._id) ? (
                <button
                  onClick={() => handleCancel(selectedEvent._id)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Cancel RSVP
                </button>
              ) : (
                <button
                  onClick={() => handleRSVP(selectedEvent._id)}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  RSVP
                </button>
              )}
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
