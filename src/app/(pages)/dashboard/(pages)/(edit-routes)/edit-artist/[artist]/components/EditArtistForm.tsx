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

export default function EditArtistForm(params: {
  artist: string;
  preloadedTasks: Preloaded<typeof api.artists.getAll>;
}) {
  const router = useRouter();

  const artist = usePreloadedQuery(params.preloadedTasks);
  const artistMutation = useMutation(api.artists.editArtist);

  const filteredArtist = artist.filter(
    (artist) => artist.name === params.artist
  )[0];

  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState({
    name: filteredArtist.name,
    description: filteredArtist.description,
    socials: filteredArtist.socials,
    spotifyURL: filteredArtist.spotifyURL,
    image: filteredArtist.image,
  });

  if (!artist) return <></>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    toast.info(`Editing artist ${filteredArtist.name}...`);

    if (data.socials[1] === undefined) data.socials[1] = "";
    if (data.socials[2] === undefined) data.socials[2] = "";

    await artistMutation({
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
      <p className="text-2xl font-semibold">Edit an Artist</p>
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
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <Label htmlFor="description">Description</Label>
        <Input
          required
          className="mt-1 mb-3"
          type="text"
          name="description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <Label htmlFor="social1">
          Socials <span className="text-muted-foreground text-xs">(url)</span>
        </Label>
        <div className="flex flex-col lg:flex-row gap-x-6">
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
          onChange={(e) => setData({ ...data, spotifyURL: e.target.value })}
        />
        <div className="pt-2 w-full flex justify-center">
          <div className="flex gap-x-6 border py-2 px-4 w-max rounded-md">
            {data.image ? (
              <Image src={data.image} alt={data.name} height={96} width={96} />
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
    </div>
  );
}
