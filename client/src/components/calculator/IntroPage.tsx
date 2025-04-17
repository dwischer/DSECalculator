import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface IntroPageProps {
  onGetStarted: () => void;
}

export default function IntroPage({ onGetStarted }: IntroPageProps) {
  return (
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Cap table calculator</h1>
        <p className="text-gray-600 mb-8">
          We will start considering your current financial compensation to help you decide which funding options are worthwhile.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={onGetStarted}
            className="bg-black text-white hover:bg-black/90 px-5 py-2 rounded flex items-center"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            className="border border-black hover:bg-gray-100"
          >
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
}
