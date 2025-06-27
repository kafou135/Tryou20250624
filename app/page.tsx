import WebSocket from 'ws';

type PriceData = {
  time: number;
  close: number;
};

const prices: number[] = [];
const interval = '1m'; // 1-minute candles

const ws = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@kline_${interval}`);

ws.on('message', (data) => {
  const message = JSON.parse(data.toString());

  if (message.k && message.k.x) {
    const closePrice = parseFloat(message.k.c);
    prices.push(closePrice);

    if (prices.length > 100) {
      prices.shift(); // keep last 100 values
    }

    if (prices.length >= 26) {
      const macdResult = calculateMACD(prices);
      const lastMACD = macdResult.macd.slice(-1)[0];
      const lastSignal = macdResult.signal.slice(-1)[0];

      const trend =
        lastMACD > lastSignal ? '🔼 UP' :
        lastMACD < lastSignal ? '🔽 DOWN' : '➖ NEUTRAL';

      console.log(`MACD: ${lastMACD.toFixed(6)}, Signal: ${lastSignal.toFixed(6)}, Trend: ${trend}`);
    }
  }
});

// --- MACD CALCULATION ---
function calculateEMA(values: number[], period: number): number[] {
  const k = 2 / (period + 1);
  let ema: number[] = [];
  ema[0] = average(values.slice(0, period));

  for (let i = period; i < values.length; i++) {
    ema.push(values[i] * k + ema[ema.length - 1] * (1 - k));
  }

  return ema;
}

function calculateMACD(prices: number[]) {
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);
  const macd: number[] = [];

  const start = ema26.length - ema12.length;

  for (let i = 0; i < ema12.length; i++) {
    macd.push(ema12[i] - ema26[i + start]);
  }

  const signal = calculateEMA(macd, 9);
  const histogram = macd.slice(-signal.length).map((m, i) => m - signal[i]);

  return { macd, signal, histogram };
}

function average(values: number[]): number {
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}
