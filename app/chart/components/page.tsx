"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, IChartApi } from "lightweight-charts";
import axios from "axios";

const BTCChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const lineSeriesRef = useRef<any>(null);
  const [price, setPrice] = useState<number | null>(null);
const [priceHistory, setPriceHistory] = useState<number[]>([]);
const [signal, setSignal] = useState<"BUY" | "SELL" | "HOLD">("HOLD");

  const fetchPrice = async () => {
  try {
    const res = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=BINANCE:BTCUSDT&token=d1ajvq1r01qltin1t8pgd1ajvq1r01qltin1t8q0`
    );
    const current = res.data.c;
    setPrice(current);

    setPriceHistory(prev => {
      const newHistory = [...prev, current];
      // Keep last 100 prices max to limit size
      if (newHistory.length > 100) newHistory.shift();
      return newHistory;
    });
    if (lineSeriesRef.current) {
      const time = Math.floor(Date.now() / 1000);
      lineSeriesRef.current.update({ time, value: current });
    }
  } catch (err) {
    console.error("Error fetching price:", err);
  }
};
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
  console.log('lastfast',lastFast);
  console.log('prevfast',prevFast);
  console.log('lastslow',lastSlow);
  console.log('prevslow',prevSlow);

  if (prevFast < prevSlow && lastFast > lastSlow) {
    return "BUY";
  }
  if (prevFast > prevSlow && lastFast < lastSlow) {
    return "SELL";
  }
  return "HOLD";
}

useEffect(() => {
  if (priceHistory.length < 20) return; // need enough data

  const fastSMA = calculateSMA(priceHistory, 5);
  const slowSMA = calculateSMA(priceHistory, 20);
  console.log('fastsma',fastSMA);
  console.log('slowsma',slowSMA);
  
  
  const currentSignal = checkSignal(fastSMA, slowSMA);
  setSignal(currentSignal);
  
}, [priceHistory]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      width: 600,
      height: 300,
    });

    lineSeriesRef.current = chartRef.current.addLineSeries();

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);

    return () => {
      clearInterval(interval);
      chartRef.current?.remove();
    };
  }, []);
console.log('ssssssss',priceHistory)
  return (
    <div className="p-6">
      <div className="text-2xl font-bold my-4">
  Signal:{" "}
  <span
    style={{
      color: signal === "BUY" ? "green" : signal === "SELL" ? "red" : "gray",
    }}
  >
    {signal}
  </span>
</div>

      <h1 className="text-2xl mb-4 font-bold">BTC/USD Live Price</h1>
      <div className="text-xl mb-2">
        {price ? `$${price.toFixed(2)}` : "Loading..."}
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default BTCChart;
