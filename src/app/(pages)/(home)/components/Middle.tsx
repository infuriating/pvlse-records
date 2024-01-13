import React from "react";
import Hero from "./content/Hero";
import FeaturedArtist from "./content/FeaturedArtist";
import LatestReleases from "./content/latest-releases/LatestReleases";

export default function Middle() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col md:grid grid-cols-2 grid-rows-4 px-8 max-w-[1600px]">
        <div className="col-span-1 row-span-2 pt-4 lg:pt-8">
          <Hero />
        </div>
        <div className="col-span-1 row-span-4 pt-12">
          <FeaturedArtist />
        </div>
        <div className="col-span-1 row-span-2 flex justify-center pb-8 lg:pb-0 lg:justify-start">
          <LatestReleases />
        </div>
      </div>
    </div>
  );
}
