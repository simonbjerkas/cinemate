import { Movie, User, Review, List, Activity } from "./types";

export const dummyMovies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    year: 2010,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    director: "Christopher Nolan",
    genres: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    runtime: 148,
  },
  {
    id: "2",
    title: "The Shawshank Redemption",
    year: 1994,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    director: "Frank Darabont",
    genres: ["Drama"],
    rating: 9.3,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    runtime: 142,
  },
  {
    id: "3",
    title: "Parasite",
    year: 2019,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    director: "Bong Joon-ho",
    genres: ["Drama", "Thriller"],
    rating: 8.6,
    description:
      "All unemployed, Ki-taek and his family take peculiar interest in the wealthy and glamorous Parks, as they ingratiate themselves into their lives and get entangled in an unexpected incident.",
    runtime: 132,
  },
  {
    id: "4",
    title: "The Dark Knight",
    year: 2008,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    director: "Christopher Nolan",
    genres: ["Action", "Crime", "Drama"],
    rating: 9.0,
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    runtime: 152,
  },
  {
    id: "5",
    title: "Pulp Fiction",
    year: 1994,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2QM528B8hq3Z4i.jpg",
    director: "Quentin Tarantino",
    genres: ["Crime", "Drama"],
    rating: 8.9,
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    runtime: 154,
  },
];

export const dummyUsers: User[] = [
  {
    id: "1",
    username: "moviebuff",
    avatarUrl:
      "https://image.tmdb.org/t/p/w185/2v9FVVBUrrkW2m3QOcYkuhq9A6o.jpg", // Christopher Nolan's profile
    bio: "Film enthusiast and aspiring director. Love everything from indie to blockbusters.",
    watchlistCount: 42,
    watchedCount: 156,
    followersCount: 234,
    followingCount: 89,
  },
  {
    id: "2",
    username: "cinemaphile",
    avatarUrl:
      "https://image.tmdb.org/t/p/w185/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", // Bong Joon-ho's profile
    bio: "Professional film critic and lover of world cinema.",
    watchlistCount: 28,
    watchedCount: 423,
    followersCount: 567,
    followingCount: 123,
  },
];

export const dummyReviews: Review[] = [
  {
    id: "1",
    userId: "1",
    movieId: "1",
    rating: 5,
    content: "A masterpiece of modern cinema. Nolan at his absolute best.",
    createdAt: "2024-03-15T10:00:00Z",
    likes: 45,
  },
  {
    id: "2",
    userId: "2",
    movieId: "2",
    rating: 5,
    content: "Timeless classic that gets better with every watch.",
    createdAt: "2024-03-14T15:30:00Z",
    likes: 67,
  },
  {
    id: "3",
    userId: "1",
    movieId: "3",
    rating: 5,
    content: "A brilliant social commentary wrapped in a thrilling package.",
    createdAt: "2024-03-13T09:15:00Z",
    likes: 89,
  },
];

export const dummyLists: List[] = [
  {
    id: "1",
    userId: "1",
    title: "My Favorite Sci-Fi Movies",
    description:
      "A collection of mind-bending science fiction films that changed the genre.",
    movies: [dummyMovies[0], dummyMovies[3]],
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-15T00:00:00Z",
  },
  {
    id: "2",
    userId: "2",
    title: "Best of 2019",
    description: "The most impactful films from 2019.",
    movies: [dummyMovies[2]],
    createdAt: "2024-03-10T00:00:00Z",
    updatedAt: "2024-03-15T00:00:00Z",
  },
  {
    id: "3",
    userId: "1",
    title: "Quentin Tarantino Collection",
    description: "A curated list of Tarantino's finest works.",
    movies: [dummyMovies[4]],
    createdAt: "2024-03-05T00:00:00Z",
    updatedAt: "2024-03-15T00:00:00Z",
  },
];

export const dummyActivities: Activity[] = [
  {
    id: "1",
    userId: "1",
    type: "review",
    content: "Posted a review for Inception",
    createdAt: "2024-03-15T10:00:00Z",
    movieId: "1",
  },
  {
    id: "2",
    userId: "2",
    type: "list",
    content: "Created a new list: Best of 2019",
    createdAt: "2024-03-10T00:00:00Z",
    listId: "2",
  },
  {
    id: "3",
    userId: "1",
    type: "review",
    content: "Posted a review for Parasite",
    createdAt: "2024-03-13T09:15:00Z",
    movieId: "3",
  },
];
