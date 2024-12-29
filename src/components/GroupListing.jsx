import React from 'react';
import { Link } from 'react-router-dom';

const GroupListing = ({ group }) => {
  return (
    <div className="bg-white rounded-lg shadow-md text-center">
      <img
        src={group.image}
        alt={group.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-2xl font-bold mb-4">{group.name}</h3>
        <p className="text-gray-700 mb-4">{group.description}</p>
        {/* Link to GroupPage using group.id */}
        <Link
          to={`/groups/${group.id}`} // Navigates to GroupPage with the group.id
          className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          View Group
        </Link>
      </div>
    </div>
  );
};

export default GroupListing;
