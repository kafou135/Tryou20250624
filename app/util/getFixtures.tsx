import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';
import { Redis } from "@upstash/redis";

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

export default async function getFixtures(): Promise<AllFixtures[]> {
const nextWeek1 = moment().add(3, 'days').format('YYYY-MM-DD');        const lastWeek1 = moment().add(1, 'days').format('YYYY-MM-DD');
  let allFixtures: AllFixtures[] = [];

  for (const { league, yearr } of leagues) {
    const currentYear = moment().year() + yearr;

    const url = `https://v3.football.api-sports.io/fixtures?league=${league}&season=${currentYear}&from=${lastWeek1}&to=${nextWeek1}`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const fixtures = data.response ?? [];
      allFixtures = [...fixtures]; // ← No function used

    } catch (err) {
      console.error(`Error fetching fixtures for league ${league} in year ${currentYear}:`, err);
    }
  }

  return allFixtures;
}