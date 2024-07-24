import React from "react";
import Profile from "./Profile";
import Badges from "./Badges";
import Question from "./Question";
import { useParams } from "react-router-dom";
import Contests from "./Contests";

const Home = () => {
  const { username } = useParams();
  return (
    <div className="flex w-fit p-2">
      <Profile username={username} />
      <Badges username={username} />
      <Question username = {username}/>
      <Contests username = {username}/>
    </div>
  );
};

export default Home;
