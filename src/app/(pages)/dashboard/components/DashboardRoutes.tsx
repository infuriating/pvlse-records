import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { addRoutes, editRoutes, deleteRoutes } from "../dashboard-routes";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";

export default function DashboardRoutes() {
  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section>
          <p className="mb-2 font-semibold text-lg md:hidden">Add Items</p>
          {addRoutes.map((route) => (
            <Link key={route.name} href={route.path}>
              <div className="mb-6 flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm transition-all hover:bg-muted">
                <PlusIcon className="h-12 w-12 text-gray-500 mb-4 dark:text-gray-400" />
                <h4 className="text-lg font-medium mb-2">{route.name}</h4>
                <p className="text-gray-500 text-center dark:text-gray-400">
                  {route.description}
                </p>
              </div>
            </Link>
          ))}
        </section>
        <section>
          <p className="mb-2 font-semibold text-lg md:hidden">Edit Items</p>
          {editRoutes.map((route) => (
            <Link key={route.name} href={route.path}>
              <div className="mb-6 flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm transition-all hover:bg-muted">
                <PencilIcon className="h-12 w-12 text-gray-500 mb-4 dark:text-gray-400" />
                <h4 className="text-lg font-medium mb-2">{route.name}</h4>
                <p className="text-gray-500 text-center dark:text-gray-400">
                  {route.description}
                </p>
              </div>
            </Link>
          ))}
        </section>
        <section>
          <p className="mb-2 font-semibold text-lg md:hidden">Delete Items</p>
          {deleteRoutes.map((route) => (
            <Link key={route.name} href={route.path}>
              <div className="mb-6 flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm transition-all hover:bg-muted">
                <TrashIcon className="h-12 w-12 text-gray-500 mb-4 dark:text-gray-400" />
                <h4 className="text-lg font-medium mb-2">{route.name}</h4>
                <p className="text-gray-500 text-center dark:text-gray-400">
                  {route.description}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
