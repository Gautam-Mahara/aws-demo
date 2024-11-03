import React, { useState } from "react";

export default function Mainpage() {
  // State to manage dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle card click (for demonstration)
  const handleCardClick = (option) => {
    alert(`You clicked on ${option}`);
  };

  return (
    <>
      <div
        className={`w-screen h-screen ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {/* Button positioned at the top-right corner */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 px-6 py-3 text-xl rounded-lg bg-gray-800 text-white hover:bg-gray-600 dark:bg-gray-300 dark:text-black"
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>

        {/* Two rows with card-like clickable divs */}
        <div className="flex flex-col justify-center items-center h-full space-y-8 w-screen px-4">
          {/* Row 1 */}
          <div className="flex w-full justify-between space-x-4">
            <div
              className="flex-1 p-6 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out h-48"
              onClick={() => handleCardClick("Option 1")}
            >
              <div className="text-2xl text-white text-center h-full flex justify-center items-center">
                DashBoard
              </div>
            </div>
            <div
              className="flex-1 p-6 bg-green-500 rounded-lg shadow-lg hover:bg-green-700 cursor-pointer transition duration-300 ease-in-out h-48"
              onClick={() => handleCardClick("Option 2")}
            >
              <div className="text-2xl text-white text-center h-full flex justify-center items-center">
                 
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex w-full justify-between space-x-4">
            <div
              className="flex-1 p-6 bg-red-500 rounded-lg shadow-lg hover:bg-red-700 cursor-pointer transition duration-300 ease-in-out h-48"
              onClick={() => handleCardClick("Option 3")}
            >
              <div className="text-2xl text-white text-center h-full flex justify-center items-center">
                Setting
              </div>
            </div>
            <div
              className="flex-1 p-6 bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-700 cursor-pointer transition duration-300 ease-in-out h-48"
              onClick={() => handleCardClick("Option 4")}
            >
              <div className="text-2xl text-white text-center h-full flex justify-center items-center">
                About us
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
