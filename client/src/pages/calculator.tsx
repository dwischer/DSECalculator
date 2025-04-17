import { useState } from "react";
import ProgressBar from "@/components/calculator/ProgressBar";
import IntroPage from "@/components/calculator/IntroPage";
import PersonalInfoPage from "@/components/calculator/PersonalInfoPage";
import OwnershipPage from "@/components/calculator/OwnershipPage";
import FinancingPage from "@/components/calculator/FinancingPage";
import ResultsPage from "@/components/calculator/ResultsPage";
import { useCalculator } from "@/hooks/use-calculator";

export default function Calculator() {
  const [currentPage, setCurrentPage] = useState(0);
  const { 
    calculatorState, 
    updatePersonalInfo, 
    updateOwnershipInfo, 
    updateFinancingInfo,
    calculateResults
  } = useCalculator();

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, 4));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleCalculate = () => {
    calculateResults();
    goToNextPage();
  };

  const resetCalculator = () => {
    setCurrentPage(0);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {currentPage > 0 && (
          <ProgressBar currentStep={currentPage} totalSteps={4} />
        )}

        <div className="form-pages">
          {currentPage === 0 && (
            <IntroPage onGetStarted={goToNextPage} />
          )}
          
          {currentPage === 1 && (
            <PersonalInfoPage 
              personalInfo={calculatorState.personalInfo}
              updatePersonalInfo={updatePersonalInfo}
              onNext={goToNextPage}
            />
          )}
          
          {currentPage === 2 && (
            <OwnershipPage 
              ownershipInfo={calculatorState.ownershipInfo}
              updateOwnershipInfo={updateOwnershipInfo}
              onNext={goToNextPage}
            />
          )}
          
          {currentPage === 3 && (
            <FinancingPage 
              financingInfo={calculatorState.financing}
              updateFinancingInfo={updateFinancingInfo}
              onCalculate={handleCalculate}
            />
          )}
          
          {currentPage === 4 && (
            <ResultsPage 
              calculationResults={calculatorState.calculationResults}
              onStartOver={resetCalculator}
            />
          )}
        </div>
      </div>
    </div>
  );
}
