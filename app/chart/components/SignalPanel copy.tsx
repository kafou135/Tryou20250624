"use client";
import React, { useEffect, useState, useRef } from "react";

export default function BTCChart() {
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [fastSMA, setFastSMA] = useState<number | null>(null);
  const [slowSMA, setSlowSMA] = useState<number | null>(null);
  const [lastFast, setLastFast] = useState<number | null>(null);
  const [prevFast, setPrevFast] = useState<number | null>(null);
  const [lastSlow, setLastSlow] = useState<number | null>(null);
  const [prevSlow, setPrevSlow] = useState<number | null>(null);
  const [signal, setSignal] = useState<string>("");

  const latestPriceRef = useRef<number | null>(null); // hold latest tick price

  useEffect(() => {
    const socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const price = parseFloat(data.p);
      latestPriceRef.current = price;
      setLivePrice(price);
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = latestPriceRef.current;
      if (!current) return;

      setPriceHistory((prev) => {
        const newHistory = [...prev, current];
        if (newHistory.length > 100) newHistory.shift();

        const fastPeriod = 5;
        const slowPeriod = 20;

        if (newHistory.length >= fastPeriod) {
          const recentFast = newHistory.slice(-fastPeriod);
          const fastAvg = recentFast.reduce((a, b) => a + b, 0) / fastPeriod;

          setPrevFast(lastFast);
          setLastFast(fastAvg);
          setFastSMA(fastAvg);
        }

        if (newHistory.length >= slowPeriod) {
          const recentSlow = newHistory.slice(-slowPeriod);
          const slowAvg = recentSlow.reduce((a, b) => a + b, 0) / slowPeriod;

          setPrevSlow(lastSlow);
          setLastSlow(slowAvg);
          setSlowSMA(slowAvg);
        }
        console.log("history",newHistory)

        return newHistory;
      });
    }, 15000); // 🕔 every 5 seconds

    return () => clearInterval(interval);
  }, [lastFast, lastSlow]);
  // Detect signal
  useEffect(() => {
    if (
      prevFast !== null &&
      prevSlow !== null &&
      lastFast !== null &&
      lastSlow !== null
    ) {
      if (prevFast < prevSlow && lastFast > lastSlow) {
        setSignal("BUY");
        console.log("📈 BUY SIGNAL!");
      } else if (prevFast > prevSlow && lastFast < lastSlow) {
        setSignal("SELL");
        console.log("📉 SELL SIGNAL!");
      } else {
        setSignal("");
      }
    }
  }, [prevFast, prevSlow, lastFast, lastSlow]);
  
  return (
    <div >
      <h2 className="text-xl font-bold">BTC/USDT Live 15 Seconds</h2>
      <p className="text-3xl mb-2 text-green-500">
        {livePrice ? `$${livePrice}` : "Loading..."}
      </p>

      {signal && (
        <div className={`text-xl font-bold mt-2 ${signal === "BUY" ? "text-blue-600" : "text-red-600"}`}>
          Signal: {signal}
        </div>
      )}

      
    </div>
  );
}
