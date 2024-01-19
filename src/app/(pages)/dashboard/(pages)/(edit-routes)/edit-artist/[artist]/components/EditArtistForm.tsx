import { Preloaded } from "convex/react";
import React from "react";
import { api } from "../../../../../../../../../convex/_generated/api";

export default function EditArtistForm(params: {
  artist: string;
  preloadedTasks: Preloaded<typeof api.artists.getAll>;
}) {
  return <>{params.artist}</>;
}
