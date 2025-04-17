import { 
  PersonalInfo, 
  OwnershipInfo, 
  FinancingInfo,
  ChartDataPoint,
  OwnershipDataPoint,
  DebtDataPoint,
  CompensationDataPoint,
  Summaries,
  CalculationResults
} from './constants';

export function calculateResults(
  personalInfo: PersonalInfo,
  ownershipInfo: OwnershipInfo,
  financingInfo: FinancingInfo
): CalculationResults {
  const years = [0, 1, 2, 3, 4, 5];
  
  // 1. Calculate company valuation growth
  const valuationData: ChartDataPoint[] = years.map(year => ({
    year,
    value: ownershipInfo.valuation * Math.pow(1 + ownershipInfo.valuationGrowth / 100, year)
  }));
  
  // 2. Calculate ownership stake with and without VC
  const ownershipData: OwnershipDataPoint[] = years.map(year => {
    // Standard dilution without VC
    const withoutVC = ownershipInfo.stake * Math.pow(1 - ownershipInfo.dilutionRate / 100, year);
    
    // More aggressive dilution with VC funding
    const vcDilution = ownershipInfo.dilutionRate * 1.2;
    const withVC = ownershipInfo.stake * Math.pow(1 - vcDilution / 100, year);
    
    return {
      year,
      withoutVC,
      withVC
    };
  });
  
  // 3. Calculate debt repayments
  const debtData: DebtDataPoint[] = years.map(year => ({
    year,
    payment: year === 0 ? 0 : financingInfo.vdlAmount / financingInfo.repaymentPeriod
  }));
  
  // 4. Calculate cash vs equity compensation
  const compensationData: CompensationDataPoint[] = years.map(year => {
    // Base salary grows with annual raise
    const salary = personalInfo.baseSalary * Math.pow(1 + personalInfo.annualRaise / 100, year);
    const cashComp = salary + personalInfo.annualBonus;
    
    // Calculate the value of equity based on company valuation and ownership stake
    const companyValue = valuationData[year].value;
    const ownershipPercentage = ownershipData[year].withoutVC / 100;
    const equityValue = companyValue * ownershipPercentage;
    
    return {
      year,
      cash: cashComp,
      equity: equityValue
    };
  });
  
  // 5. Calculate summary metrics
  const totalCashComp = compensationData.reduce((sum, data) => sum + data.cash, 0);
  const finalEquityValue = compensationData[compensationData.length - 1].equity;
  const dilutionImpact = ((ownershipData[0].withoutVC - ownershipData[ownershipData.length - 1].withoutVC) / ownershipData[0].withoutVC) * 100;
  
  const summaries: Summaries = {
    totalCashComp,
    finalEquityValue,
    dilutionImpact
  };
  
  return {
    valuationData,
    ownershipData,
    debtData,
    compensationData,
    summaries
  };
}
