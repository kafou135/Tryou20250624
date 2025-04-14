import { Fixture } from '@/types';
import 'server-only';
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL1!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN1!,
});

export default async function getFixtureByTeamId(teamid: number,teamName:string,season:number,leagueid:number) {
    const cacheKey = `fixtureByteamId:${teamid}`;

  // Try to get from Redis
  const cached = await redis.get(cacheKey);
  if (cached) {
    return cached;
  }
    const response = await fetch(`https://v3.football.api-sports.io/standings?team=${teamid}&season=${season}"`, {
      method: 'GET',
      headers: {
        'x-apisports-key': 'bfc80e7adee96f66d9666e447c62298d',
        'x-rapidapi-host': 'v3.football.api-sports.io', // optional, may not be required anymore
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch fixture with ID ${teamid}`);
    }
  
    const data = await response.json();
    const fixture = data.response; // or data.response for the array
    await redis.set(cacheKey, fixture, { ex: 60 });

  return fixture;
  };
  
