import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { FinancingInfo } from "@/lib/constants";
import { ChangeEvent } from "react";

interface FinancingPageProps {
  financingInfo: FinancingInfo;
  updateFinancingInfo: (field: keyof FinancingInfo, value: number) => void;
  onCalculate: () => void;
}

export default function FinancingPage({ 
  financingInfo, 
  updateFinancingInfo, 
  onCalculate 
}: FinancingPageProps) {
  const handleInputChange = (field: keyof FinancingInfo) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
    updateFinancingInfo(field, value);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="md:pr-8">
          <h2 className="text-3xl font-bold mb-4">Financing decisions</h2>
          <p className="text-gray-600 mb-8">
            We will continue to take into account what affects your compensation and ownership value.
          </p>
          <Button 
            variant="outline" 
            className="border border-black hover:bg-gray-100"
          >
            Learn more
          </Button>
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Employee Stock Options (ESOPs)</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="options-count">How many options are you considering to offer (per year)?</Label>
              <Input 
                id="options-count" 
                type="number" 
                placeholder="integer" 
                className="bg-[#FFEB3B]"
                value={financingInfo.esopCount || ''}
                onChange={handleInputChange('esopCount')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="strike-price">What is the strike price?</Label>
              <Input 
                id="strike-price" 
                type="number" 
                placeholder="in EUR" 
                className="bg-[#FFEB3B]"
                value={financingInfo.strikePrice || ''}
                onChange={handleInputChange('strikePrice')}
              />
            </div>
          </div>
          
          <h3 className="font-semibold mb-4">Crowd & Seedfunding and Series A, B, and C+</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="seedfunding">Expected seedfunding (Business Angels, Crowdfunding)</Label>
              <Input 
                id="seedfunding" 
                type="number" 
                placeholder="in EUR" 
                className="bg-[#FFEB3B]"
                value={financingInfo.seedfunding || ''}
                onChange={handleInputChange('seedfunding')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seed-equity">&nbsp;</Label>
              <Input 
                id="seed-equity" 
                type="number" 
                placeholder="% percent of equity" 
                className="bg-[#FFEB3B]"
                value={financingInfo.seedEquity || ''}
                onChange={handleInputChange('seedEquity')}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="vc-money">Expected VC money</Label>
              <Input 
                id="vc-money" 
                type="number" 
                placeholder="in EUR" 
                className="bg-[#FFEB3B]"
                value={financingInfo.vcMoney || ''}
                onChange={handleInputChange('vcMoney')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vc-equity">&nbsp;</Label>
              <Input 
                id="vc-equity" 
                type="number" 
                placeholder="% percent of equity" 
                className="bg-[#FFEB3B]"
                value={financingInfo.vcEquity || ''}
                onChange={handleInputChange('vcEquity')}
              />
            </div>
          </div>
          
          <h3 className="font-semibold mb-4">Venture Debt Lending (VDL), w/o warrant</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="vdl-amount">Amount</Label>
              <Input 
                id="vdl-amount" 
                type="number" 
                placeholder="in EUR" 
                className="bg-[#FFEB3B]"
                value={financingInfo.vdlAmount || ''}
                onChange={handleInputChange('vdlAmount')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interest-rate">Interest rate</Label>
              <Input 
                id="interest-rate" 
                type="number" 
                placeholder="in percent" 
                className="bg-[#FFEB3B]"
                value={financingInfo.interestRate || ''}
                onChange={handleInputChange('interestRate')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repayment-period">Repayment period</Label>
              <Input 
                id="repayment-period" 
                type="number" 
                placeholder="integer (years)" 
                className="bg-[#FFEB3B]"
                value={financingInfo.repaymentPeriod || ''}
                onChange={handleInputChange('repaymentPeriod')}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-6">* This should be aligned with the dilution rate (page 2)</p>
          
          <div className="flex justify-end">
            <Button 
              onClick={onCalculate}
              className="bg-black text-white hover:bg-black/90 px-5 py-2 rounded flex items-center"
            >
              Calculate
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
