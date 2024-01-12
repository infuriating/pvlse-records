import React from "react";

export default function Border({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <div
      style={{
        height: size,
      }}
      className={`w-[2px] bg-muted ${className}`}
    />
  );
}
