"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronsLeft, ExternalLink } from "lucide-react";
import LoadingSpinner from "@/app/_components/LoadingSpinner";

type Rating = {
  Source: string;
  Value: string;
};

type MovieData = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export default function MovieDetails() {
  const params = useParams();
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const imdbID = params.imdbid;
  useEffect(() => {
    if (!imdbID) return;
    fetchMovieData();
  }, [imdbID]);

  const fetchMovieData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=788040c1`
      );
      const jsonData = await response.json();
      setMovieData(jsonData);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
    setLoading(false);
  };

  if (loading || !movieData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <button
              onClick={() => router.back()}
              className="px-6 gap-2 py-2 bg-blue-500/20 text-white text-lg font-semibold flex items-center rounded-lg hover:bg-gray-400/50 cursor-pointer"
            >
              <ChevronsLeft className="h-6 w-6 text-white" />
              Back
            </button>
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              {movieData.Title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-lg text-gray-300">
              <span className="px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30">
                {movieData.Year}
              </span>
              <span className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-400/30">
                {movieData.Rated}
              </span>
              <span className="px-3 py-1 bg-pink-500/20 rounded-full border border-pink-400/30">
                {movieData.Runtime}
              </span>
            </div>
          </div>

          {/* Main content */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-purple-400/30 transition-all duration-500">
            <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col items-center justify-between">
              {/* Movie Poster */}
              <div className="lg:w-1/3 p-8 md:w-1/2 sm:w-48px ">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <img
                    src={movieData.Poster}
                    alt={movieData.Title}
                    className="relative z-10 w-full h-auto rounded-2xl shadow-2xl object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Movie Details */}
              <div className="lg:w-2/3  md:w-1/2 p-8  text-white">
                {/* Plot */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Plot Summary
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed italic bg-gradient-to-r from-gray-800/50 to-purple-900/50 p-6 rounded-xl border border-purple-500/20">
                    "{movieData.Plot}"
                  </p>
                </div>

                {/* Movie Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-xl border border-blue-400/20">
                      <span className="text-blue-300 font-semibold">
                        Released:
                      </span>
                      <span className="ml-2 text-gray-200">
                        {movieData.Released}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-xl border border-purple-400/20">
                      <span className="text-purple-300 font-semibold">
                        Genre:
                      </span>
                      <span className="ml-2 text-gray-200">
                        {movieData.Genre}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500/10 to-blue-500/10 p-4 rounded-xl border border-pink-400/20">
                      <span className="text-pink-300 font-semibold">
                        Director:
                      </span>
                      <span className="ml-2 text-gray-200">
                        {movieData.Director}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-xl border border-blue-400/20">
                      <span className="text-blue-300 font-semibold">
                        Language:
                      </span>
                      <span className="ml-2 text-gray-200">
                        {movieData.Language}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-xl border border-purple-400/20">
                      <span className="text-purple-300 font-semibold">
                        Country:
                      </span>
                      <span className="ml-2 text-gray-200">
                        {movieData.Country}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500/10 to-blue-500/10 p-4 rounded-xl border border-pink-400/20">
                      <span className="text-pink-300 font-semibold">
                        Box Office:
                      </span>
                      <span className="ml-2 text-gray-200">
                        {movieData.BoxOffice}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-xl border border-purple-400/20">
                      <span className="text-purple-300 font-semibold">
                        Actors:
                      </span>
                      <span className="ml-2 text-gray-200">
                        {movieData.Actors}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500/10 to-blue-500/10 p-4 rounded-xl border border-pink-400/20">
                      <span className="text-pink-300 font-semibold">
                        Awards:
                      </span>
                      <span className="ml-2 text-gray-200">
                        {movieData.Awards}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-xl border border-blue-400/20">
                      <span className="text-blue-300 font-semibold">
                        Production:
                      </span>
                      <span className="ml-2 text-gray-200">
                        {movieData.Production}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ratings */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Ratings
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {movieData.Ratings?.map((rating, idx) => (
                      <div
                        key={idx}
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-purple-400/30 text-white font-medium hover:scale-105 transition-transform duration-200"
                      >
                        <span className="text-purple-300">
                          {rating.Source}:
                        </span>
                        <span className="ml-2 text-white font-bold">
                          {rating.Value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* IMDb Link */}
                <div className="flex justify-center">
                  <a
                    href={`https://www.imdb.com/title/${movieData.imdbID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <span>View on IMDb</span>
                    <ExternalLink
                      size={20}
                      className="group-hover:rotate-12 transition-transform duration-300"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
