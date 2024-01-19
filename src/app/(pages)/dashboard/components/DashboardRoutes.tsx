import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { addRoutes, editRoutes, deleteRoutes } from "../dashboard-routes";

export default function DashboardRoutes() {
  return (
    <div className="flex flex-col py-6 px-8 gap-y-6">
      <div className="flex flex-col w-full">
        <p className="font-semibold">Add Routes</p>
        <div className="flex gap-x-6">
          {addRoutes.map((route) => (
            <Link key={route.name} href={route.path}>
              <Button variant={"outline"}>{route.name}</Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col  w-full">
        <p className="font-semibold">Edit Routes</p>
        <div className="flex gap-x-6">
          {editRoutes.map((route) => (
            <Link key={route.name} href={route.path}>
              <Button variant={"outline"}>{route.name}</Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col  w-full">
        <p className="font-semibold">Delete Routes</p>
        <div className="flex gap-x-6">
          {deleteRoutes.map((route) => (
            <Link key={route.name} href={route.path}>
              <Button variant={"outline"}>{route.name}</Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
