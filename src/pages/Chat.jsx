import React, { useEffect, useRef, useState } from "react";
import ChatItem from "../components/ChatItem";
import { askBot, clearChat, getChats } from "../helper/apiCommunicators.js";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../store/userAuth.jsx";
import { GiConsoleController } from "react-icons/gi";

const Chat = () => {
  let [chats, setChats] = useState([]);
  let query = useRef("");
  let navigate = useNavigate();

  let { isLoggedIn, user } = userAuth();

  async function askQuery() {
    let message = query.current.value;
    query.current.value = "";
    toast.loading("Getting respone from AI", { id: "query" });
    let data = await askBot(message);
    setChats(data);
    toast.success("Response genrated", { id: "query" });
  }

  async function clearConversation() {
    let res = await clearChat().catch((err) => {
      toast.error(err.message);
    });
    if (res == 200) {
      setChats([]);
      toast.success("Conversation deleted");
    }
  }

  useEffect(() => {
    async function getChatHelper() {
      let data = await getChats();
      setChats(data);
    }
    if (!isLoggedIn) {
      navigate("/home");
    } else {
      getChatHelper();
    }
  }, []);

  return (
    <div className="flex my-10">
      <div className="xs:w-[25%] max-xs:hidden h-[60vh] sticky top-32 items-center flex flex-col bg-slate-800 ml-10 rounded-2xl">
        <div className="inline-flex items-center justify-center w-14 h-14 overflow-hidden bg-[rgb(255,255,255,1)] rounded-full mt-8">
          <span className="text-2xl font-bold text-black">GPT</span>
        </div>
        <div className="text-sm font-semibold text-white my-2 text-center">
          You are talking to a ChatBot !
        </div>
        <div className="text-sm font-semibold text-white my-2 text-center">
          Avoid providing personal information in prompts.
        </div>
        <button
          type="button"
          onClick={clearConversation}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br mt-auto font-medium rounded-full text-sm px-5 py-2.5 text-center my-6"
        >
          Clear Conversation
        </button>
      </div>
      <div className="xs:mx-12 mx-4 w-full">
        <div className="text-5xl text-bold font-[roboto] text-center mb-2 italic">
          Gemini Pro AI
        </div>
        <div className="xs:w-[80%] w-full overflow-x-none overflow-y-auto mx-auto rounded-xl">
          {chats.map((chat, index) => {
            return (
              <ChatItem
                role={chat.role}
                content={chat.parts[0].text}
                key={index}
              ></ChatItem>
            );
          })}
        </div>
        <div className="xs:w-[80%] w-full mx-auto z-10 mt-3 sticky bottom-10">
          <textarea
            rows="1"
            className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ask any question..."
            ref={query}
          ></textarea>
          <button
            type="button"
            onClick={askQuery}
            className="focus:outline-none my-2 z-20 absolute right-[2px] bottom-[0.15rem] text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <IoSend />
          </button>
        </div>
        <div className="xs:w-[80%] w-full h-[2.9rem] mx-auto sticky bottom-0 bg-[#05101c]"></div>
      </div>
    </div>
  );
};

export default Chat;
