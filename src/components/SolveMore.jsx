import React from "react";
import { Link } from "react-router-dom";
const SolveMore = ({username}) => {
    return(
        <div className="flex w-full ">
            <Link to={`/${username}/problems`} className="w-full text-center py-4 px-4 cursor-pointer rounded-xl text-white bg-black text-xl"> Click To Solve More </Link>
        </div>
    );
}

export default SolveMore;
