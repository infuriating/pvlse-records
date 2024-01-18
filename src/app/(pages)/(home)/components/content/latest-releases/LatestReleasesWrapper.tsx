import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../../convex/_generated/api";
import LatestReleases from "./LatestReleases";

export async function LatestReleasesWrapper() {
  const preloadedTasks = await preloadQuery(api.tracks.getAll);
  return <LatestReleases preloadedTasks={preloadedTasks} />;
}
