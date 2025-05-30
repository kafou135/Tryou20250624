import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';

const API_KEY = process.env.API_KEY as string;



const leagues =    [
    {league: 312, yearr:-1, startmonth: '2024-09-01', endmonth: '2025-06-01', name: "EPL"},
    {league: 313, yearr:-1, startmonth: '2024-09-01', endmonth: '2025-06-01', name: "EPL"},
    {league: 655, yearr:0, startmonth: '2025-01-01', endmonth: '2025-05-01', name: "EPL"},
    {league: 809, yearr:-1, startmonth: '2024-09-01', endmonth: '2025-10-01', name: "EPL"},
    {league: 397, yearr:-1, startmonth: '2024-09-01', endmonth: '2025-06-01', name: "EPL"},
    {league: 1048, yearr:-1, startmonth: '2024-10-01', endmonth: '2025-04-01', name: "EPL"},
    {league: 130, yearr:0, startmonth: '2025-01-01', endmonth: '2025-07-01', name: "EPL"},
    {league: 1032, yearr:0, startmonth: '2025-01-01', endmonth: '2025-06-01', name: "EPL"},
    {league: 128, yearr:0, startmonth: '2025-01-01', endmonth: '2025-06-01', name: "EPL"},
    {league: 131, yearr:0, startmonth: '2025-02-01', endmonth: '2025-07-01', name: "EPL"},
    {league: 132, yearr:0, startmonth: '2025-03-01', endmonth: '2025-06-01', name: "EPL"},
    {league: 129, yearr:0, startmonth: '2025-02-01', endmonth: '2025-11-01', name: "EPL"},
    {league: 906, yearr:0, startmonth: '2025-02-01', endmonth: '2025-11-01', name: "EPL"},
    {league: 810, yearr:0, startmonth: '2025-03-01', endmonth: '2025-04-01', name: "EPL"},
    {league: 1178, yearr:0, startmonth: '2025-03-01', endmonth: '2025-04-01', name: "EPL"},
    {league: 134, yearr:0, startmonth: '2025-03-01', endmonth: '2025-08-01', name: "EPL"},
    {league: 1067, yearr:0, startmonth: '2025-02-01', endmonth: '2025-12-01', name: "EPL"},
    {league: 517, yearr:-1, startmonth: '2024-12-01', endmonth: '2025-01-01', name: "EPL"},
    {league: 709, yearr:-1, startmonth: '2024-08-01', endmonth: '2025-05-01', name: "EPL"},
   
]

export default async function getFixtures(
    year: number,
    league: number,
    yearr: number
): Promise<AllFixtures[]> {
const nextWeek1 = moment().add(3, 'days').format('YYYY-MM-DD');        const lastWeek1 = moment().add(1, 'days').format('YYYY-MM-DD');   const url = `https://v3.football.api-sports.io/fixtures?league=${league}&season=${year + yearr}&from=${lastWeek1}&to=${nextWeek1}`;    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
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

 

