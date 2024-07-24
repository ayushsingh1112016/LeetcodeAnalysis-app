import React from "react";
import Profile from "./Profile";
import Badges from "./Badges";
import Question from "./Question";
import { useParams } from "react-router-dom";
import Contests from "./Contests";
import 'tailwindcss/tailwind.css';
import Heatmap from "./Heatmap";
import Test from "./Test";
import QuestionList from "./QuestionList";

const Home = () => {
  const { username } = useParams();

  // Only render components if username is present
  if (!username) {
    return <div className="flex justify-center items-center h-screen">Username not provided</div>;
  }

  return (
    <div className="p-5" >
      <div className="flex justify-around p-5  rounded-lg">
          <Profile username={username} />
          <Badges username={username} />
          <div className="w-60 h-fit p-5">
            <Question username={username} />
          </div>
      </div>
      <div className="flex px-5">
        <Contests className= "w-1/2"username={username} />
        <QuestionList/>  
      </div>
      <div className="flex justify-center">
        <div className="w-10/12">
        <Heatmap username={username} />
        </div>
      </div>
      
    </div>
  );
};

export default Home;
