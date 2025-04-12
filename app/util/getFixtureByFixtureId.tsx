import { Fixture } from '@/types';
import 'server-only';
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL2!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN2!,
});

export default async function getFixtureByFixtureId(id: number,teamName:string,season:number,leagueid:number) {
    const cacheKey = `fixtureById:${id}`;

  // Try to get from Redis
  const cached = await redis.get(cacheKey);
  if (cached) {
    return cached;
  }
    const response = await fetch(`https://v3.football.api-sports.io/fixtures?id=${id}`, {
      method: 'GET',
      headers: {
        'x-apisports-key': 'bfc80e7adee96f66d9666e447c62298d',
        'x-rapidapi-host': 'v3.football.api-sports.io', // optional, may not be required anymore
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch fixture with ID ${id}`);
    }
  
    const data = await response.json();
    const fixture = data.response[0]; // or data.response for the array
    await redis.set(cacheKey, fixture, { ex: 60 });

  return fixture;
  };
  