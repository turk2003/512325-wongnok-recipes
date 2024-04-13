"use client";
import Link from "next/link";
import { useState } from "react";
export default function Search() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        placeholder="Search by menu..."
        className="w-1/3 p-2 border rounded-md mb-4 mr-2 "
        onChange={(e) => setSearch(e.target.value)}
      />
      <Link
        href={`/blogs/${search}`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 "
      >
        search
      </Link>
    </div>
  );
}
