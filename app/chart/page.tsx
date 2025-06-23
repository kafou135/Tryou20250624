import BTCChart from "./components/page";
import ChartComponent from "./components/page2";
import BTC_MACD_Chart from "./components/BTC_MACD_Chart";
import SignalPanel from "./components/SignalPanel";
import BTCIndic from "./components/indicators";

export default function Home() {
  return (
    <div>
      <SignalPanel/>
      <BTC_MACD_Chart/>
      <BTCIndic/>
      <ChartComponent/>
    </div>
  );
}
