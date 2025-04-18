'use client'
import { Waitlist } from '@clerk/nextjs';

export default function WaitlistForm() {
  return (
    <div className="flex flex-col items-center w-full max-w-md mt-8">
      <h2 className="text-xl font-bold mb-4 text-purple-900">Entre para a lista de espera</h2>
      <p className="mb-2 text-gray-700 text-center">Cadastre-se para ser avisado quando o Afiado for lançado!</p>
      <Waitlist
        appearance={{
          elements: {
            card: "shadow-none border-none bg-transparent p-0",
            formButtonPrimary: "bg-purple-700 text-white rounded-md px-4 py-2 font-bold hover:bg-purple-800 transition mt-4",
            // Hides the "Sign In" button
            footerAction__waitlist: '!hidden',
          },
        }}
        afterJoinWaitlistUrl="/thank-you"
      />
    </div>
  );
}
