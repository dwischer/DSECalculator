import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { OwnershipInfo } from "@/lib/constants";
import { ChangeEvent } from "react";

interface OwnershipPageProps {
  ownershipInfo: OwnershipInfo;
  updateOwnershipInfo: (field: keyof OwnershipInfo, value: number) => void;
  onNext: () => void;
}

export default function OwnershipPage({ 
  ownershipInfo, 
  updateOwnershipInfo, 
  onNext 
}: OwnershipPageProps) {
  const handleInputChange = (field: keyof OwnershipInfo) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
    updateOwnershipInfo(field, value);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="md:pr-8">
          <h2 className="text-3xl font-bold mb-4">Ownership and Valuation</h2>
          <p className="text-gray-600 mb-8">
            We will continue to consider your startup's current valuation.
          </p>
          <Button 
            variant="outline" 
            className="border border-black hover:bg-gray-100"
          >
            Learn more
          </Button>
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ownership-stake">What is your ownership stake of your company?</Label>
              <Input 
                id="ownership-stake" 
                type="number" 
                placeholder="in percent" 
                className="bg-[#FFEB3B]"
                value={ownershipInfo.stake || ''}
                onChange={handleInputChange('stake')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company-valuation">What is your current valuation of your company?</Label>
              <Input 
                id="company-valuation" 
                type="number" 
                placeholder="in EUR" 
                className="bg-[#FFEB3B]"
                value={ownershipInfo.valuation || ''}
                onChange={handleInputChange('valuation')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="valuation-growth">What is your estimation of the annual valuation growth rate?</Label>
              <Input 
                id="valuation-growth" 
                type="number" 
                placeholder="in percent" 
                className="bg-[#FFEB3B]"
                value={ownershipInfo.valuationGrowth || ''}
                onChange={handleInputChange('valuationGrowth')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dilution-rate">What is your estimation of the annual dilution rate?</Label>
              <Input 
                id="dilution-rate" 
                type="number" 
                placeholder="in percent" 
                className="bg-[#FFEB3B]"
                value={ownershipInfo.dilutionRate || ''}
                onChange={handleInputChange('dilutionRate')}
              />
              <p className="text-xs text-gray-500 mt-1">
                * The decrease in equity ownership for existing shareholders that occurs when a company issues new shares
              </p>
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
