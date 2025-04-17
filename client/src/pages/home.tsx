import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Cap table calculator</h1>
          <p className="text-gray-600 mb-8">
            We will start considering your current financial compensation to help you decide which funding options are worthwhile.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/calculator">
              <Button className="bg-black text-white px-5 py-2 rounded flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button className="border border-black bg-white text-black hover:bg-gray-100 px-5 py-2 rounded">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
