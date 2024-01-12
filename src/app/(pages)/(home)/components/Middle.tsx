import React from "react";
import Hero from "./content/Hero";
import FeaturedArtist from "./content/FeaturedArtist";
import LatestReleases from "./content/LatestReleases";

export default function Middle() {
  return (
    <div className="grid grid-cols-2 grid-rows-4 pt-6 px-8">
      <div className="col-span-1 row-span-2 pt-8">
        <Hero />
      </div>
      <div className="col-span-1 row-span-4">
        <FeaturedArtist />
      </div>
      <div className="col-span-1 row-span-2">
        <LatestReleases />
      </div>
    </div>
  );
}
