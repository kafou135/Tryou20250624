"use client";

import { useEffect, useState } from "react";
import { Time } from "lightweight-charts";

type Price = { time: Time; value: number };

function calculateRSI(prices: number[], period = 14): number[] {
  if (prices.length < period + 1) return [];

  const rsiValues: number[] = [];

  for (let i = period; i < prices.length; i++) {
    let gains = 0;
    let losses = 0;

    for (let j = i - period + 1; j <= i; j++) {
      const diff = prices[j] - prices[j - 1];
      if (diff >= 0) gains += diff;
      else losses -= diff;
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;

    const rs = avgGain / (avgLoss || 1); // prevent division by zero
    const rsi = 100 - 100 / (1 + rs);
    rsiValues.push(rsi);
  }

  return rsiValues;
}

export default function BTC_RSI_Chart() {
  const [priceHistory, setPriceHistory] = useState<Price[]>([]);
  const [rsiValue, setRsiValue] = useState<number | null>(null);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:443/ws/btcusdt@trade");

    let lastUpdate = 0;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const price = parseFloat(data.p);
      const now = Date.now();

      if (!price || isNaN(price)) return;

      // Only update every 30 seconds
      if (now - lastUpdate < 30000) return;

      lastUpdate = now;
      const time: Time = new Date().toISOString();
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
    const closes = priceHistory.map((p) => p.value);
    const rsi = calculateRSI(closes);

    if (rsi.length > 0) {
      const latestRsi = rsi[rsi.length - 1];
      console.log("📈 RSI:", latestRsi.toFixed(2));
      setRsiValue(latestRsi);
    }
  }, [priceHistory]);

  return (
    <div>
      <h2 style={{ color: rsiValue ? (rsiValue > 70 ? "red" : rsiValue < 30 ? "lime" : "gray") : "gray" }}>
        RSI: {rsiValue ? rsiValue.toFixed(2) : "Loading..."}
      </h2>
    </div>
  );
}
