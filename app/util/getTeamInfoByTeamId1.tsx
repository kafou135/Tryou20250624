import { Fixture } from '@/types';
import 'server-only';
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL1!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN1!,
});
const API_KEY = process.env.API_KEY as string;
export default async function getFixtureByTeamId(teamid: number,teamName:string) {
    const cacheKey = `fixtureByteamId:${teamid}`;

  // Try to get from Redis
  const cached = await redis.get(cacheKey);
  if (cached) {
    return cached;
  }
    const response = await fetch(`https://v3.football.api-sports.io/team?id=${teamid}`, {
      method: 'GET',
      headers: {
        'x-apisports-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io', // optional, may not be required anymore
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch fixture with ID ${teamid}`);
    }
  
    const data = await response.json();
    const fixture = data.response[0]; // or data.response for the array

  return fixture;
  };
  
