import React, { useEffect, useState } from 'react';

const LeetCodeQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('https://final-api-lemon.vercel.app/api/first-20')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(question => ({
          ...question,
          Rating: Math.floor(question.Rating)
        }));
        setQuestions(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mx-auto p-4 w-fit">
      <h1 className="text-2xl font-bold mb-4 text-center">Latest 2 Contests</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="pb-1 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">ID</th>
            <th className="pb-1 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">Title</th>
            <th className="pb-1 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">Rating</th>
            <th className="pb-1 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">Problem Index</th>
            <th className="pb-1 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">Contest ID</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(question => (
            <tr key={question.ID} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200">{question.ID}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <a href={`https://leetcode.com/problems/${question.TitleSlug}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {question.Title}
                </a>
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{question.Rating}</td>
              <td className="py-2 px-4 border-b border-gray-200">{question.ProblemIndex}</td>
              <td className="py-2 px-4 border-b border-gray-200">{question.ContestID_en}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeetCodeQuestions;
