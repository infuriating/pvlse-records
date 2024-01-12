import React from "react";

export default function LatestReleases() {
  return (
    <div className="pt-16">
      <p className="text-sm rounded-t-sm px-4 py-2 font-bold bg-primary w-max text-secondary">
        Latest Releases
      </p>
      <div className="grid grid-cols-4 w-max gap-x-6 p-4 bg-muted rounded-b-md">
        <div>
          <div className="bg-gray-200 h-36 aspect-square rounded-lg" />
          <p className="font-bold">nevoa</p>
          <p className="text-sm">dashie & ISXRO</p>
        </div>
        <div>
          <div className="bg-gray-200 h-36 aspect-square rounded-lg" />
          <p className="font-bold">nevoa</p>
          <p className="text-sm">dashie & ISXRO</p>
        </div>
        <div>
          <div className="bg-gray-200 h-36 aspect-square rounded-lg" />
          <p className="font-bold">nevoa</p>
          <p className="text-sm">dashie & ISXRO</p>
        </div>
        <div>
          <div className="bg-gray-200 h-36 aspect-square rounded-lg" />
          <p className="font-bold">nevoa</p>
          <p className="text-sm">dashie & ISXRO</p>
        </div>
      </div>
    </div>
  );
}
