import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Label
} from "recharts";
import { CalculationResults } from "@/lib/constants";

interface ResultsPageProps {
  calculationResults: CalculationResults;
  onStartOver: () => void;
}

export default function ResultsPage({ 
  calculationResults,
  onStartOver
}: ResultsPageProps) {
  const { 
    valuationData, 
    ownershipData, 
    debtData, 
    compensationData,
    summaries
  } = calculationResults;

  const formatCurrency = (value: number) => {
    return '€' + value.toLocaleString();
  };

  const formatPercentage = (value: number) => {
    return value.toFixed(0) + '%';
  };

  const handleDownloadReport = () => {
    alert('Report download functionality would be implemented here in a production environment.');
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-100 mb-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Results & Projections</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Company Valuation Growth Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={valuationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year">
                <Label value="Years" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label value="Valuation (EUR)" angle={-90} position="insideLeft" />
              </YAxis>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Company Valuation"
                stroke="#3399ff" 
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Ownership Stake Over Time (With and Without VC)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ownershipData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year">
                <Label value="Years" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label value="Ownership Stake (%)" angle={-90} position="insideLeft" />
              </YAxis>
              <Tooltip formatter={(value: number) => formatPercentage(value)} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="withoutVC" 
                name="Ownership Stake without VC"
                stroke="#3399ff" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="withVC" 
                name="Ownership Stake with VC"
                stroke="#ff9933" 
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Venture Debt Repayments Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={debtData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year">
                <Label value="Years" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label value="Repayment Amount (EUR)" angle={-90} position="insideLeft" />
              </YAxis>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar 
                dataKey="payment" 
                name="Debt Repayments"
                fill="#ff9933" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Cash Compensation vs. Equity Compensation Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={compensationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year">
                <Label value="Years" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis yAxisId="cash">
                <Label value="Cash (EUR)" angle={-90} position="insideLeft" />
              </YAxis>
              <YAxis yAxisId="equity" orientation="right">
                <Label value="Equity Value (EUR)" angle={-90} position="insideRight" />
              </YAxis>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="cash" 
                name="Cash Compensation"
                stroke="#4caf50" 
                strokeWidth={2}
                yAxisId="cash"
              />
              <Line 
                type="monotone" 
                dataKey="equity" 
                name="Equity Compensation"
                stroke="#3f51b5" 
                strokeWidth={2}
                yAxisId="equity"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Summary: Cash Compensation</h3>
          <p className="text-2xl font-bold">{formatCurrency(summaries.totalCashComp)}</p>
          <p className="text-sm text-gray-600 mt-2">Total over 5 years</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Summary: Equity Value</h3>
          <p className="text-2xl font-bold">{formatCurrency(summaries.finalEquityValue)}</p>
          <p className="text-sm text-gray-600 mt-2">Estimated value after 5 years</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Summary: Dilution Impact</h3>
          <p className="text-2xl font-bold">-{formatPercentage(summaries.dilutionImpact)}</p>
          <p className="text-sm text-gray-600 mt-2">Ownership reduction over 5 years</p>
        </div>
      </div>
      
      <div className="mt-12 flex justify-between">
        <Button 
          onClick={onStartOver}
          variant="outline"
          className="border border-black hover:bg-gray-100"
        >
          Start Over
        </Button>
        <Button 
          onClick={handleDownloadReport}
          className="bg-black text-white hover:bg-black/90" 
        >
          Download Full Report
        </Button>
      </div>
    </div>
  );
}
