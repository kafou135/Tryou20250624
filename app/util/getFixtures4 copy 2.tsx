import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';
import { Redis } from "@upstash/redis";

const API_KEY = process.env.API_KEY as string;



const leagues =    [
    {league: 343, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-04-01', name: "EPL"},
    {league: 342, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', name: "EPL"},
    {league: 654, yearr:0, startmonth: '2025-02-01', endmonth: '2025-03-01', name: "EPL"},
    {league: 421, yearr:-1, startmonth: '2024-09-01', endmonth: '2025-06-01', name: "EPL"},
    {league: 188, yearr:-1, startmonth: '2024-10-01', endmonth: '2025-06-01', name: "EPL"},
    {league: 190, yearr:-1, startmonth: '2024-11-01', endmonth: '2025-05-01', name: "EPL"},
    {league: 874, yearr:0, startmonth: '2025-07-01', endmonth: '2025-11-01', name: "EPL"},
    {league: 191, yearr:0, startmonth: '2025-02-01', endmonth: '2025-09-01', name: "EPL"},
    {league: 189, yearr:0, startmonth: '2025-03-01', endmonth: '2025-09-01', name: "EPL"},
    {league: 1092, yearr:0, startmonth: '2025-04-01', endmonth: '2025-09-01', name: "EPL"},
    {league: 192, yearr:0, startmonth: '2025-02-01', endmonth: '2025-09-01', name: "EPL"},
    {league: 835, yearr:0, startmonth: '2025-02-01', endmonth: '2025-09-01', name: "EPL"},
    {league: 1090, yearr:0, startmonth: '2025-03-01', endmonth: '2025-09-01', name: "EPL"},
    {league: 481, yearr:0, startmonth: '2025-02-01', endmonth: '2025-09-01', name: "EPL"},
    {league: 193, yearr:0, startmonth: '2025-03-01', endmonth: '2025-10-01', name: "EPL"},
    {league: 482, yearr:0, startmonth: '2025-02-01', endmonth: '2025-09-01', name: "EPL"},
    {league: 833, yearr:0, startmonth: '2025-02-01', endmonth: '2025-09-01', name: "EPL"},
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
