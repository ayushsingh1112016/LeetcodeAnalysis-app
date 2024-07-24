import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { fetchLeetCodeCalendar } from '../calendarapi';

const Heatmap = ({ username }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tooltip, setTooltip] = useState('');
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchLeetCodeCalendar(username);
        const submissionData = Object.entries(result.submissionCalendar).map(([timestamp, count]) => ({
          date: new Date(parseInt(timestamp) * 1000),
          count
        }));
        setData(submissionData);
        setFilteredData(filterDataByYear(submissionData, selectedYear));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [username, selectedYear]);

  const filterDataByYear = (data, year) => {
    return data.filter(entry => entry.date.getFullYear() === year);
  };

  // Updated handleMouseOver function
  const handleMouseOver = (value, e) => {
    if (value && value.date) {
      const date = value.date.toISOString().split('T')[0];
      setTooltip(`${date}: ${value.count} submissions`);
      setTooltipPos({ top: e.clientY + 10, left: e.clientX + 10 });
      setSelectedDate(value); // Set selected date when hovering

      // Log date and submission count
      console.log(`Date: ${date}`);
      console.log(`Submissions: ${value.count}`);
    } else {
      setTooltip('');
      setSelectedDate(null);
    }
  };

  const handleMouseOut = () => {
    setTooltip('');
    setSelectedDate(null);
  };

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
    setFilteredData(filterDataByYear(data, year));
  };

  // Generate a list of years for the dropdown
  const startYear = 2022; // Replace with the earliest year of your data
  const endYear = new Date().getFullYear();
  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);

  // Calculate min, max, and average counts
  const counts = data.map(entry => entry.count);
  const minCount = Math.min(...counts, 1); // Avoid 0 for color scaling
  const total = counts.reduce((acc, count) => acc + count, 0);
  const avgCount = counts.length ? total / counts.length : 1; // Avoid 0 for color scaling

  // Determine the intervals for color gradient based on average
  const getColorClass = (count) => {
    const percentage = Math.min(count / avgCount, 1); // Cap percentage at 1
    if (percentage <= 0.2) return 'text-green-200';
    if (percentage <= 0.4) return 'text-green-300';
    if (percentage <= 0.6) return 'text-green-400';
    if (percentage <= 0.8) return 'text-green-500';
    return 'text-green-800';
  };

  // Calculate total submissions and active days
  const totalSubmissions = data.reduce((acc, entry) => acc + entry.count, 0);
  const totalActiveDays = data.length;

  return (
    <div className="p-4">
      <div className="">
        <label htmlFor="year-select" className="mr-2">Select Year:</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={handleYearChange}
          className="p-2 border border-gray-300 rounded"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="relative">
        <div className="w-full h-fit py-5"> {/* Adjust the height as needed */}
          <CalendarHeatmap
            startDate={new Date(`${selectedYear}-01-01`)}
            endDate={new Date(`${selectedYear}-12-31`)}
            values={filteredData}
            classForValue={(value) =>
              value ? `fill-current ${getColorClass(value.count)}` : 'fill-current text-gray-100'
            }
            onMouseOver={(value, e) => handleMouseOver(value, e)}
            onMouseOut={handleMouseOut}
          />
        </div>
        {tooltip && (
          <div
            className="absolute bg-gray-800 text-white text-sm rounded px-2 py-1 shadow-lg"
            style={{ top: `${tooltipPos.top}px`, left: `${tooltipPos.left}px`, pointerEvents: 'none' }}
          >
            {tooltip}
          </div>
        )}
      </div>
      <div className=' flex justify-around'> 
      <p>Total Submissions: {totalSubmissions}</p>
      <p>Total Active Days: {totalActiveDays}</p>
      </div>
      </div>
  );
};

export default Heatmap;
