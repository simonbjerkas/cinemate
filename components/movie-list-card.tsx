import { List, User } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/components/movie-card";
import { UserAvatar } from "@/components/user-avatar";
import Link from "next/link";

interface MovieListCardProps {
  list: List;
  user: User;
}

export function MovieListCard({ list, user }: MovieListCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <Link href={`/profile/${user.username}`}>
            <UserAvatar user={user} showName />
          </Link>
          <span className="text-sm text-gray-500">
            {new Date(list.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-semibold">{list.title}</h3>
          <p className="text-gray-600">{list.description}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {list.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showRating={false} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {list.movies.length} movies
        </span>
        <Button
          variant="ghost"
          className="text-yellow-500 hover:text-yellow-600"
        >
          Follow List
        </Button>
      </CardFooter>
    </Card>
  );
}
