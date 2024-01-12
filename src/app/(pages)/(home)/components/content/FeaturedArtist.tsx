import React from "react";

export default function FeaturedArtist() {
  return (
    <div className="grid place-items-center w-full">
      <p className="text-sm font-bold">Featured Artist</p>
      <div className="border mt-2 p-4">
        <div className="bg-gray-200 h-96 aspect-square rounded-lg" />
        <p className="font-bold pt-2 text-center">dashie</p>
      </div>
    </div>
  );
}
