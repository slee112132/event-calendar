import React from 'react';

export default function Event({ event, onViewDetails }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <img
        src={event.imageURI}
        alt={event.name}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-4">{event.name}</h2>
      <p className="text-gray-600">
        {new Intl.DateTimeFormat('en-US', {
          dateStyle: 'full',
          timeStyle: 'long',
          timeZone: 'America/New_York',
        }).format(new Date(event.date))}
      </p>
      <p className="text-gray-600">{event.location}</p>
      <p className="text-gray-700 mt-2">{event.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          RSVP
        </button>
        <button
          onClick={() => onViewDetails(event)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
