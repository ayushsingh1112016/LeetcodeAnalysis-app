import React, { useState, useEffect } from 'react';
import './ProblemList.css';

const ProblemList = () => {
  const [questions, setQuestions] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterRange, setFilterRange] = useState({ min: 0, max: Infinity });
  const [filterIndex, setFilterIndex] = useState('');
  const [importantQuestions, setImportantQuestions] = useState({});
  const [solvedStatus, setSolvedStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 50;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/zerotrac/leetcode_problem_rating/main/data.json');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    const savedImportantQuestions = JSON.parse(localStorage.getItem('importantQuestions')) || {};
    const savedSolvedStatus = JSON.parse(localStorage.getItem('solvedStatus')) || {};
    setImportantQuestions(savedImportantQuestions);
    setSolvedStatus(savedSolvedStatus);
  }, []);

  useEffect(() => {
    localStorage.setItem('importantQuestions', JSON.stringify(importantQuestions));
  }, [importantQuestions]);

  useEffect(() => {
    localStorage.setItem('solvedStatus', JSON.stringify(solvedStatus));
  }, [solvedStatus]);

  const sortQuestions = (order) => {
    const sorted = [...questions].sort((a, b) => 
      order === 'asc' ? a.Rating - b.Rating : b.Rating - a.Rating
    );
    setQuestions(sorted);
    setSortOrder(order);
  };

  const filterQuestions = () => {
    const { min, max } = filterRange;
    const filtered = questions.filter(question => 
      question.Rating >= (min || 0) && 
      question.Rating <= (max || Infinity) &&
      question.ProblemIndex.includes(filterIndex)
    );
    setQuestions(filtered);
    setCurrentPage(1);
  };

  const handleMinChange = (e) => {
    const value = e.target.value ? parseFloat(e.target.value) : 0;
    setFilterRange(prevRange => ({ ...prevRange, min: value }));
  };

  const handleMaxChange = (e) => {
    const value = e.target.value ? parseFloat(e.target.value) : Infinity;
    setFilterRange(prevRange => ({ ...prevRange, max: value }));
  };

  const toggleImportant = (id) => {
    setImportantQuestions(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const toggleSolvedStatus = (id) => {
    setSolvedStatus(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const totalPages = Math.ceil(questions.length / questionsPerPage);

  return (
    <div className="p-4 ">
      
      <div className=' w-full px-10 flex justify-center'>
      <div className="flex space-x-2 mb-4">
        <input
          type="number"
          placeholder="Min Rating"
          onChange={handleMinChange}
          className="px-4 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Max Rating"
          onChange={handleMaxChange}
          className="px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by Q index"
          onChange={(e) => setFilterIndex(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <button className="px-4 py-2 bg-black text-white rounded hover:bg-green-600" onClick={filterQuestions}>
          Filter
        </button>
        <button className="px-4 py-2 bg-black text-white rounded" onClick={() => sortQuestions('asc')}>
          Sort Rating Min to Max
        </button>
        <button className="px-4 py-2 bg-black text-white rounded" onClick={() => sortQuestions('desc')}>
          Sort Rating Max to Min
        </button>
      </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Title</th>
            <th className="px-4 py-2 border-b">Rating</th>
            <th className="px-4 py-2 border-b">Question No</th>
            <th className="px-4 py-2 border-b">Important</th>
            <th className="px-4 py-2 border-b">Solved</th>
          </tr>
        </thead>
        <tbody>
          {currentQuestions.map(question => (
            <tr key={question.ID}>
              <td className="px-4 py-2 border-b text-center">{question.ID}</td>
              <td className="px-4 py-2 border-b text-center">
                <a href={`https://leetcode.com/problems/${question.TitleSlug}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {question.Title}
                </a>
              </td>
              <td className="px-4 py-2 border-b text-center">{question.Rating}</td>
              <td className="px-4 py-2 border-b text-center">{question.ProblemIndex}</td>
              <td className="px-4 py-2 border-b text-center">
                <span
                  onClick={() => toggleImportant(question.ID)}
                  className="cursor-pointer"
                >
                  {importantQuestions[question.ID] ? '★' : '☆'}
                </span>
              </td>
              <td className="px-4 py-2 border-b text-center">
                <input
                  type="checkbox"
                  checked={solvedStatus[question.ID] || false}
                  onChange={() => toggleSolvedStatus(question.ID)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex flex-wrap justify-center space-x-2">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => handlePageChange(index + 1)}
      disabled={currentPage === index + 1}
      className={`m-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-gray-400 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
    >
      {index + 1}
    </button>
  ))}
</div>

    </div>
  );
};

export default ProblemList;
