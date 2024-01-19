"use client";

import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "../../../../../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadButton } from "@/utils/uploadthing";

export default function EditTrackForm(params: {
  track: string;
  preloadedTasks: Preloaded<typeof api.tracks.getAll>;
}) {
  const router = useRouter();

  const track = usePreloadedQuery(params.preloadedTasks);
  const trackMutation = useMutation(api.tracks.editTrack);

  const filteredTrack = track.filter(
    (track) => track.title === params.track
  )[0];

  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState({
    title: filteredTrack.title,
    artists: filteredTrack.artists,
    coverImage: filteredTrack.coverImage,
    url: filteredTrack.url,
  });

  if (!track) return <></>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    toast.info(`Editing track ${filteredTrack.title}...`);

    if (data.artists[1] === undefined) data.artists[1] = "";
    if (data.artists[2] === undefined) data.artists[2] = "";

    await trackMutation({
      title: data.title,
      artists: data.artists,
      url: data.url,
      coverImage: data.coverImage,
    });

    toast.success(`Edited track ${data.title}!`);
    router.push("/dashboard");
  };

  return (
    <div className="py-12 px-8 lg:flex flex-col items-center">
      <p className="text-2xl font-semibold">Edit a Track</p>
      <form
        className="max-w-screen pt-6 lg:min-w-[920px] "
        onSubmit={handleSubmit}
      >
        <Label htmlFor="name">Name</Label>
        <Input
          required
          className="mt-1 mb-3"
          type="text"
          name="name"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <Label htmlFor="artist1">Artists</Label>
        <div className="flex flex-col lg:flex-row gap-x-6">
          <Input
            required
            className="mt-1"
            type="text"
            name="social1"
            value={data.artists[0]}
            onChange={(e) =>
              setData({
                ...data,
                artists: [e.target.value, data.artists[1], data.artists[2]],
              })
            }
          />
          <Input
            className="mt-1"
            type="text"
            name="social2"
            value={data.artists[1]}
            onChange={(e) =>
              setData({
                ...data,
                artists: [data.artists[0], e.target.value, data.artists[2]],
              })
            }
          />
          <Input
            className="mt-1 mb-3"
            type="text"
            name="social3"
            value={data.artists[2]}
            onChange={(e) =>
              setData({
                ...data,
                artists: [data.artists[0], data.artists[1], e.target.value],
              })
            }
          />
        </div>
        <Label htmlFor="url">Spotify URL</Label>
        <Input
          className="mt-1 mb-3"
          type="text"
          name="url"
          value={data.url}
          onChange={(e) => setData({ ...data, url: e.target.value })}
        />
        <div className="pt-2 w-full flex justify-center">
          <div className="flex gap-x-6 border py-2 px-4 w-max rounded-md">
            {data.coverImage ? (
              <Image
                src={data.coverImage}
                alt={data.title}
                height={96}
                width={96}
              />
            ) : (
              <Skeleton className="h-24 w-24" />
            )}
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(url) =>
                setData({ ...data, coverImage: url[0].url })
              }
            />
          </div>
        </div>
        <Button disabled={disabled} className="w-full mt-4">
          Edit Track
        </Button>
      </form>
    </div>
  );
}
