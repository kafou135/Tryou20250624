"use client";

import React, { useEffect, useState, useMemo } from "react";

type Candle = {
  close: number;
};

// Same EMA, MACD, getNextMove functions as before
function calculateEMA(prices: number[], period: number): (number | undefined)[] {
  const k = 2 / (period + 1);
  const emaArray: (number | undefined)[] = [];
  let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;

  emaArray[period - 1] = ema;

  for (let i = period; i < prices.length; i++) {
    ema = prices[i] * k + (ema ?? 0) * (1 - k);
    emaArray[i] = ema;
  }

  return emaArray;
}

function calculateMACD(prices: number[]) {
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);

  const macdLine: (number | undefined)[] = [];

  for (let i = 0; i < prices.length; i++) {
    if (ema12[i] !== undefined && ema26[i] !== undefined) {
      macdLine[i] = (ema12[i] as number) - (ema26[i] as number);
    } else {
      macdLine[i] = undefined;
    }
  }

  const macdFiltered = macdLine.filter((v): v is number => v !== undefined);

  const signalLineCalc = calculateEMA(macdFiltered, 9);

  const signalLine: (number | undefined)[] = new Array(macdLine.length).fill(undefined);
  let signalIndex = 0;
  for (let i = 0; i < macdLine.length; i++) {
    if (macdLine[i] !== undefined) {
      signalLine[i] = signalLineCalc[signalIndex++];
    }
  }

  const histogram = macdLine.map((value, i) => {
    if (value !== undefined && signalLine[i] !== undefined) {
      return value - (signalLine[i] as number);
    }
    return undefined;
  });

  return { macdLine, signalLine, histogram };
}

function getNextMove(
  macdLine: (number | undefined)[],
  signalLine: (number | undefined)[]
): "BUY" | "SELL" | "HOLD" {
  const len = macdLine.length;

  if (len < 2) return "HOLD";

  const prevMacd = macdLine[len - 2];
  const prevSignal = signalLine[len - 2];
  const currentMacd = macdLine[len - 1];
  const currentSignal = signalLine[len - 1];

  if (
    prevMacd === undefined ||
    prevSignal === undefined ||
    currentMacd === undefined ||
    currentSignal === undefined
  ) {
    return "HOLD";
  }

  if (prevMacd < prevSignal && currentMacd > currentSignal) {
    return "BUY";
  }

  if (prevMacd > prevSignal && currentMacd < currentSignal) {
    return "SELL";
  }

  return "HOLD";
}

export default function LiveMACDChart() {
  const [closingPrices, setClosingPrices] = useState<number[]>([]);

  // Fetch BTCUSDT 1m candles from Binance
  async function fetchCandles() {
    try {
      const response = await fetch(
        "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15s&limit=100"
      );
      const data = await response.json();

      // Extract closing prices from API response
      const closes = data.map((candle: any) => parseFloat(candle[4]));

      setClosingPrices(closes);
    } catch (error) {
      console.error("Error fetching candles:", error);
    }
  }

  // Initial fetch and interval
  useEffect(() => {
    fetchCandles();

    const interval = setInterval(() => {
      fetchCandles();
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  const { macdLine, signalLine, histogram } = useMemo(
    () => calculateMACD(closingPrices),
    [closingPrices]
  );

  const nextMove = useMemo(() => getNextMove(macdLine, signalLine), [macdLine, signalLine]);

  const lastIndex = closingPrices.length - 1;

  return (
    <div style={{ fontFamily: "monospace", padding: 20, color:"white" }}>
      <h2>BTC/USDT MACD Indicator (1-minute candles, refreshed every 15s)</h2>
      <p>
        Next move signal: <strong>{nextMove}</strong>
      </p>
      <table
        border={1}
        cellPadding={6}
        style={{ borderCollapse: "collapse", width: "100%", maxWidth: 600 }}
      >
        <thead>
          <tr>
            <th>Index</th>
            <th>Close Price</th>
            <th>MACD</th>
            <th>Signal</th>
            <th>Histogram</th>
          </tr>
        </thead>
        <tbody>
          {closingPrices.map((price, i) => (
            <tr key={i} style={{ background: i === lastIndex ? "#e0ffe0" : "transparent" }}>
              <td>{i + 1}</td>
              <td>{price.toFixed(2)}</td>
              <td>{macdLine[i]?.toFixed(4) ?? "-"}</td>
              <td>{signalLine[i]?.toFixed(4) ?? "-"}</td>
              <td style={{ color: histogram[i] && histogram[i]! > 0 ? "green" : "red" }}>
                {histogram[i]?.toFixed(4) ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
