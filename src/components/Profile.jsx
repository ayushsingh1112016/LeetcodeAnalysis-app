import React, { useEffect, useState } from 'react';
import { fetchProfileInfo } from '../api';
import githubIcon from '../logos/githubIcon.svg';

const Profile = ({ username }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchProfileInfo(username);
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };
    getData();
  }, [username]);

  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  if (!data) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="  bg-white rounded-lg   p-0 w-fit h-fit">
      <div className='flex justify-center items-center px-3 pb-2'>
        <div className="flex justify-center items-center mt-4 mr-10">
          <img className="w-32 h-32 rounded-full object-cover" src={data.avatar} alt="Avatar" />
        </div>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold text-gray-800">{data.name}</h2>
          <p className="text-gray-500">@{data.username}</p>
          <div className="mt-4">
            {data.ranking && (
              <p className="text-gray-600"><strong>Ranking:</strong> {data.ranking}</p>
            )}
            {data.reputation > 0 && (
              <p className="text-gray-600"><strong>Reputation:</strong> {data.reputation}</p>
            )}
            {data.country && (
              <p className="text-gray-600"><strong>Country:</strong> {data.country}</p>
            )}
            {data.school && (
              <p className="text-gray-600"><strong>School:</strong> {data.school}</p>
            )}
            {data.skillTags && data.skillTags.length > 0 && (
              <p className="text-gray-600"><strong>Skills:</strong> {data.skillTags.join(', ')}</p>
            )}
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            {data.gitHub && (
              <a href={data.gitHub} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                <img src={githubIcon} alt="GitHub" className="w-6 h-6 mb-2" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
