import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center mr-auto xs:ml-10 xs:gap-3 gap-2 xs:mt-2 max-xs:mt-3 max-xs:text-lg">
      <Link to="/">
        <img
          src="/openai.png"
          alt="openAi"
          className="w-[35px] invert max-xs:ml-2 animate-spin-slow"
        ></img>
      </Link>
      <div>
        <span className="xs:text-lg text-2xl font-semibold">TRU</span>-GPT
      </div>
    </div>
  );
};

export default Logo;
