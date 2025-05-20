import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface MovieCardProps {
  movie: Movie;
  showRating?: boolean;
}

export function MovieCard({ movie, showRating = true }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] overflow-hidden">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {showRating && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-black">
                    {movie.rating.toFixed(1)}
                  </div>
                  <div className="text-sm text-white">
                    <div className="font-semibold">{movie.title}</div>
                    <div className="text-xs text-gray-300">{movie.year}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        {!showRating && (
          <CardFooter className="p-3">
            <div className="text-sm">
              <div className="font-semibold">{movie.title}</div>
              <div className="text-xs text-gray-500">{movie.year}</div>
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
