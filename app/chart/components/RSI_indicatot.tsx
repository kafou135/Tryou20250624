"use client";

import { useEffect, useRef, useState } from "react";
import { WebsocketClient } from "bybit-api"; // Bybit WebSocket SDK

type Message = { time: string; text: string };

function getTime() {
  return new Date().toLocaleTimeString([], { hour12: false });
}

export default function LivePriceBybitAndChat() {
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [chat, setChat] = useState<Message[]>([]);
  const priceHistory = useRef<number[]>([]);

  // Initialize MACD logic functions
  const calculateEMA = (data: number[], period: number): number[] => {
    const k = 2 / (period + 1);
    return data.reduce<number[]>((ema, price, i) => {
      ema.push(i === 0 ? price : price * k + ema[i - 1] * (1 - k));
      return ema;
    }, []);
  };

  const calculateMACD = (prices: number[]) => {
    const fast = calculateEMA(prices, 6);
    const slow = calculateEMA(prices, 13);
    const macd = fast.map((v, i) => v - (slow[i] ?? v));
    const signal = calculateEMA(macd, 5);
    const hist = macd.map((v, i) => v - (signal[i] ?? 0));
    return { macd, signal, hist };
  };

  const addChat = (text: string) => {
    setChat((c) => [...c.slice(-19), { time: getTime(), text }]);
  };

  // Set up Bybit WebSocket
  useEffect(() => {
    const ws = new WebsocketClient({
      streaming: {
        public: {
          topics: ["trade.BTCUSDT"],
        },
      },
    });

    ws.on("connected", () => addChat("✅ Connected to Bybit WebSocket"));
    ws.on("trade.BTCUSDT", (trade: any) => {
      const price = parseFloat(trade.price);
      setLivePrice(price);

      priceHistory.current.push(price);
      if (priceHistory.current.length > 150) priceHistory.current.shift();

      if (priceHistory.current.length > 35) {
        const { macd, signal, hist } = calculateMACD(priceHistory.current);
        const len = macd.length;
        const prevMacd = macd[len - 2];
        const prevSig = signal[len - 2];
        const nowMacd = macd[len - 1];
        const nowSig = signal[len - 1];
        const nowHist = hist[len - 1];

        let msg = "";
        if (prevMacd < prevSig && nowMacd > nowSig && nowHist > 0) {
          msg = "🟢 MACD crossover UP — BUY signal!";
        } else if (prevMacd > prevSig && nowMacd < nowSig && nowHist < 0) {
          msg = "🔴 MACD crossover DOWN — SELL signal!";
        } else if (Math.abs(nowHist) < 2) {
          msg = "⚠️ Low momentum — big move may be forming.";
        } else {
          msg = "🤖 Neutral — waiting for signal.";
        }
        addChat(msg);
      }
    });

    ws.on("error", (e) => addChat("❌ WebSocket error: " + e));
    ws.on("reconnecting", () => addChat("🔄 Reconnecting WebSocket..."));
    ws.on("disconnected", () => addChat("⚠️ Disconnected from Bybit WebSocket"));

    return () => ws.close();
  }, []);

  return (
    <div style={{ background: "#111", color: "#0f0", padding: 20, fontFamily: "monospace" }}>
      <h3>📈 Bybit BTC/USDT Live & Assistant</h3>
      <div>Live Price: {livePrice !== null ? livePrice.toFixed(2) : "Loading..."}</div>
      <div style={{ maxHeight: 300, overflowY: "auto", marginTop: 10, border: "1px solid #333", padding: 10 }}>
        {chat.map((msg, i) =>
          <p key={i}><strong>{msg.time}</strong> — {msg.text}</p>
        )}
      </div>
    </div>
  );
}
