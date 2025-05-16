import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';

const API_KEY = process.env.API_KEY as string;



const leagues =    [
    {league: 417,yearr:-1,startmonth: '2024-09-01',endmonth: '2025-05-01',country: "Bahrain",name: "EPL"},
    {league: 1109,yearr:-1,startmonth: '2024-05-01',endmonth: '2025-06-01',country: "Bahrain",name: "EPL"},
    {league: 811,yearr:-1,startmonth: '2024-12-01',endmonth: '2025-05-01',country: "Bangladesh",name: "EPL"},
    {league: 398,yearr:0,startmonth: '2024-11-01',endmonth: '2025-06-01',country: "Bangladesh",name: "EPL"},
    {league: 422,yearr:-1,startmonth: '2025-01-01',endmonth: '2025-06-01',country: "Barbados",name: "EPL"},
    {league: 117,yearr:0,startmonth: '2025-03-01',endmonth: '2025-04-01',country: "Belarus",name: "EPL"},
    {league: 118,yearr:-1,startmonth: '2025-04-01',endmonth: '2025-06-01',country: "Belarus",name: "EPL"},
    {league: 486,yearr:-1,startmonth: '2024-05-01',endmonth: '2025-06-01',country: "Belarus",name: "EPL"},
    {league: 116,yearr:0,startmonth: '2025-03-01',endmonth: '2025-12-01',country: "Belarus",name: "EPL"},
    {league: 562,yearr:-1,startmonth: '2025-03-01',endmonth: '2025-12-01',country: "Belarus",name: "EPL"},
    {league: 812,yearr:0,startmonth: '2025-02-01',endmonth: '2025-03-01',country: "Belarus",name: "EPL"},
    {league: 145,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-05-01',country: "Belgium",name: "EPL"},
    {league: 147,yearr:-1,startmonth: '2024-07-01',endmonth: '2025-06-01',country: "Belgium",name: "EPL"},
    {league: 487,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-06-01',country: "Belgium",name: "EPL"},
    {league: 144, yearr:-1, startmonth: '2024-07-01', endmonth: '2025-04-01', country: "Belgium", name: "EPL"},
    {league: 153, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', country: "Belgium", name: "EPL"},
    {league: 691, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', country: "Belgium", name: "EPL"},
    {league: 154, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', country: "Belgium", name: "EPL"},
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

