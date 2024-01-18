import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function page() {
  return (
    <div className="fixed min-h-screen w-screen flex justify-center items-center">
      <div className="border rounded-md px-6 py-4 min-w-96">
        <p className="text-2xl font-bold">Contact</p>
        <div className="pt-4">
          <Label>Name</Label>
          <Input className="pt-2" placeholder="Name" />
        </div>
        <div className="pt-4">
          <Label>Email</Label>
          <Input className="pt-2" placeholder="Email" />
        </div>
        <div className="pt-4">
          <Label>Inquiry</Label>
          <Textarea className="pt-2 resize-none" placeholder="Name" />
        </div>
        <Button className="mt-4 w-full">Submit</Button>
      </div>
    </div>
  );
}
