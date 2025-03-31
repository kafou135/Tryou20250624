import { Team } from '@/types';
import 'server-only';
import getTeams from './getTeams';

export default async function getTeamInfoByTeamId(teamid: number,teamName:string,season:number,leagueid:number): Promise<Team> {
    try {
        const teams: Team[] = await getTeams(teamid,teamName,season,leagueid);

        for (const team of teams) {
            if (team.team.id === teamid) {
                return team;
            }
        }

        throw new Error(`Team with ID ${teamid} not found`); // Ensure function always returns a Team
    } catch (error) {
        console.error('An Error occured while fetching team info by team Id: ', error);
        throw error;
    }
}