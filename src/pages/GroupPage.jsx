import React, { useEffect, useState, useCallback } from 'react';
import MemberForm from "../components/MemberForm";
import MemberCard from "../components/MemberCard";
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useMemberOperations } from '../hooks/useMemberOperations';
import { API_URL } from '../config';
import { supabase } from '../supabaseClient';
const GroupPage = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [expandedMemberId, setExpandedMemberId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const {
    members,
    editingMember,
    setEditingMember,
    handleDelete,
    handleAddMember,
    handleEditMember,
    fetchMembers
  } = useMemberOperations(id);

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          // Redirect to login with return URL
          const currentUrl = window.location.pathname; // Capture the current URL
          window.location.href = `/login?returnUrl=${encodeURIComponent(currentUrl)}`;
          return;
        }
  
        const token = session.access_token;
        const groupRes = await fetch(`${API_URL}/groups/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!groupRes.ok) {
          throw new Error('Failed to fetch group data');
        }
  
        const groupData = await groupRes.json();
        setGroup(groupData);
  
        // Fetch members only after authentication check
        fetchMembers();
      } catch (error) {
        console.error("Error fetching group:", error);
      }
    };
  
    checkAuthAndFetchData();
  }, [id, fetchMembers]);
  
  

  const toggleExpand = useCallback((memberId) => {
    setExpandedMemberId(prev => prev === memberId ? null : memberId);
  }, []);

  const handleAddSubmit = async (newMember) => {
    const success = await handleAddMember(newMember);
    if (success) setShowAddForm(false);
  };

  const handleEditSubmit = async (updatedMember) => {
    const success = await handleEditMember(updatedMember);
    if (!success) {
      alert('Failed to update member. Please try again.');
    }
  };

  if (!group) return <p className="text-center text-gray-500">Group not found!</p>;

  return (
    <>
      <section>
        <div className="container mx-auto py-6 px-6">
          <Link to="/" className="text-purple-700 hover:text-purple-900 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Groups
          </Link>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">{group.name}</h1>
          <p className="text-center text-gray-600 mb-10">{group.description}</p>

          <button
            onClick={() => setShowAddForm(prev => !prev)}
            className="mb-6 bg-purple-900 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            {showAddForm ? "Cancel" : "Add Member"}
          </button>

          {showAddForm && (
            <MemberForm 
              key="add-form"
              onSubmit={handleAddSubmit}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map(member => (
              <div key={member.id}>
                {editingMember?.id === member.id ? (
                  <MemberForm
                    key={`edit-${member.id}`}
                    member={editingMember}
                    onSubmit={handleEditSubmit}
                    onCancel={() => setEditingMember(null)}
                  />
                ) : (
                  <MemberCard
                    key={`card-${member.id}`}
                    member={member}
                    isExpanded={expandedMemberId === member.id}
                    onToggleExpand={toggleExpand}
                    onEdit={() => setEditingMember(member)}
                    onDelete={handleDelete}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default GroupPage;