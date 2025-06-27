import { AllFixtures, AllLiveStates } from '@/types'
import StandingsAndFixtures from './components/home2/StandingsAndFixtures'
import RefreshButton from '@/my comopnents/RefreshButton';
import Stopwatch from '@/my comopnents/stopwatch';

import getFixtures_2 from './util/getFixtures copy 2';

import { log } from 'node:console';
import Fixtures from './components/home2/FixturesByLeague';
import Head from 'next/head';
export const revalidate = 1;

export default async function Home() {

  
  const filteredFixtures_2   : AllFixtures[] = await getFixtures_2();



  return null
  
}