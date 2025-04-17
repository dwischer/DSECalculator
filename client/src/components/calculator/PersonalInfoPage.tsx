import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { PersonalInfo } from "@/lib/constants";
import { ChangeEvent } from "react";

interface PersonalInfoPageProps {
  personalInfo: PersonalInfo;
  updatePersonalInfo: (field: keyof PersonalInfo, value: number) => void;
  onNext: () => void;
}

export default function PersonalInfoPage({ 
  personalInfo, 
  updatePersonalInfo, 
  onNext 
}: PersonalInfoPageProps) {
  const handleInputChange = (field: keyof PersonalInfo) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
    updatePersonalInfo(field, value);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="md:pr-8">
          <h2 className="text-3xl font-bold mb-4">Cap table calculator</h2>
          <p className="text-gray-600 mb-8">
            We will start considering your current financial compensation to help you decide which funding options are worthwhile.
          </p>
          <Button 
            variant="outline" 
            className="border border-black hover:bg-gray-100"
          >
            Learn more
          </Button>
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Name" 
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Email address" 
                className="bg-white"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="base-salary">What is your current annual base salary?</Label>
              <Input 
                id="base-salary" 
                type="number" 
                placeholder="in EUR" 
                className="bg-[#FFEB3B]" 
                value={personalInfo.baseSalary || ''}
                onChange={handleInputChange('baseSalary')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="annual-bonus">What is your annual bonus?</Label>
              <Input 
                id="annual-bonus" 
                type="number" 
                placeholder="in EUR" 
                className="bg-[#FFEB3B]" 
                value={personalInfo.annualBonus || ''}
                onChange={handleInputChange('annualBonus')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="annual-raise">What is your annual raise assumption?</Label>
              <Input 
                id="annual-raise" 
                type="number" 
                placeholder="in percent" 
                className="bg-[#FFEB3B]" 
                value={personalInfo.annualRaise || ''}
                onChange={handleInputChange('annualRaise')}
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={onNext}
              className="bg-black text-white hover:bg-black/90 px-5 py-2 rounded flex items-center"
            >
              Next page
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
