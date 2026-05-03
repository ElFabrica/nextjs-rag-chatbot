"use client";

import {
  useAuth,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

export function Navigation() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="border-b border-(--foreground)/10">
      <div className="flex container h-16 items-center justify-between px-4 mx-auto">
        <div className="text-xl font-semibold">Rag Chatbot</div>
        <div className="flex gap-2">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </>
          ) : (
            <SignOutButton>
              <Button variant="outline">Sign Out</Button>
            </SignOutButton>
          )}
        </div>
      </div>
    </nav>
  );
}
