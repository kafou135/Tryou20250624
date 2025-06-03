import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';
import { Redis } from "@upstash/redis";

const API_KEY = process.env.API_KEY as string;



const leagues =    [
    {league: 851, yearr: 0, startmonth: '2024-05-01', endmonth: '2025-09-01', country: "Brazil", name: "EPL"},
    {league: 1155, yearr: -1, startmonth: '2024-09-01', endmonth: '2025-01-01', country: "Brazil", name: "EPL"},
    {league: 1106, yearr: 0, startmonth: '2024-05-01', endmonth: '2025-09-01', country: "Brazil", name: "EPL"},
    {league: 1114, yearr: 0, startmonth: '2025-06-01', endmonth: '2025-11-01', country: "Brazil", name: "EPL"},
    {league: 604, yearr: 0, startmonth: '2025-01-01', endmonth: '2025-04-01', country: "Brazil", name: "EPL"},
    {league: 936, yearr: 0, startmonth: '2024-05-01', endmonth: '2025-09-01', country: "Brazil", name: "EPL"},
    {league: 1154, yearr: 0, startmonth: '2024-09-01', endmonth: '2025-12-01', country: "Brazil", name: "EPL"},
    {league: 1076, yearr: 0, startmonth: '2025-04-01', endmonth: '2025-09-01', country: "Brazil", name: "EPL"},
    {league: 740, yearr: 0, startmonth: '2025-03-01', endmonth: '2025-08-01', country: "Brazil", name: "EPL"},
    {league: 609, yearr: 0, startmonth: '2025-01-01', endmonth: '2025-04-01', country: "Brazil", name: "EPL"},
    {league: 620, yearr: 0, startmonth: '2025-02-01', endmonth: '2025-04-01', country: "Brazil", name: "EPL"},
    {league: 1124, yearr: 0, startmonth: '2025-06-01', endmonth: '2025-09-01', country: "Brazil", name: "EPL"},
    {league: 1112, yearr: 0, startmonth: '2024-05-01', endmonth: '2025-10-01', country: "Brazil", name: "EPL"},
    {league: 1063, yearr: 0, startmonth: '2025-01-01', endmonth: '2025-04-01', country: "Brazil", name: "EPL"},
    {league: 73, yearr: 0, startmonth: '2025-02-01', endmonth: '2025-04-01', country: "Brazil", name: "EPL"},
    {league: 1179, yearr: 0, startmonth: '2025-03-01', endmonth: '2025-04-01', country: "Brazil", name: "EPL"},
    {league: 617, yearr: -1, startmonth: '2024-10-01', endmonth: '2025-01-01', country: "Brazil", name: "EPL"},
    {league: 612, yearr: 0, startmonth: '2025-01-01', endmonth: '2025-04-01', country: "Brazil", name: "EPL"},
    {league: 1097, yearr: 0, startmonth: '2025-04-01', endmonth: '2025-07-01', country: "Brazil", name: "EPL"},
]


export default async function getFixtures(): Promise<AllFixtures[]> {
   const currentTimeFormat = moment().format('YYYY-MM-DD');
  const year = moment().year();
const fetches = leagues.map(async (league) => {const nextWeek1 = moment().subtract(1, 'days').format('YYYY-MM-DD');        const lastWeek1 = moment().subtract(7, 'days').format('YYYY-MM-DD');  
    const url = `https://v3.football.api-sports.io/fixtures?league=${league.league}&season=${year + league.yearr}&from=${currentTimeFormat}&to=${currentTimeFormat}`;
    const options = {
      
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
       },
       
     };
    const res = await fetch(url, options);
    const data = await res.json();
    return data.response ?? [];
  });
  const allResponses = await Promise.all(fetches);
  return allResponses.flat();       
   

}
