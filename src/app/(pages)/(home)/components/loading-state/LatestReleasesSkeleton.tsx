"use client";

import Track from "../content/latest-releases/Track";

export default function LatestReleasesSkeleton() {
  return (
    <div className="pt-8 md:pt-4">
      <p className="text-sm rounded-t-sm px-2 py-1 font-bold bg-primary w-max text-secondary">
        Latest Releases
      </p>
      <div className="grid grid-cols-2 gap-y-6 lg:gap-y-0 lg:grid-cols-4 w-max gap-x-6 p-4 bg-muted rounded-b-md">
        <Track name="..." artists={["..."]} image="" url="" genre="..." />
        <Track name="..." artists={["..."]} image="" url="" genre="..." />
        <Track name="..." artists={["..."]} image="" url="" genre="..." />
        <Track name="..." artists={["..."]} image="" url="" genre="..." />
      </div>
    </div>
  );
}
