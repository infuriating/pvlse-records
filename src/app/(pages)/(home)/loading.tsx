import Hero from "./components/content/Hero";
import FeaturedArtistSkeleton from "./components/loading-state/FeaturedArtistSkeleton";
import LatestReleasesSkeleton from "./components/loading-state/LatestReleasesSkeleton";

export default function loading() {
  return (
    <div className="flex justify-center pt-8">
      <div className="flex flex-col md:grid grid-cols-2 grid-rows-4 px-8 max-w-[1600px]">
        <div className="col-span-1 row-span-2 lg:pt-4">
          <Hero />
        </div>
        <div className="col-span-1 row-span-4 lg:pt-4">
          <FeaturedArtistSkeleton />
        </div>
        <div className="col-span-1 row-span-2 flex justify-center pb-8 lg:pb-0 lg:justify-start">
          <LatestReleasesSkeleton />
        </div>
      </div>
    </div>
  );
}
