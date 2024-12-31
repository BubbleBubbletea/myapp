import React, { useState, useEffect } from 'react';
const MemberForm = ({ member = {}, onSubmit, onCancel }) => {
    const [formState, setFormState] = useState({
      id: member.id || "", 
      name: member.name || "",
      major: member.major || "",
      email: member.email || "",
      introduction: member.introduction || "",
      courses: {
        current: member.courses?.current || "",
        finished: member.courses?.finished || "",
      },
    });

    useEffect(() => {
      if (member.id) {
        setFormState({
          id: member.id,
          name: member.name || "",
          major: member.major || "",
          email: member.email || "",
          introduction: member.introduction || "",
          courses: {
            current: member.courses?.current || "",
            finished: member.courses?.finished || "",
          },
        });
      }
    }, [member]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.startsWith("courses.")) {
        const courseKey = name.split(".")[1];
        setFormState((prev) => ({
          ...prev,
          courses: { ...prev.courses, [courseKey]: value },
        }));
      } else {
        setFormState((prev) => ({ ...prev, [name]: value }));
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formState);
    };
  
    return (
      <form
        className="border p-4 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h3 className="text-lg font-bold mb-4">{formState.id ? "Edit Member" : "Add Member"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formState.name}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="major"
          placeholder="Major"
          value={formState.major}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          name="introduction"
          placeholder="Introduction"
          value={formState.introduction}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="courses.current"
          placeholder="Current Courses"
          value={formState.courses.current}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="courses.finished"
          placeholder="Finished Courses"
          value={formState.courses.finished}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <div className="flex justify-between mt-4">
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
            Save
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    );
  };
  
  export default MemberForm;