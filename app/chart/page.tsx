import ChartComponent from "./components/page2";
import BTC_MACD_Chart from "./components/BTC_MACD_Chart";
import BTCIndic from "./components/indicators";
import SignalPanel from "./components/SignalPanel";
import SignalPanel1 from "./components/SignalPanel copy";
import MACDScalpingSignal from "./components/MACD_SCALPING_SIGNAL";
import MACDScalpingSignal1 from "./components/MACD_SCALPING_SIGNAL copy";
export default function Home() {
  return (
    <div>
      <SignalPanel1/>
      <SignalPanel/>
      <BTC_MACD_Chart/>
    </div>
  );
}
