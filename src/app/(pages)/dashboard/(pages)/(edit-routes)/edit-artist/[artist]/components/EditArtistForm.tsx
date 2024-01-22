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

export default function EditArtistForm(params: {
  artist: string;
  preloadedTasks: Preloaded<typeof api.artists.getArtist>;
}) {
  const router = useRouter();

  const artist = usePreloadedQuery(params.preloadedTasks);
  const artistMutation = useMutation(api.artists.editArtist);

  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState({
    name: artist?.name || "",
    description: artist?.description || "",
    socials: artist?.socials || ["", "", ""],
    spotifyURL: artist?.spotifyURL || "",
    image: artist?.image || "",
  });

  if (!artist) return <></>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    toast.info(`Editing artist ${artist.name}...`);

    if (data.socials[1] === undefined) data.socials[1] = "";
    if (data.socials[2] === undefined) data.socials[2] = "";

    await artistMutation({
      artistName: params.artist,
      name: data.name,
      description: data.description,
      socials: data.socials,
      spotifyURL: data.spotifyURL,
      image: data.image,
    });

    toast.success(`Edited artist ${data.name}!`);
    router.push("/dashboard");
  };

  return (
    <div className="py-12 px-8 lg:flex flex-col items-center">
      <Card>
        <CardHeader>
          <CardTitle>Edit Artist</CardTitle>
          <CardDescription>
            Edit an existing artist in the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="max-w-screen lg:min-w-[920px] "
            onSubmit={handleSubmit}
          >
            <Label htmlFor="name">
              <span className="text-red-400">* </span>
              Name
            </Label>
            <Input
              required
              className="mt-1 mb-3"
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <Label htmlFor="description">
              <span className="text-red-400">* </span>
              Description
            </Label>
            <Input
              required
              className="mt-1 mb-3"
              type="text"
              name="description"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
            <Label htmlFor="social1">
              Socials{" "}
              <span className="text-muted-foreground text-xs">(url)</span>
            </Label>
            <div className="relative flex flex-col lg:flex-row gap-x-6">
              <span className="absolute text-red-400">* </span>

              <Input
                required
                className="mt-1"
                type="text"
                name="social1"
                value={data.socials[0]}
                onChange={(e) =>
                  setData({
                    ...data,
                    socials: [e.target.value, data.socials[1], data.socials[2]],
                  })
                }
              />
              <Input
                className="mt-1"
                type="text"
                name="social2"
                value={data.socials[1]}
                placeholder="https://instagram.com/1dshi"
                onChange={(e) =>
                  setData({
                    ...data,
                    socials: [data.socials[0], e.target.value, data.socials[2]],
                  })
                }
              />
              <Input
                className="mt-1 mb-3"
                type="text"
                name="social3"
                value={data.socials[2]}
                placeholder="https://soundcloud.com/dshie"
                onChange={(e) =>
                  setData({
                    ...data,
                    socials: [data.socials[0], data.socials[1], e.target.value],
                  })
                }
              />
            </div>
            <Label htmlFor="spotifyURL">Spotify URL</Label>
            <Input
              className="mt-1 mb-3"
              type="text"
              name="spotifyURL"
              value={data.spotifyURL}
              placeholder="https://open.spotify.com/artist/6uQKiJZQe4rjkMF0HxIGTl"
              onChange={(e) => setData({ ...data, spotifyURL: e.target.value })}
            />
            <div className="pt-2 w-full">
              <div className="flex gap-x-6 border py-2 px-4 justify-center rounded-md">
                {data.image ? (
                  <Image
                    className="rounded-md border object-cover h-24 w-24"
                    src={data.image}
                    alt={data.name}
                    height={96}
                    width={96}
                  />
                ) : (
                  <Skeleton className="h-24 w-24" />
                )}
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(url) =>
                    setData({ ...data, image: url[0].url })
                  }
                />
              </div>
            </div>
            <Button disabled={disabled} className="w-full mt-4">
              Edit Artist
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
