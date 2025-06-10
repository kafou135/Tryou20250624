import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';

const API_KEY = process.env.API_KEY as string;



const leagues =    [
    { league: 2, name: 'EPL' ,yearr:-1, startmonth: '2024-07-01', endmonth: '2025-06-01'},
     { league: 39, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
     { league: 140, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
     { league: 135, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
     { league: 78, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
     { league: 5, name: 'euro' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
     { league: 6, name: 'caf' ,yearr:0, startmonth: '2024-08-01', endmonth: '2025-06-01'},
       {league: 859, yearr:0, startmonth: '2024-09-01', endmonth: '2025-06-01', name: "EPL"},
       {league: 35, yearr:-1, startmonth: '2024-09-01', endmonth: '2025-06-01', name: "EPL"},
       {league: 30, yearr: 1, startmonth: '2024-09-01', endmonth: '2025-06-01', name: "EPL"},

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
    return data.response;
  });
  const allResponses = await Promise.all(fetches);
  return allResponses;       
   

}
