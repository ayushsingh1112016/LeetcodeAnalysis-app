import axios from 'axios';

export const fetchLeetCodeCalendar = async (username) => {
  try {
    const response = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
