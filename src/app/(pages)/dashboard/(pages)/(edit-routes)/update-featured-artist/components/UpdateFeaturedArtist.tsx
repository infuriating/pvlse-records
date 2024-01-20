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

export default function UpdateFeaturedArtist(params: {
  preloadedTasks: Preloaded<typeof api.featuredArtist.getFeaturedArtist>;
}) {
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    toast.info(`Editing featured artist ${artist.name}...`);

    if (data.socials[1] === undefined) data.socials[1] = "";
    if (data.socials[2] === undefined) data.socials[2] = "";

    await featuredArtistMutation({
      name: data.name,
      image: data.image,
      socials: data.socials,
    });

    toast.success(`Edited featured artist!`);
    router.push("/dashboard");
  };

  return (
    <div className="py-12 px-8 lg:flex flex-col items-center">
      <Card>
        <CardHeader>
          <CardTitle>Update Featured Artist</CardTitle>
          <CardDescription>Update the current featured artist</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="max-w-screen lg:min-w-[920px] "
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
            <Label htmlFor="social1">Socials</Label>
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
                placeholder="ISXRO"
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
                placeholder="inf"
                onChange={(e) =>
                  setData({
                    ...data,
                    socials: [data.socials[0], data.socials[1], e.target.value],
                  })
                }
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
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(url) =>
                    setData({ ...data, image: url[0].url })
                  }
                />
              </div>
            </div>
            <Button disabled={disabled} className="w-full mt-4">
              Update Featured Artist
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
