import Link from "next/link";
import { Button, PageContainer } from "@/components";

export default function Home() {
  return (
    <PageContainer maxWidth="md" padding="lg" className="flex items-center justify-center">
      <div className="w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {process.env.NEXT_PUBLIC_APP_NAME || 'Relay'}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            AI-powered communication assistant
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/login">
            <Button size="lg" className="w-full">
              Log In
            </Button>
          </Link>
          
          <Link href="/login?mode=signup">
            <Button variant="outline" size="lg" className="w-full">
              Sign Up
            </Button>
          </Link>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">
            New to Relay? Start with a guest account to explore.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}