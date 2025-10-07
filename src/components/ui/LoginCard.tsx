'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { startGuestSession } from "@/lib/session";

export default function LoginCard() {
  const router = useRouter();

  const handleGuestMode = () => {
    startGuestSession();
    router.push('/inbox');
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-24 space-y-6 shadow-2xl relative before:absolute before:inset-0 before:border before:border-white/30 before:pointer-events-none" style={{ borderRadius: '2.5rem' }}>
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-primary mb-2">
          {process.env.NEXT_PUBLIC_APP_NAME || 'Relay'}
        </h1>
        <p className="text-lg text-primary mb-8">
          Write faster with AI
        </p>
      </div>
      
      <div className="space-y-2">
        <Link href="/auth" className="block">
          <Button size="lg" className="w-full">
            Log In
          </Button>
        </Link>
        
        <Link href="/auth?mode=signup" className="block">
          <Button variant="outline" size="lg" className="w-full">
            Sign Up
          </Button>
        </Link>
      </div>

      <Button 
        variant="ghost" 
        size="lg" 
        className="w-full" 
        onClick={handleGuestMode}
      >
        Continue as Guest
      </Button>
      
    </div>
  );
}