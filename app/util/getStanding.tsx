import 'server-only';
import { Standing } from "@/types";
import moment from "moment";

export default async function getStandings(yearr: number, id: number): Promise<Standing[][]> {
    const currentTime = moment();
    const year = currentTime.year() - 1;

    const API_KEY: string = process.env.API_KEY as string;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
        },
    };

    const url = `https://v3.football.api-sports.io/standings?season=${2024 + yearr}&league=${id}`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const standing = data.response;

        return standing || [];
    } catch (err) {
        console.error(`Error fetching standings: ${err}`);
        return [];
    }
}
