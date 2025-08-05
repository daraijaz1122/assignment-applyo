import { Film } from "lucide-react";
import React from "react";

const NoResults = () => {
  return (
    <div className="text-center py-16">
      <Film className="w-16 h-16 text-slate-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-slate-300 mb-2">
        No movies found
      </h3>
      <p className="text-slate-400 mb-6">
        Try searching for a different title or genre
      </p>
    </div>
  );
};

export default NoResults;
