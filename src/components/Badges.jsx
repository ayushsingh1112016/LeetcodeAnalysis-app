import React, { useState, useEffect } from 'react';
import { fetchBadgeAPI } from '../api';

const Badges = ({ username }) => {
  const [badges, setBadges] = useState([]);
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const result = await fetchBadgeAPI(username);
        setBadges(result.badges);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBadges();
  }, [username]);

  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  if (badges.length === 0) return <div className="text-center mt-10">Loading...</div>;

  const handlePrev = () => {
    setCurrentBadgeIndex((prevIndex) => (prevIndex === 0 ? badges.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentBadgeIndex((prevIndex) => (prevIndex === badges.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className=" bg-white rounded-lg  p-3 h-fit">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Badges</h2>
        <p className="text-3xl font-bold text-gray-500">{badges.length}</p>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <button onClick={handlePrev} className="text-gray-500 bg-white rounded-full p-2 hover:bg-white">
          &lt;
        </button>
        <div className="flex flex-col items-center">
          <img src={badges[currentBadgeIndex].icon} alt={badges[currentBadgeIndex].displayName} className="w-12 h-12" />
          <p className="mt-2">{badges[currentBadgeIndex].displayName}</p>
        </div>
        <button onClick={handleNext} className="text-gray-500 bg-white rounded-full p-2 hover:bg-white">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Badges;
