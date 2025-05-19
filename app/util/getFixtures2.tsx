import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';
import { Redis } from "@upstash/redis";

const API_KEY = process.env.API_KEY as string;

// Redis setup
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL3;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN3;

if (!REDIS_URL || !REDIS_TOKEN) {
  throw new Error("🚨 Redis environment variables are missing.");
}

const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

const leagues =    [
    {league: 61,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-06-01',country: "France",name: "EPL"},
    {league: 311,yearr: 0,startmonth: '2024-08-01',endmonth: '2025-05-01',name: "EPL"},
    {league: 512,yearr: 0,startmonth: '2024-09-01',endmonth: '2025-05-01',name: "EPL"},
    {league: 513,yearr: 0,startmonth: '2024-09-01',endmonth: '2025-05-01',name: "EPL"},
    {league: 978,yearr: 0,startmonth: '2024-05-01',endmonth: '2025-06-01',name: "EPL"},
    {league: 707,yearr: 0,startmonth: '2024-09-01',endmonth: '2025-05-01',name: "EPL"},
    {league: 708,yearr: -1,startmonth: '2024-12-01',endmonth: '2025-01-01',name: "EPL"},
    {league: 310,yearr: 0,startmonth: '2024-08-01',endmonth: '2025-06-01',name: "EPL"},
    {league: 514,yearr: 0,startmonth: '2024-12-01',endmonth: '2025-04-01',name: "EPL"},
    {league: 186,yearr: 0,startmonth: '2024-09-01',endmonth: '2025-06-01',name: "EPL"},
    {league: 187, yearr:-1, startmonth: '2024-09-01', endmonth: '2025-06-01', name: "EPL"},
  {league: 516, yearr:0, startmonth: '2025-01-01', endmonth: '2025-02-01', name: "EPL"},
  {league: 515, yearr:-1, startmonth: '2024-09-01', endmonth: '2025-06-01', name: "EPL"},
    
   
]

async function fetchFixturesByLeague(
    year: number,
    league: number,
    yearr: number
): Promise<Fixture[]> {
const nextWeek1 = moment().add(3, 'days').format('YYYY-MM-DD');        const lastWeek1 = moment().add(1, 'days').format('YYYY-MM-DD');    const url = `https://v3.football.api-sports.io/fixtures?league=${league}&season=${year + yearr}&from=${lastWeek1}&to=${nextWeek1}`;    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
        },
        next: {
            revalidate: 1 * 1 * 15,
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.response ?? [];
    } catch (err) {
        console.log(`Error fetching ${league} fixtures in year ${year}: ${err}`);
        return [];
    }
}

export default async function getFixtures(): Promise<AllFixtures[]> {
     

    try {
        const currentTime = moment().format('YYYY-MM-DD')
        const year = moment().year();
        const month = moment().month();

        const allFixturesByLeague: AllFixtures[] = [];


            for (const league of leagues) {
            if (currentTime <= league.endmonth) {
                allFixturesByLeague.push({
                    name: league.name,
                    fixtures: await fetchFixturesByLeague(year, league.league,league.yearr),
                });
            } else if (currentTime >= league.startmonth) {
                allFixturesByLeague.push({
                    name: league.name,
                    fixtures: await fetchFixturesByLeague(year, league.league,league.yearr),
                });
            } else {
                allFixturesByLeague.push({
                    name: league.name,
                    fixtures: await fetchFixturesByLeague(year, league.league,league.yearr),
                });
                const existingData = allFixturesByLeague.find((data) => data.name === league.name);
                if (existingData) {
                    existingData.fixtures.push(...(await fetchFixturesByLeague(year, league.league,league.yearr)));
                } else {
                    allFixturesByLeague.push({
                        name: league.name,
                        fixtures: await fetchFixturesByLeague(year, league.league,league.yearr)
                    });
                }
            }
        }


        return allFixturesByLeague;
    } catch (error) {
        console.error("An error occured while fetching fixtures: ", error);
        throw error;
    }
}

