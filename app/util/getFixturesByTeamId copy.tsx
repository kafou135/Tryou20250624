import { Fixture } from '@/types';
import 'server-only';
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL2!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN2!,
});

const API_KEY = process.env.API_KEY as string;
const leagues =    [
  { league: 2, name: 'EPL' ,yearr:-1, startmonth: '2024-07-01', endmonth: '2025-06-01'},
   { league: 39, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
   { league: 140, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
   { league: 135, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
   { league: 78, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
   { league: 5, name: 'euro' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
   { league: 6, name: 'caf' ,yearr:0, startmonth: '2024-08-01', endmonth: '2025-06-01'},
]


export default async function getFixtureByTeamId() {
    const cacheKey = `fixtureByteamId:${70}`;

  // Try to get from Redis
  const cached = await redis.get(cacheKey);
  if (cached) {
    return cached;
  }
    const response = await fetch("https://v3.football.api-sports.io/fixtures?date=2025-04-15", {
      method: 'GET',
      headers: {
        'x-apisports-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io', // optional, may not be required anymore
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch fixture with ID ${70}`);
    }
  
    const data = await response.json();
    const fixture = data.response; // or data.response for the array
    await redis.set(cacheKey, fixture, { ex: 60 });

  return fixture;
  };
  
