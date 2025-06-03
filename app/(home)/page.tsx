import { CarouselSection } from './carousel';
import { ActivitySection } from './activity';
import { TrendingMoviesSection } from './trending';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <div className="py-8">
      <CarouselSection />
      <ActivitySection />
      <TrendingMoviesSection />
    </div>
  );
}
