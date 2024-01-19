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
import { title } from "process";

export default function Dashboard() {
  const [disabled, setDisabled] = useState(false);
  const trackMutation = useMutation(api.tracks.addTrack);

  const router = useRouter();
  const [data, setData] = useState({
    artists: [""],
    title: "",
    coverImage: "",
    url: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    toast.info(`Adding track ${title}...`);
    console.log(data);

    if (data.artists[1] === undefined) data.artists[1] = "";
    if (data.artists[2] === undefined) data.artists[2] = "";

    trackMutation({
      artists: data.artists,
      title: data.title,
      coverImage: data.coverImage,
      url: data.url,
    });

    router.push("/dashboard");
    toast.success(`Track ${title} has been added to the database!`);
  };

  return (
    <div className="py-12 px-8 lg:flex flex-col items-center">
      <p className="text-2xl font-semibold">Add a track</p>
      <form
        className="max-w-screen pt-6 lg:min-w-[920px] "
        onSubmit={handleSubmit}
      >
        <Label htmlFor="title">Title</Label>
        <Input
          required
          className="mt-1 mb-3"
          type="text"
          name="title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <Label htmlFor="artist1">Artists</Label>
        <div className="flex flex-col lg:flex-row gap-x-6">
          <Input
            required
            className="mt-1"
            type="text"
            name="artistl"
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
            name="artist2"
            value={data.artists[1]}
            onChange={(e) =>
              setData({
                ...data,
                artists: [data.artists[0], e.target.value, data.artists[2]],
              })
            }
          />
          <Input
            className="mt-1"
            type="text"
            name="artist3"
            value={data.artists[2]}
            onChange={(e) =>
              setData({
                ...data,
                artists: [data.artists[0], data.artists[1], e.target.value],
              })
            }
          />
        </div>
        <Label htmlFor="spotifyURL">Spotify URL</Label>
        <Input
          className="mt-1 mb-3"
          type="text"
          name="spotifyURL"
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
          Add Track
        </Button>
      </form>
    </div>
  );
}
