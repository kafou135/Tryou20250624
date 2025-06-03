import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';


const API_KEY = process.env.API_KEY as string;

export default async function getFixtures(name:string,season:number,id:number): Promise<AllFixtures[]> {
    const url = `https://v3.football.api-sports.io/fixtures?league=${id}&season=${season}`;
    const options = {
      
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
       },
       
     };
    const res = await fetch(url, options);
    const data = await res.json();
    return data.response ?? [];
     

}
