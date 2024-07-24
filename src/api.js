export const fetchProfileInfo = async (username) => {
  const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`);
  const data = await response.json();
  return data;
};

export const fetchBadgeAPI = async (username) => {
  const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/badges`);
  const data = await response.json();
  return data;
};

// Example of fetchQuestionsAPI function
export const fetchQuestionsAPI = async (username) => {
  const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const fetchContestAPI = async (username) => {
  const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

