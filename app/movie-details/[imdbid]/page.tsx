"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

// Loading spinner (you can replace with your component)
import LoadingSpinner from "@/app/_components/LoadingSpinner";

// Optional fallback movie data for initial state or testing
const defaultMovieData = {
  Title: "",
  Year: "",
  Rated: "",
  Released: "",
  Runtime: "",
  Genre: "",
  Director: "",
  Writer: "",
  Actors: "",
  Plot: "",
  Language: "",
  Country: "",
  Awards: "",
  Poster: "",
  Ratings: [],
  imdbRating: "",
  imdbVotes: "",
  imdbID: "",
  Type: "",
  DVD: "",
  BoxOffice: "",
  Production: "",
  Website: "",
  Response: "False",
};

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
  const imdbID = params.imdbid;
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(false);

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

  if (movieData?.Response === "False") {
    return (
      <div className="text-white text-center text-lg font-semibold py-10">
        Movie not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 px-4">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={movieData.Poster}
            alt={movieData.Title}
            className="rounded-lg shadow-lg object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{movieData.Title}</h1>
            <p className="text-gray-400 mb-4 italic">{movieData.Plot}</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <p>
                <strong>Year:</strong> {movieData.Year}
              </p>
              <p>
                <strong>Rated:</strong> {movieData.Rated}
              </p>
              <p>
                <strong>Released:</strong> {movieData.Released}
              </p>
              <p>
                <strong>Runtime:</strong> {movieData.Runtime}
              </p>
              <p>
                <strong>Genre:</strong> {movieData.Genre}
              </p>
              <p>
                <strong>Director:</strong> {movieData.Director}
              </p>
              <p>
                <strong>Actors:</strong> {movieData.Actors}
              </p>
              <p>
                <strong>Language:</strong> {movieData.Language}
              </p>
              <p>
                <strong>Country:</strong> {movieData.Country}
              </p>
              <p>
                <strong>Awards:</strong> {movieData.Awards}
              </p>
              <p>
                <strong>Box Office:</strong> {movieData.BoxOffice}
              </p>
              <p>
                <strong>Production:</strong> {movieData.Production}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              {movieData.Ratings?.map((rating, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 rounded-full bg-gray-800 text-sm font-medium"
                >
                  {rating.Source}: {rating.Value}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a
                href={`https://www.imdb.com/title/${movieData.imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:underline"
              >
                View on IMDb <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
