"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, IChartApi } from "lightweight-charts";

const BTCChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const lineSeriesRef = useRef<any>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [signal, setSignal] = useState<"BUY" | "SELL" | "HOLD">("HOLD");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      width: 600,
      height: 300,
    });

    lineSeriesRef.current = chartRef.current.addLineSeries();

    let lastPushTime = 0;
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const current = parseFloat(data.p);
      setPrice(current);

      const now = Date.now();
      if (now - lastPushTime >= 15000) {
        lastPushTime = now;
        setPriceHistory((prev) => {
          const newHistory = [...prev, current];
          if (newHistory.length > 100) newHistory.shift();
          return newHistory;
        });
      }

      if (lineSeriesRef.current) {
        const time = Math.floor(Date.now() / 1000);
        lineSeriesRef.current.update({ time, value: current });
      }
    };

    return () => {
      ws.close();
      chartRef.current?.remove();
    };
  }, []);

  function calculateSMA(data: number[], period: number): number[] {
    let sma: number[] = [];
    for (let i = 0; i <= data.length - period; i++) {
      const slice = data.slice(i, i + period);
      const avg = slice.reduce((a, b) => a + b, 0) / period;
      sma.push(avg);
    }
    return sma;
  }

  function checkSignal(fast: number[], slow: number[]): "BUY" | "SELL" | "HOLD" {
    if (fast.length < 2 || slow.length < 2) return "HOLD";

    const lastFast = fast[fast.length - 1];
    const prevFast = fast[fast.length - 2];
    const lastSlow = slow[slow.length - 1];
    const prevSlow = slow[slow.length - 2];

    if (prevFast < prevSlow && lastFast > lastSlow) return "BUY";
    if (prevFast > prevSlow && lastFast < lastSlow) return "SELL";
    return "HOLD";
  }

  useEffect(() => {
    if (priceHistory.length < 20) return;
    const fastSMA = calculateSMA(priceHistory, 5);
    const slowSMA = calculateSMA(priceHistory, 20);
    const currentSignal = checkSignal(fastSMA, slowSMA);
    setSignal(currentSignal);
  }, [priceHistory]);

  return (
    <div className="p-6">
      <div className="text-2xl font-bold my-4">
        15 s
        Signal:{" "}
        <span
          style={{
            color:
              signal === "BUY" ? "green" : signal === "SELL" ? "red" : "gray",
          }}
        >
          {signal}
        </span>
      </div>

      <h1 className="text-2xl mb-4 font-bold">BTC/USDT Live Price</h1>
      <div className="text-xl mb-2">
        {price ? `$${price.toFixed(2)}` : "Loading..."}
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default BTCChart;
