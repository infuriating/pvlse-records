import { preloadQuery } from "convex/nextjs";
import Tracks from "./components/Tracks";
import { api } from "../../../../convex/_generated/api";

export default async function ArtistsWrapper() {
  const preloadedTasks = await preloadQuery(api.tracks.getAll);
  return <Tracks preloadedTasks={preloadedTasks} />;
}
