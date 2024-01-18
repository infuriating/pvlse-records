import { preloadQuery } from "convex/nextjs";
import Artist from "./components/Artist";
import { api } from "../../../../../convex/_generated/api";

export default async function ArtistWrapper({
  params,
}: {
  params: { artist: string };
}) {
  const preloadedTasks = await preloadQuery(api.artists.getAll);
  return <Artist artist={params.artist} preloadedTasks={preloadedTasks} />;
}
