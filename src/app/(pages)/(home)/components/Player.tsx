import React from "react";

export default function Player() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2 items-center text-xs font-medium">
        <p>1:25</p>
        <div className="absolute ml-8 bg-primary z-10 h-2 w-32 rounded-lg" />
        <div className="relative bg-muted h-2 w-64 rounded-lg" />
        <p>3:12</p>
      </div>
      <div className="flex gap-x-6 justify-center items-center">
        <div className="h-8 rounded-full bg-primary aspect-square" />
        <div className="h-8 rounded-full bg-primary aspect-square" />
        <div className="h-8 rounded-full bg-primary aspect-square absolute ml-24" />
        <div className="h-10 rounded-full bg-primary aspect-square flex gap-x-2 justify-center items-center">
          <div className="h-6 w-[4px] bg-secondary rounded-full" />
          <div className="h-6 w-[4px] bg-secondary rounded-full" />
        </div>
        <div className="h-8 rounded-full bg-primary aspect-square" />
        <div className="h-8 rounded-full bg-primary aspect-square absolute mr-24" />

        <div className="h-8 rounded-full bg-primary aspect-square" />
      </div>
    </div>
  );
}
