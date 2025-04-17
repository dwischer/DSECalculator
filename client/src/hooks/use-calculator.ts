import { useState } from 'react';
import { 
  DEFAULT_CALCULATOR_STATE, 
  PersonalInfo, 
  OwnershipInfo, 
  FinancingInfo,
  CalculatorState
} from '@/lib/constants';
import { calculateResults } from '@/lib/calculations';

export function useCalculator() {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>(DEFAULT_CALCULATOR_STATE);
  
  const updatePersonalInfo = (field: keyof PersonalInfo, value: number) => {
    setCalculatorState(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };
  
  const updateOwnershipInfo = (field: keyof OwnershipInfo, value: number) => {
    setCalculatorState(prev => ({
      ...prev,
      ownershipInfo: {
        ...prev.ownershipInfo,
        [field]: value
      }
    }));
  };
  
  const updateFinancingInfo = (field: keyof FinancingInfo, value: number) => {
    setCalculatorState(prev => ({
      ...prev,
      financing: {
        ...prev.financing,
        [field]: value
      }
    }));
  };
  
  const performCalculations = () => {
    const results = calculateResults(
      calculatorState.personalInfo,
      calculatorState.ownershipInfo,
      calculatorState.financing
    );
    
    setCalculatorState(prev => ({
      ...prev,
      calculationResults: results
    }));
  };
  
  return {
    calculatorState,
    updatePersonalInfo,
    updateOwnershipInfo,
    updateFinancingInfo,
    calculateResults: performCalculations
  };
}
