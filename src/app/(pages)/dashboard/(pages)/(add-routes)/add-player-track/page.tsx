"use client";

import React, { useState } from "react";
import { useMutation } from "convex/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "../../../../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
  const [disabled, setDisabled] = useState(false);
  const artistMutation = useMutation(api.playerTracks.addPlayerTrack);

  const router = useRouter();
  const [data, setData] = useState({
    title: "",
    genre: "",
    artists: [""],
    filePath: "",
    coverImage: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.info(`Adding track ${data.title}...`);

    if (data.artists[1] === undefined) data.artists[1] = "";
    if (data.artists[2] === undefined) data.artists[2] = "";
    if (!data.filePath) return toast.error("No audio file uploaded yet!");

    setDisabled(true);

    artistMutation({
      title: data.title,
      genre: data.genre,
      artists: data.artists,
      filePath: data.filePath,
      coverImage: data.coverImage,
    });

    router.push("/dashboard");
    toast.success(`Track ${data.title} has been added to the database!`);
  };

  return (
    <div className="py-12 px-8 lg:flex flex-col items-center">
      <Card>
        <CardHeader>
          <CardTitle>Add Player Track</CardTitle>
          <CardDescription>
            Add a new player track to the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="max-w-screen lg:min-w-[920px] "
            onSubmit={handleSubmit}
          >
            <Label htmlFor="title">
              <span className="text-red-400">* </span>
              Title
            </Label>
            <Input
              required
              className="mt-1 mb-3"
              type="text"
              name="title"
              value={data.title}
              placeholder="Title"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <Label htmlFor="genre">
              <span className="text-red-400">* </span>
              Genre
            </Label>
            <Input
              required
              className="mt-1 mb-3 resize-none"
              name="genre"
              value={data.genre}
              placeholder="Genre"
              onChange={(e) => setData({ ...data, genre: e.target.value })}
            />
            <Label htmlFor="artist1">Artists</Label>
            <div className="relative flex flex-col lg:flex-row gap-x-6">
              <span className="absolute text-red-400">* </span>

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
              <div className="relative flex gap-x-6 border py-4 px-4 w-full font-semibold justify-center items-center rounded-md">
                <span className="absolute left-0 -top-2 text-red-400">* </span>

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
