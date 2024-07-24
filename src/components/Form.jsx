import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/${username}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4 text-center">Enter Username</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border rounded-lg w-full p-2 mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-lg w-full p-2">Submit</button>
      </form>
    </div>
  );
};

export default Form;
