import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';

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

async function fetchFixturesByLeague(
    year: number,
    league: number,
    yearr: number
): Promise<Fixture[]> {
const nextWeek1 = moment().add(3, 'days').format('YYYY-MM-DD');        const lastWeek1 = moment().add(1, 'days').format('YYYY-MM-DD');   const url = `https://v3.football.api-sports.io/fixtures?league=${league}&season=${year + yearr}&from=${lastWeek1}&to=${nextWeek1}`;    const options = {
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


        //    for (const league of leagues) {
        //    if (currentTime <= league.endmonth) {
        //        allFixturesByLeague.push({
        //            name: league.name,
        //            fixtures: await fetchFixturesByLeague(year, league.league,league.yearr),
        //        });
        //    } else if (currentTime >= league.startmonth) {
        //        allFixturesByLeague.push({
        //            name: league.name,
        //            fixtures: await fetchFixturesByLeague(year, league.league,league.yearr),
        //        });
        //    } else {
        //        allFixturesByLeague.push({
        //            name: league.name,
        //            fixtures: await fetchFixturesByLeague(year, league.league,league.yearr),
        //        });
        //        const existingData = allFixturesByLeague.find((data) => data.name === league.name);
        //        if (existingData) {
        //            existingData.fixtures.push(...(await fetchFixturesByLeague(year, league.league,league.yearr)));
        //        } else {
        //            allFixturesByLeague.push({
        //                name: league.name,
        //                fixtures: await fetchFixturesByLeague(year, league.league,league.yearr)
        //            });
        //        }
        //    }
        //}


        return allFixturesByLeague;
    } catch (error) {
        console.error("An error occured while fetching fixtures: ", error);
        throw error;
    }
}

