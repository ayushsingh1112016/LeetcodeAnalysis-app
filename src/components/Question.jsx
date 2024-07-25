// Question.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { fetchQuestionsAPI } from '../api';

ChartJS.register(Title, Tooltip, Legend, ArcElement);


const Question = ({ username }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchQuestionsAPI(username);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [username]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const labels = ['Easy', 'Medium', 'Hard'];
  const values = [
    data.acSubmissionNum.find(x => x.difficulty === 'Easy').count,
    data.acSubmissionNum.find(x => x.difficulty === 'Medium').count,
    data.acSubmissionNum.find(x => x.difficulty === 'Hard').count
  ];
  const submissions = [
    data.acSubmissionNum.find(x => x.difficulty === 'Easy').submissions,
    data.acSubmissionNum.find(x => x.difficulty === 'Medium').submissions,
    data.acSubmissionNum.find(x => x.difficulty === 'Hard').submissions
  ];
  const totalQ = values[0] + values[1]+ values[2];
  const totalSubmissions = submissions[0] + submissions[1]+ submissions[2];
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#1CBABA', '#FFB700', '#F63737'],
        hoverBackgroundColor: ['#1CBABA', '#FFB700', '#F63737'],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            return `Questions Solved: ${values[index]}\nTotal Submissions: ${submissions[index]}`;
          },
        },
      },
    },
  };

  return (
    <div className='h-fit lg:w-50'>
    <h2>LeetCode Questions Solved</h2>
    <Pie data={chartData} options={options} />
    <h1 className='text-center'>Total Problems: {totalQ} </h1>
  </div>
  );
};

export default Question;
