import { CarouselSection } from './carousel';
import { ActivitySection } from './activity';
import { TrendingMoviesSection } from './trending';

export default function Home() {
  return (
    <div className="py-8">
      <CarouselSection />
      <ActivitySection />
      <TrendingMoviesSection />
    </div>
  );
}
