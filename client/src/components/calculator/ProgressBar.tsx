interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = Math.min(100, ((currentStep) / totalSteps) * 100);

  return (
    <div className="mb-8 hidden sm:block">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
        <div 
          className="bg-black h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Personal Info</span>
        <span>Ownership & Valuation</span>
        <span>Financing Options</span>
        <span>Results</span>
      </div>
    </div>
  );
}
