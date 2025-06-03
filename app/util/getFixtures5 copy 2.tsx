import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';

const API_KEY = process.env.API_KEY as string;



const leagues =    [
    {league: 194, yearr:0, startmonth: '2025-02-01', endmonth: '2025-09-01', name: "EPL"},
  {league: 834, yearr:0, startmonth: '2025-02-01', endmonth: '2025-09-01', name: "EPL"},
  {league: 1091, yearr:0, startmonth: '2025-03-01', endmonth: '2025-09-01', name: "EPL"},
  {league: 648, yearr:0, startmonth: '2025-03-01', endmonth: '2025-10-01', name: "EPL"},
  {league: 1093, yearr:0, startmonth: '2025-03-01', endmonth: '2025-09-01', name: "EPL"},
  {league: 195, yearr:0, startmonth: '2025-02-01', endmonth: '2025-09-01', name: "EPL"},
  {league: 836, yearr:0, startmonth: '2025-02-01', endmonth: '2025-09-01', name: "EPL"},
  {league: 196, yearr:0, startmonth: '2025-03-01', endmonth: '2025-09-01', name: "EPL"},
  {league: 1094, yearr:0, startmonth: '2025-03-01', endmonth: '2025-09-01', name: "EPL"},
  {league: 219, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01', name: "EPL"},
  {league: 218, yearr:-1, startmonth: '2024-07-01', endmonth: '2025-06-01', name: "EPL"},
  {league: 218,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-04-01',country: "Austria",name: "EPL"},
  {league: 220,yearr:-1,startmonth: '2024-07-01',endmonth: '2025-05-01',country: "Austria",name: "EPL"},
  {league: 484,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-04-01',country: "Austria",name: "EPL"},
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
