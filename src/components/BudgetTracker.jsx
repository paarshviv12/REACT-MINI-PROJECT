import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Wallet, 
  TrendingUp, 
  PieChart,
  AlertCircle
} from "lucide-react";
import { useTrip } from "../context/TripContext";
import { cn } from "../lib/utils";
import { GlassCard } from "./ui/GlassCard";
import { SectionHeader } from "./ui/SectionHeader";
import { AnimatedContainer, AnimatedItem } from "./ui/AnimatedContainer";
import { SpendingChart } from "./budget/SpendingChart";
import { formatCurrency, convertFromUSD } from "../lib/currencyUtils";

export default function BudgetTracker() {
  const { destination, budget, expenses, totalExpense, currency, itinerary } = useTrip();
  const [chartMode, setChartMode] = useState("velocity");

  const breakdown = useMemo(() => {
    if (expenses.length === 0) return [];
    
    // Group by description
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.description] = (acc[curr.description] || 0) + curr.amount;
      return acc;
    }, {});

    return Object.keys(grouped).map(key => ({
      name: key, // For recharts Tooltip
      category: key,
      amount: grouped[key],
      percentage: Math.round((grouped[key] / totalExpense) * 100)
    })).sort((a, b) => b.amount - a.amount);
  }, [expenses, totalExpense]);

  const velocityData = useMemo(() => {
    const daysCount = itinerary?.length || 5;
    if (totalExpense === 0) return Array.from({length: daysCount}, (_, i) => ({ day: `Day ${i+1}`, amount: 0 }));
    
    const avg = totalExpense / daysCount;
    const multipliers = [0.8, 1.2, 0.9, 1.5, 0.6, 1.1, 0.7, 1.3, 1.0, 1.4];
    
    return Array.from({length: daysCount}, (_, i) => {
      const multiplier = multipliers[i % multipliers.length];
      return { day: `Day ${i+1}`, amount: avg * multiplier };
    });
  }, [totalExpense, itinerary]);

  const optimizationScore = budget > 0 ? Math.max(0, 100 - Math.round((totalExpense / budget) * 100)) : 0;
  const isHighBudget = convertFromUSD(budget, currency) > (currency === "INR" ? 300000 : 3500);

  return (
    <AnimatedContainer className="max-w-6xl mx-auto space-y-12 pb-20 w-full px-4">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <SectionHeader 
          title="Financial Intelligence" 
          subtitle={`Automated expense projection for your ${destination.name || 'upcoming'} expedition.`} 
          align="left" 
          accent={true} 
        />
        <GlassCard className="px-8 py-6 text-right w-full md:w-auto" gradient>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Total Estimated Budget</p>
          <p className="text-4xl font-black text-teal-600">
            {formatCurrency(convertFromUSD(budget, currency), currency)}
          </p>
        </GlassCard>
      </header>

      {isHighBudget && (
        <AnimatedItem className="p-6 rounded-3xl bg-amber-50 border border-amber-200 flex items-center gap-4">
          <TrendingUp className="h-6 w-6 text-amber-500" />
          <div>
            <p className="text-sm font-bold text-gray-900">Premium Spend Detected</p>
            <p className="text-xs text-gray-600">This strategy includes high-end logistics and luxury accommodations.</p>
          </div>
        </AnimatedItem>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AnimatedItem className="lg:col-span-2">
          <GlassCard className="p-10" gradient>
            <div className="relative flex justify-between items-start mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {chartMode === "velocity" ? "Spending Velocity" : "Budget Allocation"}
                </h3>
                <p className="text-gray-500 text-sm">Real-time projection based on curated itinerary.</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setChartMode("velocity")}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                    chartMode === "velocity" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-400 border border-gray-200"
                  )}
                >
                  Velocity
                </button>
                <button 
                  onClick={() => setChartMode("allocation")}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                    chartMode === "allocation" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-400 border border-gray-200"
                  )}
                >
                  Allocation
                </button>
              </div>
            </div>
            <SpendingChart 
              velocityData={velocityData}
              breakdown={breakdown} 
              mode={chartMode} 
            />
          </GlassCard>
        </AnimatedItem>

        <AnimatedItem>
          <GlassCard className="p-8 h-full space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center border border-violet-200">
                <PieChart className="h-5 w-5 text-violet-600" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">Intelligence Insights</h4>
            </div>
            
            <div className="space-y-6">
              {optimizationScore < 20 ? (
                <div className="p-5 rounded-2xl bg-red-50 border border-red-100 relative group">
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 h-8 w-1 bg-red-500 rounded-full" />
                  <p className="text-sm text-red-800 leading-relaxed font-medium">Critical: Budget is nearly exhausted. Consider reducing non-essential activities.</p>
                </div>
              ) : optimizationScore < 50 ? (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100 relative group">
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 h-8 w-1 bg-amber-500 rounded-full" />
                  <p className="text-sm text-amber-800 leading-relaxed font-medium">Warning: Spending velocity is high. Monitor upcoming logistics carefully.</p>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 relative group">
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 h-8 w-1 bg-emerald-500 rounded-full" />
                  <p className="text-sm text-emerald-800 leading-relaxed font-medium">Optimal: Expenses are well within the projected bounds.</p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Remaining Budget Score</span>
                <span className="text-xs font-black text-teal-600">{optimizationScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.max(0, optimizationScore))}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`h-full ${optimizationScore < 20 ? 'bg-red-500' : optimizationScore < 50 ? 'bg-amber-500' : 'bg-teal-500'}`}
                />
              </div>
            </div>
          </GlassCard>
        </AnimatedItem>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {breakdown.length > 0 ? breakdown.map((item, idx) => (
          <AnimatedItem key={idx}>
            <GlassCard className="p-8 group" whileHover={{ y: -5 }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">{item.category}</p>
              <p className="text-2xl font-black text-gray-900">{item.percentage}%</p>
              <p className="text-[10px] font-bold text-teal-600 mt-2 uppercase tracking-widest">
                {formatCurrency(convertFromUSD(item.amount, currency), currency)}
              </p>
            </GlassCard>
          </AnimatedItem>
        )) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No expenses recorded yet.</p>
          </div>
        )}
      </div>
    </AnimatedContainer>
  );
}
