import { preloadQuery } from "convex/nextjs";
import Artists from "./components/Artists";
import { api } from "../../../../convex/_generated/api";

export default async function ArtistsWrapper() {
  const preloadedTasks = await preloadQuery(api.artists.getAll);
  return <Artists preloadedTasks={preloadedTasks} />;
}
