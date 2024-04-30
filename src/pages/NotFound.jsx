import React from "react";

const NotFound = () => {
  return (
    <div className="w-[100%] flex place-content-center">
      <div className="bg-white opacity-70 rounded-2xl min-h-[30vh] mt-[150px] w-[80%] xs:w-[50%] flex items-center">
        <div
          class="p-4 mb-4 text-4xl text-[rgb(255,0,0)] w-[100%] text-center"
          role="alert"
        >
          404 : Page Not Found !!
        </div>
      </div>
    </div>
  );
};

export default NotFound;
