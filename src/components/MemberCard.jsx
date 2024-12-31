import React, { memo } from 'react';

const MemberCard = memo(({ 
  member, 
  isExpanded, 
  onToggleExpand, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="border p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{member.name}</h2>
      <p className="text-gray-600 mb-1">
        <strong>Major:</strong> {member.major}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Email:</strong> {member.email}
      </p>
      <button
        onClick={() => onToggleExpand(member.id)}
        className="mt-4 bg-purple-900 hover:bg-purple-700 text-white px-4 py-2 rounded"
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>

      {isExpanded && (
        <div className="mt-4">
          <p className="text-gray-600 italic mb-4">
            <strong>Introduction:</strong> {member.introduction}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Current Courses:</strong> {member.courses.current}
          </p>
          <p className="text-gray-600">
            <strong>Finished Courses:</strong> {member.courses.finished}
          </p>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(member)}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(member.id)}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

MemberCard.displayName = 'MemberCard';

export default MemberCard; 