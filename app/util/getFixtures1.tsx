import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';


const API_KEY = process.env.API_KEY as string;

export default async function getFixtures(name:string,season:number,id:number): Promise<AllFixtures[]> {

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
        const fixtures: AllFixtures[] = data.response;
        if (fixtures === null || fixtures === undefined) {
            return [];
        } else {
            return fixtures;
        }

    } catch (err) {
        console.log(`Error fetching  fixtures in year: ${err}`);
        return [];
    }
}

 