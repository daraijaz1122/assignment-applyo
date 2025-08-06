"use client";
import { Film, Search } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "./_components/LoadingSpinner";
import NoResults from "./_components/NoResults";
import MoviesCard from "./_components/MoviesCard";
import Footer from "./_components/Footer";

interface movieProps {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<movieProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [totalResults, setTotalResults] = useState("");
  const [response, setResponse] = useState(" ");
  const [movieList, setmovieList] = useState<movieProps[]>([]);

  const Omdb_Api = `https://www.omdbapi.com/?s=${searchQuery}&apikey=788040c1&page=${page}`;

  //fetch movies
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const data = await fetch(Omdb_Api);
      const json = await data.json();
      setLoading(false);
      setMovies(json.Search);

      setTotalResults(json.totalResults);
      setResponse(json.Response);
      setmovieList(json.Search);
    } catch (error) {
      console.log("Error searching movies", error);
    } finally {
      setLoading(false);
    }
  };
  //filter movies
  const filterMovies = (type: string, year: string) => {
    if (!movies) return;
    const filtered = movieList.filter((movie) => {
      const matchesType = type ? movie?.Type === type : true;
      const matchesYear = year ? movie?.Year === year : true;

      return matchesType && matchesYear;
    });

    setMovies(filtered);
  };

  //filter movies
  useEffect(() => {
    filterMovies(type, year);
  }, [type, year]);

  //fetch movies
  useEffect(() => {
    fetchMovies();
  }, [searchQuery, page]);

  const totalPages = Math.ceil(parseInt(totalResults || "0") / 10);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <header className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>

          <div className="relative max-w-6xl mx-auto px-6 py-16">
            {/* Logo and Title */}
            <div className="text-center mb-12">
              <div className="flex justify-center items-center mb-4">
                <Film className="w-12 h-12 text-purple-400 mr-3" />
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  MovieFinder/Applyo
                </h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-2 shadow-2xl">
                  <input
                    type="text"
                    placeholder="Search movies, genres..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-slate-300 px-6 py-4 text-lg focus:outline-none"
                  />

                  <Search className="w-5 h-5  mr-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {searchQuery && (
              <>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Search Results for "{searchQuery}"
                  </h2>
                  <p className="text-slate-400"> found {totalResults} movies</p>
                </div>

                <div className=" flex gap-4 w-full ">
                  <select
                    className="text-white font-semibold px-4 py-2 md:px-4 md:py-2 border-gray-300 bg-gray-400/50 rounded-lg w-1/2"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option className="text-black" disabled>
                      Select Type
                    </option>
                    <option className="text-black" value="movie">
                      Movie
                    </option>
                    <option className="text-black" value="series">
                      Series
                    </option>
                  </select>
                  {type && (
                    <input
                      className="text-white font-semibold px-4 py-2 border-gray-300 bg-gray-400/50 rounded-lg w-1/2"
                      type="number"
                      placeholder="Year..."
                      min="1900"
                      max="2099"
                      step="1"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  )}
                </div>
              </>
            )}
          </div>
          {/* movie rendering logic */}
          {loading ? (
            <LoadingSpinner />
          ) : response === "False" || movies?.length == null ? (
            <NoResults />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {movies?.map((movie: movieProps, index: number) => (
                <MoviesCard
                  key={index}
                  Poster={movie.Poster}
                  Type={movie.Type}
                  Year={movie.Year}
                  Title={movie.Title}
                  imdbID={movie.imdbID}
                />
              ))}
            </div>
          )}
        </main>
        {/* pagination */}
        {response != "False" && (
          <div className="flex justify-end items-center gap-5 px-16">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="bg-blue-500/20 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-500/30 hover:text-cyan-600 cursor-pointer"
            >
              Previous
            </button>

            <button
              onClick={() => setPage(page + 1)}
              className="bg-blue-500/20 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-500/30 hover:text-cyan-600 cursor-pointer"
              disabled={page === totalPages}
            >
              Next
            </button>

            <h2 className="px-4 py-4 font-bold  text-blue-700">
              Page: {page} | {totalPages}
            </h2>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}
