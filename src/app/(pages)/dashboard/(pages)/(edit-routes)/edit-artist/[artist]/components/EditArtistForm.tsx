"use client";

import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "../../../../../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function EditArtistForm(params: {
  artist: string;
  preloadedTasks: Preloaded<typeof api.artists.getAll>;
}) {
  const [disabled, setDisabled] = useState(false);

  const artist = usePreloadedQuery(params.preloadedTasks);
  const artistMutation = useMutation(api.artists.editArtist);
  if (!artist) return <></>;

  const filteredArtist = artist.filter(
    (artist) => artist.name === params.artist
  )[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const social1 = formData.get("social1") as string;
    const social2 = formData.get("social2") as string;
    const social3 = formData.get("social3") as string;
    const socials = [social1, social2, social3];

    const spotifyURL = formData.get("spotifyURL") as string;
    const image = formData.get("image") as string;

    await artistMutation({
      name: name,
      description: description,
      socials: socials,
      spotifyURL: spotifyURL,
      image: image,
    });
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
          value={filteredArtist.name}
        />
        <Label htmlFor="description">Description</Label>
        <Input
          required
          className="mt-1 mb-3"
          type="text"
          name="description"
          value={filteredArtist.description}
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
            value={filteredArtist.socials[0]}
          />
          <Input
            className="mt-1"
            type="text"
            name="social2"
            value={filteredArtist.socials[1]}
          />
          <Input
            className="mt-1 mb-3"
            type="text"
            name="social3"
            value={filteredArtist.socials[2]}
          />
        </div>
        <Label htmlFor="spotifyURL">Spotify URL</Label>
        <Input
          className="mt-1 mb-3"
          type="text"
          name="spotifyURL"
          value={filteredArtist.spotifyURL}
        />
        <Button disabled={disabled} className="w-full mt-4">
          Edit Artist
        </Button>
      </form>
    </div>
  );
}
