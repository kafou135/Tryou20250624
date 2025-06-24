"use client";
import { useRef } from "react";

// At the top inside your BTCChart component

import { useEffect, useState } from "react";
import { type Time } from "lightweight-charts";


type Price = { time: Time; value: number };
function calculateEMA(prices: number[], period: number): number[] {
  const k = 2 / (period + 1);
  const ema: number[] = [];

  prices.forEach((price, i) => {
    if (i === 0) {
      ema.push(price);
    } else {
      ema.push(price * k + ema[i - 1] * (1 - k));
    }
  });

  return ema;
}

function calculateBollingerBands(prices: number[], period: number = 20) {
  if (prices.length < period) return null;

  const recent = prices.slice(-period);
  const mean = recent.reduce((sum, p) => sum + p, 0) / period;
  const variance = recent.reduce((sum, p) => sum + (p - mean) ** 2, 0) / period;
  const stdDev = Math.sqrt(variance);

  const upper = mean + 2 * stdDev;
  const lower = mean - 2 * stdDev;
  const width = upper - lower;

  return { upper, lower, width };
}
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
  const rsi = 100 - 100 / (1 + rs);

  return Math.round(rsi * 100) / 100; // round to 2 decimals
}

export default function BTCChart() {
  const [priceHistory, setPriceHistory] = useState<Price[]>([]);
  const [macdSignal, setMacdSignal] = useState<string>("HOLD");
  const lastBBWidth = useRef<number | null>(null); // ✅ Moved inside component
  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:443/ws/btcusdt@trade");

    let lastUpdate = Date.now();

    ws.onmessage = (event) => {
      const now = Date.now();
      if (now - lastUpdate < 30000) return; // update every 15s
      lastUpdate = now;

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
    if (priceHistory.length < 35) return;

    const closes = priceHistory.map((p) => p.value);
    const ema12 = calculateEMA(closes.slice(-26), 12);
    const ema26 = calculateEMA(closes.slice(-26), 26);

    const macd = ema12
      .slice(-ema26.length)
      .map((v, i) => v - ema26[i]);

    const signalLine = calculateEMA(macd, 9);
    const lastMacd = macd.at(-1);
    const lastSignal = signalLine.at(-1);
const rsi = calculateRSI(closes);
if (rsi !== null) {
  console.log("📈 RSI:", rsi);

  if (rsi > 70) {
    console.log("⚠️ RSI says: OVERBOUGHT! Possible drop.");
  } else if (rsi < 30) {
    console.log("⚠️ RSI says: OVERSOLD! Possible bounce.");
  }
}

    if (
      typeof lastMacd !== "number" ||
      typeof lastSignal !== "number" ||
      isNaN(lastMacd) ||
      isNaN(lastSignal)
    ) return;

    let newSignal = "HOLD";
    const threshold = 0.1;

    if (lastMacd - lastSignal > threshold) {
      newSignal = "BUY";
    } else if (lastSignal - lastMacd > threshold) {
      newSignal = "SELL";
    }

    setMacdSignal((prev) => {
      if (prev !== newSignal) {
        console.log("📈 MACD Signal:", newSignal);
        return newSignal;
      }
      return prev;
    });

   const bb = calculateBollingerBands(closes);
const bbThreshold = 50;


    if (bb) {
      if (lastBBWidth.current !== null) {
        const diff = Math.abs(bb.width - lastBBWidth.current);
        if (diff > 20) {
          console.log("⚠️ BB width change:", diff.toFixed(2), "New width:", bb.width.toFixed(2));
        }
      }
      lastBBWidth.current = bb.width;
    }

  }, [priceHistory]);

  return (
    <div>
      <h2 style={{ color: macdSignal === "BUY" ? "lime" : macdSignal === "SELL" ? "red" : "gray" }}>
        Signal: {macdSignal}
      </h2>
     {/* <ul style={{ maxHeight: 200, overflowY: "auto" }}>
        {priceHistory.map((p, i) => (
          <li key={i}>
            Time: {p.time.toString()} — Price: {p.value.toFixed(2)}
          </li>
        ))}
      </ul>*/}
    </div>
  );
}
