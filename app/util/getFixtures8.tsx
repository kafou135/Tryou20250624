import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';
import { Redis } from "@upstash/redis";

const API_KEY = process.env.API_KEY as string;



const leagues =    [
    {league: 155, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', country: "Belgium", name: "EPL"},
{league: 156, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', country: "Belgium", name: "EPL"},
{league: 157, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', country: "Belgium", name: "EPL"},
{league: 158, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', country: "Belgium", name: "EPL"},
{league: 159, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', country: "Belgium", name: "EPL"},
{league: 160, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', country: "Belgium", name: "EPL"},
{league: 161, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', country: "Belgium", name: "EPL"},
{league: 518, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', country: "Belgium", name: "EPL"},
{league: 148, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01', country: "Belgium", name: "EPL"},
{league: 149, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', country: "Belgium", name: "EPL"},
{league: 150, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', country: "Belgium", name: "EPL"},
{league: 519,yearr: -1,startmonth: '2024-07-01',endmonth: '2025-08-01',country: "Belgium",name: "EPL"},
{league: 146,yearr: -1,startmonth: '2024-08-01',endmonth: '2025-04-01',country: "Belgium",name: "EPL"},
{league: 689,yearr: -1,startmonth: '2024-08-01',endmonth: '2025-05-01',country: "Belgium",name: "EPL"},
{league: 690,yearr: -1,startmonth: '2024-08-01',endmonth: '2025-05-01',country: "Belgium",name: "EPL"},
{league: 981,yearr: -1,startmonth: '2024-05-01',endmonth: '2025-06-01',country: "Belgium",name: "EPL"},
{league: 151,yearr: -1,startmonth: '2024-08-01',endmonth: '2025-05-01',country: "Belgium",name: "EPL"},
{league: 152,yearr: -1,startmonth: '2024-08-01',endmonth: '2025-05-01',country: "Belgium",name: "EPL"},]

export default async function getFixtures(): Promise<AllFixtures[]> {
const nextWeek1 = moment().add(3, 'days').format('YYYY-MM-DD');        const lastWeek1 = moment().add(1, 'days').format('YYYY-MM-DD');  let allFixtures: AllFixtures[] = [];

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

  return [];
}
