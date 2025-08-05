import { Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
interface movieProps {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}
const MoviesCard = ({ Poster, Title, Type, Year, imdbID }: movieProps) => {
  const router = useRouter();

  return (
    <Link href={`/movie-details/${imdbID}`}>
      <div
        className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 
      hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10  cursor-pointer
      "
      >
        {/* Movie Poster with Overlay */}
        <div className="relative overflow-hidden h-80">
          <img
            src={Poster}
            alt={Title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Bottom Overlay with Movie Info */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 z-10 ">
            <h3 className="text-white font-bold text-lg mb-1 hover:text-cyan-400">
              {Title}
            </h3>
            <div className="flex items-center gap-2 text-gray-300 text-sm hover:text-cyan-400">
              <span>{Year}</span>
              <span>•</span>
              <span className="bg-purple-600/70 text-purple-200 px-2 py-1 rounded text-xs">
                {Type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MoviesCard;
