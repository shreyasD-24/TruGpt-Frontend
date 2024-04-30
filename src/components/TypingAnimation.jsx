import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        "Chat with Your Own AI",
        1000, // Waits 1s
        "Built using Google Gemini",
        2000,
        "Your own Customised Bot",
        1500,
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      className="xs:text-4xl text-3xl italic text-[rgb(100,243,213)] mx-auto drop-shadow-[0_0_35px_rgba(165,243,252,0.5)]"
    />
  );
};

export default TypingAnimation;
