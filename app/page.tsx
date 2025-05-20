import { dummyActivities, dummyMovies } from "@/lib/dummy-data";
import { MovieCard } from "@/components/movie-card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative mb-12 h-[60vh] overflow-hidden rounded-xl">
        <Image
          src={dummyMovies[0].backdropUrl}
          alt={dummyMovies[0].title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="mb-4 text-4xl font-bold text-white">
              {dummyMovies[0].title}
            </h1>
            <p className="mb-6 max-w-2xl text-lg text-gray-200">
              {dummyMovies[0].description}
            </p>
            <Link
              href={`/movies/${dummyMovies[0].id}`}
              className="inline-block rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-400"
            >
              View Details
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Recent Activity</h2>
        <div className="space-y-4">
          {dummyActivities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={`https://i.pravatar.cc/150?img=${activity.userId}`}
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{activity.content}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Movies */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">Featured Movies</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {dummyMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}
