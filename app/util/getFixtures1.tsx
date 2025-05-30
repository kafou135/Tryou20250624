import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';


const API_KEY = process.env.API_KEY as string;

export default async function getFixtures(year: number, id: number,season:number): Promise<Fixture[]> {

    const url = `https://v3.football.api-sports.io/fixtures?league=${id}&season=${season}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        },
         
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const fixtures: Fixture[] = data.response;
        if (fixtures === null || fixtures === undefined) {
            return [];
        } else {
            return fixtures;
        }

    } catch (err) {
        console.log(`Error fetching  fixtures in year ${year}: ${err}`);
        return [];
    }
}

 