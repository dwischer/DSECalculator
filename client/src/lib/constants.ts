// Type definitions
export interface PersonalInfo {
  baseSalary: number;
  annualBonus: number;
  annualRaise: number;
}

export interface OwnershipInfo {
  stake: number;
  valuation: number;
  valuationGrowth: number;
  dilutionRate: number;
}

export interface FinancingInfo {
  esopCount: number;
  strikePrice: number;
  seedfunding: number;
  seedEquity: number;
  vcMoney: number;
  vcEquity: number;
  vdlAmount: number;
  interestRate: number;
  repaymentPeriod: number;
}

export interface ChartDataPoint {
  year: number;
  value: number;
}

export interface OwnershipDataPoint {
  year: number;
  withoutVC: number;
  withVC: number;
}

export interface DebtDataPoint {
  year: number;
  payment: number;
}

export interface CompensationDataPoint {
  year: number;
  cash: number;
  equity: number;
}

export interface Summaries {
  totalCashComp: number;
  finalEquityValue: number;
  dilutionImpact: number;
}

export interface CalculationResults {
  valuationData: ChartDataPoint[];
  ownershipData: OwnershipDataPoint[];
  debtData: DebtDataPoint[];
  compensationData: CompensationDataPoint[];
  summaries: Summaries;
}

export interface CalculatorState {
  personalInfo: PersonalInfo;
  ownershipInfo: OwnershipInfo;
  financing: FinancingInfo;
  calculationResults: CalculationResults;
}

// Default/initial values
export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  baseSalary: 80000,
  annualBonus: 10000,
  annualRaise: 5
};

export const DEFAULT_OWNERSHIP_INFO: OwnershipInfo = {
  stake: 25,
  valuation: 500000,
  valuationGrowth: 20,
  dilutionRate: 10
};

export const DEFAULT_FINANCING_INFO: FinancingInfo = {
  esopCount: 1000,
  strikePrice: 10,
  seedfunding: 300000,
  seedEquity: 15,
  vcMoney: 2000000,
  vcEquity: 30,
  vdlAmount: 500000,
  interestRate: 8,
  repaymentPeriod: 5
};

export const DEFAULT_CALCULATION_RESULTS: CalculationResults = {
  valuationData: [],
  ownershipData: [],
  debtData: [],
  compensationData: [],
  summaries: {
    totalCashComp: 0,
    finalEquityValue: 0,
    dilutionImpact: 0
  }
};

export const DEFAULT_CALCULATOR_STATE: CalculatorState = {
  personalInfo: DEFAULT_PERSONAL_INFO,
  ownershipInfo: DEFAULT_OWNERSHIP_INFO,
  financing: DEFAULT_FINANCING_INFO,
  calculationResults: DEFAULT_CALCULATION_RESULTS
};
