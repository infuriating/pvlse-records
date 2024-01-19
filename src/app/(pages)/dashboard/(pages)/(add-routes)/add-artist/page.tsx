"use client";

import React from "react";
import { useMutation } from "convex/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "../../../../../../../convex/_generated/api";
import { toast } from "sonner";

export default function Dashboard() {
  const artistMutation = useMutation(api.artists.addArtist);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let social2, social3, spotifyURL, image;

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const social1 = formData.get("social1") as string;
    const socials = [social1];

    social2 = formData.get("social2") as string;
    social3 = formData.get("social3") as string;

    social2 ? socials.push(social2) : null;
    social3 ? socials.push(social3) : null;

    spotifyURL ? formData.get("spotifyURL") : null;
    image ? formData.get("image") : null;

    toast.info(`Adding artist ${name}...`);

    artistMutation({
      name: name,
      description: description,
      socials: socials,
      spotifyURL: spotifyURL,
    });

    toast.success(`Artist ${name} has been added to the database!`);
  };

  return (
    <div className="py-12 px-8 lg:flex flex-col items-center">
      <p className="text-2xl font-semibold">Add an Artist</p>
      <form
        className="max-w-screen pt-6 lg:min-w-[920px] "
        onSubmit={handleSubmit}
      >
        <Label htmlFor="name">Name</Label>
        <Input required className="mt-1 mb-3" type="text" name="name" />
        <Label htmlFor="description">Description</Label>
        <Input required className="mt-1 mb-3" type="text" name="description" />
        <Label htmlFor="social1">
          Socials <span className="text-muted-foreground text-xs">(url)</span>
        </Label>
        <div className="flex flex-col lg:flex-row gap-x-6">
          <Input required className="mt-1" type="text" name="social1" />
          <Input className="mt-1" type="text" name="social2" />
          <Input className="mt-1 mb-3" type="text" name="social3" />
        </div>
        <Label htmlFor="spotifyURL">Spotify URL</Label>
        <Input className="mt-1 mb-3" type="text" name="spotifyURL" />
        <Button className="w-full mt-4">Add Artist</Button>
      </form>
    </div>
  );
}
