import React from "react";

export default function page({ params }: { params: { track: string } }) {
  const track = params.track;

  return <>{track}</>;
}
