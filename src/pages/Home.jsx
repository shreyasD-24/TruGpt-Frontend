import React from "react";
import TypingAnimation from "../components/TypingAnimation";
import { userAuth } from "../store/userAuth";

const Home = () => {
  let { user } = userAuth();
  return (
    <div className="flex xs:w-[80%] w-[100%] flex-col items-center gap-y-8 max-xs:gap-y-16 mx-auto mt-16 xs:mt-10">
      <TypingAnimation></TypingAnimation>
      <img
        src="/chatImg.png"
        alt="chat"
        className="xs:w-[60%] w-[80%] rounded-2xl xs:mt-8 mt-10 shadow-[0_0_50px_rgb(100,243,213)]"
      ></img>
      <img
        src="/airobot.png"
        alt="robot"
        className="xs:hidden h-[20rem] drop-shadow-[0_0_30px_rgba(165,243,252,0.5)]"
      ></img>
    </div>
  );
};

export default Home;
