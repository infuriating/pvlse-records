"use client";

import React from "react";
import { useMutation } from "convex/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "../../../../../../../convex/_generated/api";
import { toast } from "sonner";

export default function Dashboard() {
  const artistMutation = useMutation(api.dashboard.addArtist);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    return toast.warning(
      "Dashboard is still being worked on, nothing has been sent through"
    );

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const social1 = formData.get("social1") as string;
    const social2 = formData.get("social2") as string;

    artistMutation({
      name: name,
      description: description,
      socials: [social1, social2],
    });
  };

  return (
    <div className="py-12 px-8">
      <p className="text-2xl font-semibold">Add an Artist</p>
      <form className="w-1/2 pt-6" onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input required className="mt-1 mb-3" type="text" name="name" />
        <Label htmlFor="name">Description</Label>
        <Input required className="mt-1 mb-3" type="text" name="description" />
        <Label htmlFor="name">
          Socials <span className="text-muted-foreground text-xs">(url)</span>
        </Label>
        <div className="flex gap-x-6">
          <Input required className="mt-1 mb-3" type="text" name="social1" />
          <Input className="mt-1 mb-3" type="text" name="social2" />
        </div>
        <Button className="w-full mt-4">Add Artist</Button>
      </form>
    </div>
  );
}
