"use client";

import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import React, { useState } from "react";
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
import { api } from "../../../../../../../../convex/_generated/api";
import { Separator } from "@/components/ui/separator";

export default function UpdateFeaturedArtist(params: {
  preloadedTasks: Preloaded<typeof api.featuredArtist.getFeaturedArtist>;
  preloadedArtists: Preloaded<typeof api.artists.getAll>;
}) {
  const router = useRouter();

  const artists = usePreloadedQuery(params.preloadedArtists);
  const featuredArtist = usePreloadedQuery(params.preloadedTasks);
  const featuredArtistMutation = useMutation(
    api.featuredArtist.updateFeaturedArtist
  );

  const artist = featuredArtist[0];

  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState({
    name: artist?.name || "",
    image: artist?.image || "",
    socials: artist?.socials || ["", "", ""],
  });

  if (!artist) return <></>;

  const setFeaturedArtistData = (data: any) => {
    toast.info(`Selected artist ${data.name}`);
    setData(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    toast.info(`Editing featured artist ${artist.name}...`);

    if (data.socials[1] === undefined) data.socials[1] = "";
    if (data.socials[2] === undefined) data.socials[2] = "";

    await featuredArtistMutation({
      featuredArtistName: artist.name,
      name: data.name,
      image: data.image,
      socials: data.socials,
    });

    toast.success(`Edited featured artist!`);
    router.push("/dashboard");
  };

  return (
    <div className="py-8 px-4 lg:flex flex-col items-center">
      <Card className="py-8 px-12">
        <CardTitle>Select an artist</CardTitle>
        <CardDescription>
          Select an artist to set as the featured artist
        </CardDescription>
        <CardContent className="grid grid-auto-fit-md mt-4">
          <div className="flex gap-x-4 gap-y-2 justify-center">
            {artists.map((artist) => (
              <div
                className="flex flex-col gap-y-2 items-center"
                key={artist._id}
              >
                {artist.image ? (
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    height={96}
                    width={96}
                  />
                ) : (
                  <Skeleton className="h-24 w-24" />
                )}
                <Button
                  key={artist.name}
                  className="w-full"
                  onClick={() => setFeaturedArtistData(artist)}
                >
                  {artist.name}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Separator className="w-96 my-4" />
      <Card>
        <CardHeader>
          <CardTitle>Update Featured Artist</CardTitle>
          <CardDescription>Update the current featured artist</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="max-w-screen lg:min-w-[920px]"
            onSubmit={handleSubmit}
          >
            <Label htmlFor="name"> Name</Label>
            <Input
              required
              className="mt-1 mb-3"
              type="text"
              name="name"
              value={data.name}
            />
            <Label htmlFor="social1">Socials</Label>
            <div className="relative flex flex-col lg:flex-row gap-x-6">
              <Input
                required
                className="mt-1"
                type="text"
                name="social1"
                value={data.socials[0]}
              />
              <Input
                className="mt-1"
                type="text"
                name="social2"
                value={data.socials[1]}
                placeholder="ISXRO"
              />
              <Input
                className="mt-1 mb-3"
                type="text"
                name="social3"
                value={data.socials[2]}
                placeholder="inf"
              />
            </div>
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
              </div>
            </div>
            <Button disabled={disabled} className="w-full mt-4">
              Update Featured Artist
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="lg:mb-24" />
    </div>
  );
}
