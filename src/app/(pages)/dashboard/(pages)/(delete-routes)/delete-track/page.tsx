import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../../convex/_generated/api";
import DeleteTrack from "./components/DeleteTrack";

export default async function DeleteTrackWrapper() {
  const preloadedTasks = await preloadQuery(api.artists.getAll);
  return <DeleteTrack preloadedTasks={preloadedTasks} />;
}
