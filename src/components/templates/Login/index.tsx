import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import React from "react";

export default function LoginPage() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div>
          <h1 className="text-3xl text-white">Socket game</h1>
          <Button
            type="approve"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Login
          </Button>
        </div>
      </main>
  );
}
