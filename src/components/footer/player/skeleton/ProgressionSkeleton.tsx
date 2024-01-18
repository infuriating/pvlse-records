import React from "react";

export default function ProgressionSkeleton() {
  return (
    <div className="flex gap-x-2 items-center text-xs font-medium">
      <p>0:00</p>
      <div className="w-64">
        <div className="relative w-full bg-muted h-2 rounded-lg transition-all cursor-pointer">
          <div
            style={{ width: `50%` }}
            className="absolute bg-primary z-10 h-2 rounded-lg transition-all"
          />
        </div>
      </div>
      <p>0:00</p>
    </div>
  );
}
