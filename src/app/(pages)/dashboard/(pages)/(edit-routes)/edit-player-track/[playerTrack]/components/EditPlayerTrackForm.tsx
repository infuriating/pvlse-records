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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EditPlayerTrackForm(params: {
  playerTrack: string;
  preloadedTasks: Preloaded<typeof api.playerTracks.getPlayerTrack>;
}) {
  const router = useRouter();

  const playerTrack = usePreloadedQuery(params.preloadedTasks);
  const playerTrackMutation = useMutation(api.playerTracks.editPlayerTrack);

  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState({
    title: playerTrack?.title || "",
    artists: playerTrack?.artists || ["", "", ""],
    coverImage: playerTrack?.coverImage || "",
    filePath: playerTrack?.filePath || "",
    genre: playerTrack?.genre || "",
  });

  if (!playerTrack) return <></>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.info(`Editing player track ${playerTrack.title}...`);

    if (data.artists[1] === undefined) data.artists[1] = "";
    if (data.artists[2] === undefined) data.artists[2] = "";
    if (!data.filePath) return toast.error("No audio file uploaded yet!");

    setDisabled(true);

    await playerTrackMutation({
      playerTrackTitle: params.playerTrack,
      title: data.title,
      artists: data.artists,
      coverImage: data.coverImage,
      filePath: data.filePath,
      genre: data.genre,
    });

    toast.success(`Edited player track ${data.title}!`);
    router.push("/dashboard");
  };

  return (
    <div className="py-12 px-8 lg:flex flex-col items-center">
      <Card>
        <CardHeader>
          <CardTitle>Edit Player Track</CardTitle>
          <CardDescription>
            Edit an existing player track in the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="max-w-screen lg:min-w-[920px] "
            onSubmit={handleSubmit}
          >
            <Label htmlFor="title">Title</Label>
            <Input
              required
              className="mt-1 mb-3"
              type="text"
              name="title"
              value={data.title}
              placeholder="Title"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <Label htmlFor="genre">Genre</Label>
            <Input
              required
              className="mt-1 mb-3 resize-none"
              name="genre"
              value={data.genre}
              placeholder="Genre"
              onChange={(e) => setData({ ...data, genre: e.target.value })}
            />
            <Label htmlFor="artist1">Artists</Label>
            <div className="flex flex-col lg:flex-row gap-x-6">
              <Input
                required
                className="mt-1"
                type="text"
                name="artist1"
                value={data.artists[0]}
                placeholder="dashie"
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
                name="artist2"
                value={data.artists[1]}
                placeholder="ISXRO"
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
                name="artist3"
                value={data.artists[2]}
                placeholder="inf"
                onChange={(e) =>
                  setData({
                    ...data,
                    artists: [data.artists[0], data.artists[1], e.target.value],
                  })
                }
              />
            </div>
            <div className="pt-2 w-full">
              <div className="flex gap-x-6 border py-4 px-4 w-full font-semibold justify-center items-center rounded-md">
                {data.filePath ? (
                  <p>{data.filePath}</p>
                ) : (
                  <p>No audio file uploaded yet</p>
                )}
                <UploadButton
                  endpoint="audioUploader"
                  onClientUploadComplete={(url) =>
                    setData({ ...data, filePath: url[0].url })
                  }
                />
              </div>
            </div>
            <div className="pt-2 w-full">
              <div className="flex gap-x-6 border py-2 px-4 w-full justify-center rounded-md">
                {data.coverImage ? (
                  <Image
                    className="rounded-md border object-cover h-24 w-24"
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
              Add Player Track
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
