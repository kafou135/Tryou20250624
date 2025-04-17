import { AllFixtures, AllLiveStates } from '@/types'
import StandingsAndFixtures from './components/home2/StandingsAndFixtures'
import getFixturesForFiveLeagues from './util/getFixturesForFiveLeagues';
import RefreshButton from '@/my comopnents/RefreshButton';
import Stopwatch from '@/my comopnents/stopwatch';
import getFixtures from './util/getFixtures';
import getFixtures2 from './util/getFixtures2';
import getFixtures3 from './util/getFixtures3';
import getFixtures4 from './util/getFixtures4';
import getFixtures5 from './util/getFixtures5';
import getFixtures6 from './util/getFixtures6';
import getFixtures7 from './util/getFixtures7';
import getFixtures8 from './util/getFixtures8';
import getFixtures9 from './util/getFixtures9';
import getFixtures10 from './util/getFixtures10';
import getFixtures11 from './util/getFixtures11';

export const revalidate = 1;

export default async function Home() {

  const filteredFixtures: AllFixtures[] = await getFixtures();
  const filteredFixtures1: AllFixtures[] = await getFixtures2();
  const filteredFixtures2: AllFixtures[] = await getFixtures3();
  const filteredFixtures3: AllFixtures[] = await getFixtures4();
  const filteredFixtures4: AllFixtures[] = await getFixtures5();
  const filteredFixtures5: AllFixtures[] = await getFixtures6();
  const filteredFixtures6: AllFixtures[] = await getFixtures7();
  const filteredFixtures7: AllFixtures[] = await getFixtures8();
  const filteredFixtures8: AllFixtures[] = await getFixtures9();
  const filteredFixtures9: AllFixtures[] = await getFixtures10();
  const filteredFixtures10: AllFixtures[] = await getFixtures11();

  if (!filteredFixtures?.length) {
    return null;
  }

  return (
    <div>
      <RefreshButton/>
      <StandingsAndFixtures filteredFixtures={filteredFixtures} filteredFixtures1={filteredFixtures1} filteredFixtures2={filteredFixtures2} filteredFixtures3={filteredFixtures3} filteredFixtures4={filteredFixtures4} filteredFixtures5={filteredFixtures5} filteredFixtures6={filteredFixtures6} filteredFixtures7={filteredFixtures7} filteredFixtures8={filteredFixtures8} filteredFixtures9={filteredFixtures9} filteredFixtures10={filteredFixtures10}/>
    </div>
  )
}