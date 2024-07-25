import React from "react";
import Profile from "./Profile";
import Badges from "./Badges";
import Question from "./Question";
import { useParams } from "react-router-dom";
import Contests from "./Contests";
import 'tailwindcss/tailwind.css';
import Heatmap from "./Heatmap";
import QuestionList from "./QuestionList";
import SolveMore from "./SolveMore";

const Home = () => {
  const { username } = useParams();

  // Only render components if username is present
  if (!username) {
    return <div className="flex justify-center items-center h-screen">Username not provided</div>;
  }

  return (
    <div className="p-0">
      {/* Flex container for larger screens, stack in column on smaller screens */}
      <h1 className="mb-6 py-5 text-center text-3xl text-white font-extrabold bg-black">LeetCodeAnalysis.io</h1>
      <div className="flex flex-col lg:flex-row justify-around p-5 rounded-lg">
        <Profile username={username} />
        <Badges username={username} />
        <div className="w-fit h-fit p-5 ">
          <Question username={username} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row px-5">
        <div className="w-auto flex flex-col p-4">
          <Contests username={username} />
          <SolveMore username={username} />
        </div>
        <div className="w-full overflow-x-auto lg:w-auto">
          <QuestionList />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full overflow-x-auto lg:w-10/12">
          <Heatmap username={username} />
        </div>
      </div>
    </div>
  );
};

export default Home;
