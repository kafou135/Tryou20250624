import { Fixture } from '@/types';
import 'server-only';
import getFixtures from './getFixtures1';

export default async function getFixtureByFixtureId(id: number,teamName:string,season:number,leagueid:number): Promise<Fixture> {
    try {
        const allFixturesByLeague = await getFixtures(teamName,season,leagueid);

        for (const league of allFixturesByLeague) {
            for (const fixture of league.fixtures) {
                if (fixture.fixture.id === id) {
                    return fixture; // Always returns a valid Fixture
                }
            }
        }

        throw new Error(`Fixture with ID ${id} not found`); // No null/undefined
    } catch (error) {
        console.error('Error occurred while fetching fixture by fixture Id: ', error);
        throw error; // Force the caller to handle the error
    }
}
