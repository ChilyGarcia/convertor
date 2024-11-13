import React from "react";
import { ArrowRight, Coins } from "lucide-react";

interface ConversionCardProps {
  fromAmount: string;
  fromCurrency: string;
  toAmount: number | null;
  currencyNames: Record<string, string>;
}

export function ConversionCard({
  fromAmount,
  fromCurrency,
  toAmount,
  currencyNames,
}: ConversionCardProps) {
  return (
    <div className="glass-morphism rounded-3xl shadow-xl p-8 w-full transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
      <div className="flex items-center justify-between gap-6">
        {/* From Currency */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-3 rounded-xl shadow-inner">
              <Coins className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-blue-600/80 uppercase tracking-wider">
              De
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 tracking-tight">
            {fromAmount || "0"}{" "}
            <span className="text-blue-600">{fromCurrency}</span>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {currencyNames[fromCurrency]}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center relative px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent blur-sm" />
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full shadow-lg relative group transition-all duration-300 hover:scale-110">
            <ArrowRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* To Currency (USD) */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-3 rounded-xl shadow-inner">
              <Coins className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="text-sm font-medium text-indigo-600/80 uppercase tracking-wider">
              a Dólar
            </div>
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
            ${toAmount !== null ? toAmount.toFixed(2) : "0.00"}
          </div>
          <div className="text-sm font-medium bg-gradient-to-r from-gray-500 to-gray-600 bg-clip-text text-transparent">
            Dólar estadounidense
          </div>
        </div>
      </div>
    </div>
  );
}
