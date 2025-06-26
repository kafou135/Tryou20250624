import ChartComponent from "./components/page2";
import BTC_MACD_Chart from "./components/BTC_MACD_Chart";
import BTCIndic from "./components/indicators";
import SignalPanel from "./components/SignalPanel";
import SignalPanel1 from "./components/SignalPanel copy";
import BTC_RSI_Chart from "./components/RSI_indicatot";
import MACDScalpingSignal from "./components/MACD_SCALPING_SIGNAL";
import MACDScalpingSignal1 from "./components/MACD_SCALPING_SIGNAL copy";
export default function Home() {
  return (
    <div>
      <MACDScalpingSignal/>
      <MACDScalpingSignal1/>
      <SignalPanel/>
      <SignalPanel1/>
      <BTC_MACD_Chart/>
      <BTC_RSI_Chart/>
      <BTCIndic/>
      <ChartComponent/>
    </div>
  );
}
