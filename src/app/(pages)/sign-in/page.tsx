"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) return null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // @ts-ignore
    await signIn
      .create({
        identifier: email,
        password,
      })
      .then((result) => {
        if (result.status === "complete") {
          setMessage("Signed in!");
          // @ts-ignore
          setActive({ session: result.createdSessionId });
        } else {
          setMessage("Something went wrong.");
        }
      })
      .catch((err) => console.error("error", err.errors[0].longMessage));

    router.push("/dashboard");
  }

  return (
    <form
      className="flex pt-12 items-center flex-col gap-y-4"
      onSubmit={submit}
    >
      <h1 className="text-2xl font-bold">Dashboard Sign In</h1>
      <div>
        <Label className="font-medium" htmlFor="email">
          Email
        </Label>
        <Input
          className="mt-1"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label className="font-medium" htmlFor="password">
          Password
        </Label>
        <Input
          className="mt-1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Button variant={"outline"}>Sign in</Button>
        {message && <p className="text-center font-bold">{message}</p>}
      </div>
    </form>
  );
}
