import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Loader2 } from 'lucide-react';

interface ChartProps {
    city: string;
    totalResellers: number;
}

interface RoundedBarChartProps {
    data: ChartProps[];
    isLoadingChart: boolean;
}

const ResellerChart: React.FC<RoundedBarChartProps> = ({ data, isLoadingChart }) => {
    const maxValue = Math.max(...data.map(item => item.totalResellers));
    const yAxisWidth = 40 + String(maxValue).length * 10; // base 20px + 10px per digit

    if (isLoadingChart) {
        return (
            <div className="p-4 bg-white shadow-md rounded-md h-[290px]  flex justify-center items-center"
            style={{ borderRadius: "14.91px" }}>
    
            <Loader2 className="mr-2 h-12 w-12 animate-spin" />
    
            <div className="text-2xl text-gray-500">Loading...</div>
          </div>
        ); // Display loading message or spinner while fetching userroles
      }
    return (
        <div className="p-4 bg-white shadow-md rounded-md h-[290px]"
            style={{ borderRadius: "14.91px" }}>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Reseller</h2>
            <div className="overflow-x-auto">
                {/* Set the min-width to ensure the chart content is wide enough to scroll */}
                <div className={`min-w-[${data.length * 50}px]`}>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart
                            data={data}
                            margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="10 10" vertical={false} />
                            <XAxis dataKey="city" />
                            <YAxis
                                allowDecimals={false}
                                tickCount={6}
                                interval={0} // Forces all ticks to show

                                domain={[0, maxValue + 1]}
                                width={yAxisWidth}
                            />

                            <Tooltip />
                            <Bar
                                dataKey="totalResellers"
                                fill="#5293FF"
                                barSize={40}
                                radius={[10, 10, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

    );
};

export default ResellerChart;
