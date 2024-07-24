import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, PointElement } from "chart.js";
import { fetchContestAPI } from "../api"; // Adjust the import path as necessary

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, PointElement);

const Contests = ({ username }) => {
    const [data, setData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchContestAPI(username); // Pass username to the API call
                console.log("Fetched Data: ", response);

                // Ensure the structure of response is correct
                if (response && response.contestParticipation) {
                    const fetchedContests = response.contestParticipation
                        .filter(contest => contest.problemsSolved > 0) // Filter out contests with 0 problems solved
                        .map((contest, index) => ({
                            title: contest.contest.title,
                            rating: contest.rating,
                            rank: contest.ranking,
                            problemsSolved: contest.problemsSolved,
                            date: new Date(contest.contest.startTime * 1000).toLocaleDateString("en-US", { month: 'short', year: 'numeric' }),
                            x: index + 1, // Contest number starting from 1
                            y: contest.rating,
                            index
                        }));

                    console.log("Processed Contests Array: ", fetchedContests);
                    setData(fetchedContests); // Update local data state
                } else {
                    console.error("Unexpected response structure: ", response);
                }
            } catch (error) {
                console.error("Error fetching contest data:", error);
            }
        };

        if (username) { // Only fetch data if username is provided
            fetchData();
        }
    }, [username]);

    // Compute the maximum and minimum ratings
    const maxRating = Math.max(...data.map(d => d.rating), 0) + 100; // Add buffer to max rating
    const minRating = Math.min(...data.map(d => d.rating), 0); // Minimum rating

    // Calculate statistics
    const avgRank = data.length ? (data.reduce((acc, cur) => acc + cur.rank, 0) / data.length).toFixed(2) : 0;
    const maxRatingValue = Math.max(...data.map(d => d.rating), 0);
    const avgQuestionsSolved = data.length ? (data.reduce((acc, cur) => acc + cur.problemsSolved, 0) / data.length).toFixed(2) : 0;

    const chartData = {
        labels: data.map((_, index) => index + 1), // Contest numbers as labels
        datasets: [
            {
                label: "Rating",
                data: data.map(d => ({ x: d.x, y: d.y })), // Use x and y for scatter plot format
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderWidth: 2,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                showLine: true, // Ensure the line is shown between points
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: false,
                external: (context) => {
                    const { tooltip } = context;
                    if (tooltip.opacity === 0) {
                        setHoveredIndex(null);
                        return;
                    }
                    const index = tooltip.dataPoints[0].dataIndex;
                    setHoveredIndex(index);
                    setTooltipPosition({
                        top: tooltip.caretY,
                        left: tooltip.caretX
                    });
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Contest Number"
                },
                ticks: {
                    stepSize: 1, // Ensure each contest number is displayed
                }
            },
            y: {
                beginAtZero: false,
                min: minRating, // Start y-axis from minimum rating
                max: maxRating, // End y-axis at maximum rating
                ticks: {
                    stepSize: 500, // Set the step size for the y-axis to 500
                },
                title: {
                    display: true,
                    text: "Rating"
                }
            }
        }
    };

    const hoveredContest = hoveredIndex !== null ? data[hoveredIndex] : null;

    return (
        <div className="p-6 relative h-fit">
            <h2 className="text-2xl font-semibold mb-4">LeetCode Contest History</h2>
            <div className="relative">
                <Line data={chartData} options={options} />
                {hoveredContest && (
                    <div
                        className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4"
                        style={{ top: tooltipPosition.top + 10, left: tooltipPosition.left + 10 }}
                    >
                        <h3 className="text-lg font-semibold mb-2">{hoveredContest.title}</h3>
                        <div className="grid grid-cols-1 gap-2">
                            <p className="text-sm text-gray-600"><strong>Rating:</strong> {hoveredContest.rating}</p>
                            <p className="text-sm text-gray-600"><strong>Rank:</strong> {hoveredContest.rank}</p>
                            <p className="text-sm text-gray-600"><strong>Questions Solved:</strong> {hoveredContest.problemsSolved}</p>
                            <p className="text-sm text-gray-600"><strong>Date:</strong> {hoveredContest.date}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-semibold">Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow">
                        <p className="text-sm text-gray-600"><strong>Average Rank:</strong> {avgRank}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow">
                        <p className="text-sm text-gray-600"><strong>Maximum Rating:</strong> {maxRatingValue}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow">
                        <p className="text-sm text-gray-600"><strong>Average Questions Solved:</strong> {avgQuestionsSolved}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contests;
