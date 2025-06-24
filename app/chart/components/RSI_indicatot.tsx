"use client";

import { useEffect, useState } from "react";
import { type Time } from "lightweight-charts";

type Price = { time: Time; value: number };

function calculateRSI(closes: number[], period = 14): number | null {
  if (closes.length < period + 1) return null;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) {
      gains += diff;
    } else {
      losses -= diff;
    }
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = period + 1; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) {
      avgGain = (avgGain * (period - 1) + diff) / period;
      avgLoss = (avgLoss * (period - 1)) / period;
    } else {
      avgGain = (avgGain * (period - 1)) / period;
      avgLoss = (avgLoss * (period - 1) - diff) / period;
    }
  }

  if (avgLoss === 0) return 100;

  const rs = avgGain / avgLoss;
  return Math.round((100 - 100 / (1 + rs)) * 100) / 100;
}

export default function BTC_RSI_Chart() {
  const [priceHistory, setPriceHistory] = useState<Price[]>([]);
  const [rsi, setRSI] = useState<number | null>(null);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:443/ws/btcusdt@trade");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const price = parseFloat(data.p);
      const time: Time = new Date().toISOString();

      if (!price || isNaN(price)) return;

      const newPrice: Price = { time, value: price };

      setPriceHistory((prev) => {
        const updated = [...prev, newPrice];
        if (updated.length > 100) updated.shift();
        return updated;
      });
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    if (priceHistory.length < 15) return;
    const closes = priceHistory.map((p) => p.value);
    const calculatedRSI = calculateRSI(closes);
    if (calculatedRSI !== null) {
      setRSI(calculatedRSI);
      console.log("📈 RSI:", calculatedRSI);

      if (calculatedRSI > 70) {
        console.log("⚠️ RSI says: OVERBOUGHT! Possible drop.");
      } else if (calculatedRSI < 30) {
        console.log("⚠️ RSI says: OVERSOLD! Possible bounce.");
      }
    }
  }, [priceHistory]);

  return (
    <div>
      <h2 style={{ color: rsi !== null && rsi > 70 ? "red" : rsi !== null && rsi < 30 ? "lime" : "gray" }}>
        RSI: {rsi !== null ? rsi : "Loading..."}
      </h2>
    </div>
  );
}
