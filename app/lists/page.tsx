import { dummyLists, dummyUsers } from "@/lib/dummy-data";
import { MovieListCard } from "@/components/movie-list-card";
import { Button } from "@/components/ui/button";

export default function ListsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Movie Lists</h1>
        <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
          Create New List
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {dummyLists.map((list) => {
          const user = dummyUsers.find((u) => u.id === list.userId);
          if (!user) return null;
          return <MovieListCard key={list.id} list={list} user={user} />;
        })}
      </div>
    </main>
  );
}
