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
]

async function fetchFixturesByLeague(
    year: number,
    league: number,
    yearr: number,
): Promise<Fixture[]> {
const nextWeek1 = moment().subtract(1, 'days').format('YYYY-MM-DD');        const lastWeek1 = moment().subtract(7, 'days').format('YYYY-MM-DD');    const url = `https://v3.football.api-sports.io/fixtures?league=${league}&season=${year + yearr}&from=${lastWeek1}&to=${nextWeek1}`;    const options = {
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
           const currentTime = moment();
           const year = currentTime.year();
           const month = currentTime.month();
   
           const allFixturesByLeague: AllFixtures[] = [];
   
   
               for (const league of leagues) {
               if (month <= 5) {
                   allFixturesByLeague.push({
                       name: league.name,
                       fixtures: await fetchFixturesByLeague(year, league.league,league.yearr),
                   });
               } else if (month >= 8) {
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

