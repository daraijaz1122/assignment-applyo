import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="backdrop-blur-lg">
      <div className="flex justify-center items-center py-16 flex-col space-y-6">
        <div className="relative ">
          <div className="w-12 h-12 border-4 border-purple-200 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-300 text-md font-bold text-center">
          Fetching movies for you....
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
