//import { AllFixtures, Fixture } from "@/types";
//import moment from 'moment';
//import { Redis } from "@upstash/redis";
//
//const API_KEY = process.env.API_KEY as string;
//
//// Redis setup
//const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
//const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
//
//if (!REDIS_URL || !REDIS_TOKEN) {
//  throw new Error("🚨 Redis environment variables are missing.");
//}
//
//const redis = new Redis({
//  url: REDIS_URL,
//  token: REDIS_TOKEN,
//});
//
//const leagues =    [
//    { league:1040, name: 'EPL' ,yearr:0, startmonth: '2024-07-01', endmonth: '2025-06-01'},
//     { league: 186, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
//     { league: 186, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
//     { league: 186, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
//     { league: 78, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
//     { league: 5, name: 'euro' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
//     { league: 6, name: 'caf' ,yearr:0, startmonth: '2024-08-01', endmonth: '2025-06-01'},
//]
//
//
//export default async function getFixtures(): Promise<AllFixtures[]> {
//   const currentTimeFormat = moment().format('YYYY-MM-DD');
//  const year = moment().year();
//const fetches = leagues.map(async (league) => {
//    const url = `https://v3.football.api-sports.io/fixtures?league=${league.league}&season=${year + league.yearr}&from=${currentTimeFormat}&to=${currentTimeFormat}`;
//    const options = {
//      
//      method: 'GET',
//      headers: {
//        'X-RapidAPI-Key': API_KEY,
//       },
//       
//     };
//    const res = await fetch(url, options);
//    const data = await res.json();
//    return data.response ?? [];
//  });
//  const allResponses = await Promise.all(fetches);
//  return allResponses.flat();       
//   
//
//}
//