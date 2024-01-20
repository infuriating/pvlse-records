"use client";

import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "../../../../../../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DeleteTrackConfirmation(params: {
  track: string;
  preloadedTasks: Preloaded<typeof api.tracks.getTrack>;
}) {
  const router = useRouter();

  const track = usePreloadedQuery(params.preloadedTasks);
  const trackMutation = useMutation(api.tracks.deleteTrack);

  const [disabled, setDisabled] = useState(false);

  if (!track) return <></>;

  const confirmDeletion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    toast.info(`Deleting artist ${track.title}...`);
    trackMutation({
      title: track.title,
    });

    toast.success(`Deleted artist ${track.title}!`);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center py-6 px-12">
      <p className="font-semibold text-center text-lg lg:text-4xl">
        Are you sure that you want to delete track{" "}
        <span className="font-bold">{track.title}</span>?
      </p>
      <p className="lg:text-2xl font-medium text-muted-foreground">
        This action cannot be undone.
      </p>
      <div className="flex gap-x-4 pt-4">
        <Link href={"/dashboard"}>
          <Button
            className="text-lg font-semibold"
            type="button"
            variant={"secondary"}
            disabled={disabled}
          >
            Cancel
          </Button>
        </Link>
        <form onSubmit={confirmDeletion}>
          <Button
            className="text-lg font-semibold"
            variant={"destructive"}
            disabled={disabled}
          >
            Delete
          </Button>
        </form>
      </div>
    </div>
  );
}
