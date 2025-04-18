"use client";
import { Waitlist } from "@clerk/nextjs";

export default function WaitlistForm() {
  return (
    <div className="mt-8 flex w-full max-w-md flex-col items-center">
      <Waitlist
        appearance={{
          elements: {
            card: "shadow-none border-none bg-transparent p-0",
            formButtonPrimary:
              "bg-purple-700 text-white rounded-md px-4 py-2 font-bold hover:bg-purple-800 transition mt-4",
            // Hides the "Sign In" button
            footerAction__waitlist: "!hidden",
          },
        }}
        afterJoinWaitlistUrl="/thank-you"
      />
    </div>
  );
}
