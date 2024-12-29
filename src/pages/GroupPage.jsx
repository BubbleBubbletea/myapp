import React, { useState, useEffect } from 'react';
import MemberForm from "../components/MemberForm";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


const GroupPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [group, setGroup] = useState(null);
  const [expandedMemberId, setExpandedMemberId] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupId = parseInt(id); 
        const groupRes = await fetch(`http://localhost:6699/groups/${groupId}`);
        if (groupRes.ok) {
          const groupData = await groupRes.json();
          setGroup(groupData);
        } else {
          console.error("Failed to fetch group data");
        }

        const membersRes = await fetch(`http://localhost:6699/members?groupId=${groupId}`);
        if (membersRes.ok) {
          const membersData = await membersRes.json();
          setMembers(membersData);
        } else {
          console.error("Failed to fetch members data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchGroupData();
  }, [id]);

  useEffect(() => {
    console.log("Group Data:", group);
    console.log("Members Data:", members);
  }, [group, members]);

  const fetchMember = async (id) => {
    const response = await fetch(`http://localhost:6699/members/${parseInt(id, 10)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch member with id ${id}`);
    }
    return response.json();
  };

  const handleEditClick = async (memberId) => {
    try {
      const member = await fetchMember(memberId);
      setEditingMember(member); // Populate the editing state
    } catch (error) {
      console.error("Error fetching member for editing:", error);
    }
  };
  

  const toggleExpand = (memberId) => {
    setExpandedMemberId((prevId) => (prevId === memberId ? null : memberId));
  };

  const handleDelete = async (memberId) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await fetch(`http://localhost:6699/members/${memberId}`, { method: 'DELETE' });
        setMembers(members.filter((member) => member.id !== memberId));
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  const handleAddMember = async (newMember) => {
    try {
      console.log("Adding Member:", newMember);
      const numericIds = Array.from(
        new Set(members.map((m) => parseInt(m.id, 10)))
      ).filter((id) => !isNaN(id));

      const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
      const newId = maxId + 1;

      const memberWithId = { ...newMember, id: newId, groupId: parseInt(id, 10) };

      const res = await fetch(`http://localhost:6699/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberWithId),
      });
      if (res.ok) {
        const addedMember = await res.json();
        setMembers([...members, addedMember]);
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleEditMember = async (updatedMember) => {
    try {
      if (!updatedMember.id) {
        throw new Error("Member ID is missing!");
      }

      const updatedMemberWithGroupId = { ...updatedMember, groupId: parseInt(id, 10) };

      const res = await fetch(`http://localhost:6699/members/${updatedMember.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMemberWithGroupId),
      });

      if (res.ok) {
        const editedMember = await res.json();
        setMembers(
          members.map((member) =>
            member.id === editedMember.id ? editedMember : member
          )
        );
        setEditingMember(null);
      } else {
        console.error("Failed to update member:", res.statusText);
      }
    } catch (error) {
      console.error("Error editing member:", error);
    }
  };
  
  if (!group) return <p className="text-center text-gray-500">Group not found!</p>;

  return (
    <>
      {/* Back Link */}
      <section>
        <div className="container mx-auto py-6 px-6">
          <Link to="/" className="text-purple-700 hover:text-purple-900 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Groups
          </Link>
        </div>
      </section>

      {/* Group Details */}
      <section className="bg-white py-10">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">{group.name}</h1>
          <p className="text-center text-gray-600 mb-10">{group.description}</p>

          {/* Add Member Button */}
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="mb-6 bg-purple-900 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            {showAddForm ? "Cancel" : "Add Member"}
          </button>

          {showAddForm && (<MemberForm onSubmit={(newMember) => handleAddMember(newMember)} /> )}

          {/* Members Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) =>
  editingMember === member.id ? (
    <MemberForm
      key={member.id}
      member={member} // Pass the full member object
      onSubmit={(updatedMember) => handleEditMember(updatedMember)}
      onCancel={() => setEditingMember(null)}
    />
              ) : (
                <div key={member.id} className="border p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-2">{member.name}</h2>
                  <p className="text-gray-600 mb-1">
                    <strong>Major:</strong> {member.major}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Email:</strong> {member.email}
                  </p>
                  <button
                    onClick={() => toggleExpand(member.id)}
                    className="mt-4 bg-purple-900 hover:bg-purple-700 text-white px-4 py-2 rounded"
                  >
                    {expandedMemberId === member.id ? "Show Less" : "Read More"}
                  </button>

                  {expandedMemberId === member.id && (
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

                  {/* Action Buttons */}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => setEditingMember(member.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default GroupPage;