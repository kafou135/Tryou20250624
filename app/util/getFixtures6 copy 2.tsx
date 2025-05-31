import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';

const API_KEY = process.env.API_KEY as string;



const leagues =    [
    {league: 224,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 225,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 226,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 227,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 228,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 229,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 230,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 231,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 232,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 222,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 221,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 223,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 418,yearr:-1,startmonth: '2024-09-01',endmonth: '2025-06-01',country: "Azerbaijan",name: "EPL"},
{league: 420,yearr:-1,startmonth: '2024-10-01',endmonth: '2025-05-01',country: "Azerbaijan",name: "EPL"},
{league: 419,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-06-01',country: "Azerbaijan",name: "EPL"},
{league: 1049,yearr:-1,startmonth: '2025-01-01',endmonth: '2025-05-01',country: "Bahrain",name: "EPL"},
]

async function fetchFixturesByLeague(
    year: number,
    league: number,
    yearr: number
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

