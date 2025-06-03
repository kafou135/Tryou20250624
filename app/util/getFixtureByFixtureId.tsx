import { Fixture } from '@/types';
import 'server-only';

const API_KEY = process.env.API_KEY as string;
export default async function getFixtureByFixtureId(id: number,teamName:string,season:number,leagueid:number) {

  // Try to get from Redis
 
    const response = await fetch(`https://v3.football.api-sports.io/fixtures?id=${id}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io', // optional, may not be required anymore
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch fixture with ID ${id}`);
    }
  
    const data = await response.json();
    const fixture = data.response[0]; // or data.response for the array

  return fixture;
  };
  