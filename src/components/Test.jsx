import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; // Import default styles
import './Test.css'; // Import custom styles
import { eachDayOfInterval, startOfYear, endOfYear } from 'date-fns';

// Function to generate empty heatmap data
const generateEmptyHeatmapData = (startDate, endDate) => {
  const dates = eachDayOfInterval({ start: startDate, end: endDate });
  return dates.map(date => ({
    date: date.toISOString().split('T')[0],
    count: 0, // All entries will be empty
  }));
};

const Test = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [heatmapData, setHeatmapData] = useState([]);

  // Update heatmap data whenever the selected year changes
  useEffect(() => {
    const startOfSelectedYear = startOfYear(new Date(selectedYear, 0, 1));
    const endOfSelectedYear = endOfYear(new Date(selectedYear, 0, 1));
    setHeatmapData(generateEmptyHeatmapData(startOfSelectedYear, endOfSelectedYear));
  }, [selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <div className="calendar-heatmap">
      <h2>Heatmap of the Year {selectedYear}</h2>
      <select value={selectedYear} onChange={handleYearChange} className="year-dropdown">
        {Array.from({ length: 5 }, (_, index) => 2020 + index).map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <CalendarHeatmap
        startDate={startOfYear(new Date(selectedYear, 0, 1))}
        endDate={endOfYear(new Date(selectedYear, 0, 1))}
        values={heatmapData.map(d => ({
          date: new Date(d.date),
          count: d.count
        }))}
        showWeekdayLabels={false} // Hide weekday labels
      />
    </div>
  );
};

export default Test;
