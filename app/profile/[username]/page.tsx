import { dummyUsers, dummyLists, dummyMovies } from "@/lib/dummy-data";
import { MovieCard } from "@/components/movie-card";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const user = dummyUsers.find((u) => u.username === params.username);
  const userLists = dummyLists.filter((l) => l.userId === user?.id);

  if (!user) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="mb-8 flex items-end gap-8">
        <div className="relative h-32 w-32 overflow-hidden rounded-full">
          <Image
            src={user.avatarUrl}
            alt={user.username}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="mb-2 text-3xl font-bold">{user.username}</h1>
          <p className="mb-4 text-gray-600">{user.bio}</p>
          <div className="flex gap-6">
            <div>
              <div className="text-2xl font-bold">{user.watchedCount}</div>
              <div className="text-sm text-gray-500">Watched</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{user.watchlistCount}</div>
              <div className="text-sm text-gray-500">Watchlist</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{user.followersCount}</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{user.followingCount}</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lists Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Lists</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {userLists.map((list) => (
            <div
              key={list.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-2 text-xl font-semibold">{list.title}</h3>
              <p className="mb-4 text-gray-600">{list.description}</p>
              <div className="grid grid-cols-3 gap-4">
                {list.movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} showRating={false} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Watched */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">Recently Watched</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {dummyMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}
