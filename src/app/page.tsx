"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { CurrencyInput } from "@/components/CurrencyInput";
import { ConversionCard } from "@/components/ConversionCard";

const API_URL =
  "https://v6.exchangerate-api.com/v6/e11fba97866c40226eed1cc9/latest/USD";

const CURRENCY_NAMES = {
  COP: "Pésos Colombianos",
  MXN: "Pésos Mexicanos",
  EUR: "Euro",
  JPY: "Yen Japonés",
  BRL: "Real Brasileño",
};

function App() {
  const [amount, setAmount] = useState<string>("1"); // Valor inicial en 1
  const [currency, setCurrency] = useState<keyof typeof CURRENCY_NAMES>("COP");
  const [result, setResult] = useState<number | null>(null);
  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates.");
        }
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
      } catch (error) {
        setError("Could not load exchange rates. Please try again later.");
      }
    };
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (exchangeRates && currency) {
      const numAmount = parseFloat(amount);
      const rateToUSD = 1 / exchangeRates[currency];
      if (!isNaN(numAmount) && rateToUSD) {
        setResult(numAmount * rateToUSD);
      } else {
        setResult(null);
      }
    }
  }, [amount, currency, exchangeRates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 bg-[length:400%_400%] animate-[gradient_15s_ease_infinite] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />

      <div className="text-center mb-12 relative mt-6">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent blur-3xl -z-10" />
        {/* <div className="flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-105">
          <div className="glass-morphism p-5 rounded-2xl shadow-lg group animate-gentle-glow">
            <Wallet className="w-12 h-12 text-blue-600 transition-transform duration-300 group-hover:rotate-12" />
          </div>
        </div> */}
        <h1 className="text-6xl font-bold text-white mb-4 tracking-tight transition-all duration-300 hover:tracking-wide">
          Convertidor de divisas
        </h1>
        <p className="text-blue-100 text-xl font-medium">
          Convierte tus divisas a dolar estadounidense fácilmente
        </p>
      </div>

      {error ? (
        <p className="text-red-500 font-semibold">{error}</p>
      ) : (
        <div className="w-full max-w-xl space-y-8 relative">
          <div className="glass-morphism rounded-3xl p-8 shadow-xl">
            <CurrencyInput
              amount={amount}
              currency={currency}
              onAmountChange={setAmount}
              onCurrencyChange={(value) =>
                setCurrency(value as keyof typeof CURRENCY_NAMES)
              }
              currencies={CURRENCY_NAMES}
            />
          </div>

          <div className="flex justify-center">
            <ConversionCard
              fromAmount={amount}
              fromCurrency={currency}
              toAmount={result}
              currencyNames={CURRENCY_NAMES}
            />
          </div>

          <div className="text-center">
            <div className="status-pill">
              <RefreshCw className="w-4 h-4 animate-pulse-soft" />
              <span>
                Las tasas de intercambio son actualizadas periodicamente
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
