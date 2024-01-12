import React from "react";

export default function page({ params }: { params: { artist: string } }) {
  const artist = params.artist;

  return <>{artist}</>;
}
