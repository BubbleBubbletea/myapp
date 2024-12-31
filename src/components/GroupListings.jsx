import React, { useState, useEffect } from 'react';
import GroupListing from './GroupListing';
import groupsData from '../groups.json'; 

const GroupListings = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
        try {
            const res = await fetch('http://localhost:6688/groups');
            const data = await res.json();
            setGroups(data);
          } catch (error) {
            console.error("Error fetching groups:", error);
          } finally {
            setLoading(false);
          }
    };
    fetchGroups();
  }, []);

  return (
    <section className="bg-[#4E2A84] text-white py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Explore Groups</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groups.map((group) => (
              <GroupListing key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GroupListings;