import { dummyMovies, dummyReviews } from "@/lib/dummy-data";
import Image from "next/image";
import { notFound } from "next/navigation";

interface MoviePageProps {
  params: {
    id: string;
  };
}

export default function MoviePage({ params }: MoviePageProps) {
  const movie = dummyMovies.find((m) => m.id === params.id);
  const movieReviews = dummyReviews.filter((r) => r.movieId === params.id);

  if (!movie) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative mb-8 h-[50vh] overflow-hidden rounded-xl">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-end gap-8">
              <div className="relative h-48 w-32 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={movie.posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="mb-2 text-4xl font-bold text-white">
                  {movie.title} ({movie.year})
                </h1>
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-black">
                    {movie.rating.toFixed(1)}
                  </div>
                  <div className="text-gray-300">
                    <p>{movie.director}</p>
                    <p>{movie.runtime} min</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full bg-white/10 px-3 py-1 text-sm text-white"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Overview</h2>
            <p className="text-gray-700">{movie.description}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
            <div className="space-y-4">
              {movieReviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-black">
                      {review.rating}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.content}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div>
          <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full rounded-lg bg-yellow-500 px-4 py-2 text-center font-semibold text-black transition-colors hover:bg-yellow-400">
                Add to Watchlist
              </button>
              <button className="w-full rounded-lg border border-gray-300 px-4 py-2 text-center font-semibold transition-colors hover:bg-gray-50">
                Write a Review
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
