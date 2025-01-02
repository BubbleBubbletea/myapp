import { useCallback, useState } from 'react';
import { API_URL } from '../config';
import { supabase } from '../supabaseClient';

export const useMemberOperations = (groupId) => {
    const [members, setMembers] = useState([]);
    const [editingMember, setEditingMember] = useState(null);

    const fetchMembers = useCallback(async () => {
        try {
            const token = (await supabase.auth.getSession()).data.session?.access_token;
            const response = await fetch(`${API_URL}/members?groupId=${groupId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            if (response.ok) {
                const data = await response.json();
                setMembers(data);
            }
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }, [groupId]);

    const handleDelete = useCallback(async (memberId) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            try {
                const token = (await supabase.auth.getSession()).data.session?.access_token; 
                const response = await fetch(`${API_URL}/members/${memberId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    setMembers(prev => prev.filter(member => String(member.id) !== String(memberId)));
                }
            } catch (error) {
                console.error("Error deleting member:", error);
            }
        }
    }, []);

    const handleAddMember = useCallback(async (newMember) => {
        try {
            const numericIds = members.map(m => Number(m.id)).filter(id => !isNaN(id));
            const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
            const newId = String(maxId + 1);

            const memberWithId = {
                ...newMember,
                id: newId,
                groupId: Number(groupId)
            };
            const token = (await supabase.auth.getSession()).data.session?.access_token; 

            const res = await fetch(`${API_URL}/members`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' , 
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(memberWithId),
            });

            if (res.ok) {
                const addedMember = await res.json();
                setMembers(prev => [...prev, addedMember]);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error adding member:", error);
            return false;
        }
    }, [groupId, members]);

    const handleEditMember = useCallback(async (updatedMember) => {
        try {
            if (!updatedMember.id) {
                throw new Error("Member ID is missing!");
            }

            const updatedMemberWithGroupId = {
                ...updatedMember,
                id: String(updatedMember.id),
                groupId: Number(groupId)
            };

            console.log('Updating member:', updatedMemberWithGroupId);
            const token = (await supabase.auth.getSession()).data.session?.access_token;

            const res = await fetch(`${API_URL}/members/${updatedMember.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                 },
                body: JSON.stringify(updatedMemberWithGroupId),
            });

            if (res.ok) {
                const editedMember = await res.json();
                setMembers(prev =>
                    prev.map(member =>
                        String(member.id) === String(editedMember.id) ? editedMember : member
                    )
                );
                setEditingMember(null);
                return true;
            } else {
                console.error("Server response not OK:", await res.text());
                return false;
            }
        } catch (error) {
            console.error("Error editing member:", error);
            return false;
        }
    }, [groupId]);

    return {
        members,
        setMembers,
        editingMember,
        setEditingMember,
        handleDelete,
        handleAddMember,
        handleEditMember,
        fetchMembers
    };
}; 