"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col gap-3 items-center justify-center">
      <h1 className="text-5xl font-bold text-red-700">
        Welcome to Realtime Collaborative Code Editor!
      </h1>
      <p className="text-2xl text-yellow-500">by Praveen Goswami</p>
      <div className="flex items-center gap-5">
        <Button asChild>
          <Link href={"/login"}>Login</Link>
        </Button>
        <Button asChild>
          <Link href={"/register"}>Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
