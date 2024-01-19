import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../../convex/_generated/api";
import EditTrack from "./components/EditTrack";

export default async function EditTrackWrapper() {
  const preloadedTasks = await preloadQuery(api.tracks.getAll);
  return <EditTrack preloadedTasks={preloadedTasks} />;
}
