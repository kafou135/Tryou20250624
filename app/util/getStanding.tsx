
import 'server-only';
import { Standing } from "@/types";
import moment from "moment";

export default async function getStandings(yearr:number,id:number): Promise<Standing[]> {

   

    const currentTime = moment().format('YYYY-MM-DD')
    const month = moment().month();
    let year;

    if (month <= 6) {
        year = moment().year() - 1;
    } else {
        year = moment().year();
    }

    const API_KEY: string = process.env.API_KEY as string;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
        },
        
    };

    let standings: Standing[] = [];

    
        let url = `https://v3.football.api-sports.io/standings?season=${2024+yearr}&league=${id}`

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            const standing = data.response[0];
        
            if (standing) {
              standings.push(standing);
            }
        } catch (err) {
            console.error(`Error fetching ${id} standings: ${err}`);
        }
    

    return standings;
}