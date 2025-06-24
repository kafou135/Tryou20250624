import ChartComponent from "./components/page2";
import BTC_MACD_Chart from "./components/BTC_MACD_Chart";
import SignalPanel from "./components/SignalPanel";
import BTCIndic from "./components/indicators";
import BTC_RSI_Chart from "./components/RSI_indicatot";
export default function Home() {
  return (
    <div>
      <SignalPanel/>
      <BTC_MACD_Chart/>
      <BTC_RSI_Chart/>
      <BTCIndic/>
      <ChartComponent/>
    </div>
  );
}
