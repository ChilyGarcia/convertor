import React from "react";
import { DollarSign } from "lucide-react";

interface CurrencyInputProps {
  amount: string;
  currency: string;
  onAmountChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  currencies: Record<string, string>;
}

export function CurrencyInput({
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  currencies,
}: CurrencyInputProps) {
  return (
    <div className="relative flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1 group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-300 group-focus-within:scale-110">
          <DollarSign className="w-5 h-5 text-blue-500 group-focus-within:text-blue-600" />
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-blue-100/50 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 glass-morphism text-lg font-medium placeholder:text-gray-400 shadow-lg hover:shadow-xl"
          placeholder="Enter amount"
        />
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shimmer" />
      </div>
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="px-6 py-4 rounded-2xl border-2 border-blue-100/50 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 glass-morphism text-lg font-medium cursor-pointer hover:shadow-lg active:scale-95 bg-none appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundPosition: "right 1rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
          paddingRight: "3rem",
        }}
      >
        {Object.entries(currencies).map(([code, name]) => (
          <option key={code} value={code}>
            {code} - {name}
          </option>
        ))}
      </select>
    </div>
  );
}
