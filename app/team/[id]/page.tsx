import getTeamInfoByTeamId from "@/app/util/getTeamInfoByTeamId"
import { Fixture } from "@/types"
import type { leaguebyid, Team } from "@/types"
import Image from "next/image"
import Fixtures from "./components/Fixtures"
import getFixturesByTeamId from "@/app/util/getFixturesByTeamId"
import Head from "next/head"
import { Metadata } from "next"

type PageProps = {
    params: {
        id: string
    }
}
const namee:string[]=[]


export async function generateMetadata({ params }: PageProps) {
    
    const match = params.id.match(/(\d+)nm(.*?)seas(\d+)lid(\d+)/);
    if (!match) {
        return {
            title: 'Invalid Team | Gridiola',
            description: 'The team ID format is invalid. Please check the URL.',
    };
} 
    const teamId = parseInt(match[1]);
    const teamName = match[2];
    const season = parseInt(match[3]);
    const leagueid = parseInt(match[4]);
    
    const teamInfo = await getTeamInfoByTeamId(teamId, teamName, season, leagueid);
    const name = teamInfo?.league?.standings?.[0]?.[0]?.team?.name || teamName;
    namee.push(teamName)
    return {title: 'GRIDIOLA', // Updated app name
  description: 'Your go-to app for football stats, live matches, and team insights.',
  icons:{
    icon:['/khdam1.png?v=4'],
    apple:['/apple-touch-icon1.png?v=4'],
    shortcut:['/apple-touch-icon1.png']
  }}

}


export default async function Team({
    params
}: PageProps) {
    
    const match = params.id.match(/(\d+)nm(.*?)seas(\d+)lid(\d+)/);
    if (!match) {
        return (
            <div className="flex justify-center items-center text-neutral-100 py-5">
                <p className="text-red-500 text-lg">Invalid Team ID format</p>
            </div>
        );
    }
    const teamId = parseInt(match[1]); // Extracts the numeric team ID
    const teamName = match[2]; // Extracts the team name
    const season = parseInt(match[3]); // Extracts the season
    const leagueid = parseInt(match[4]); // Extracts the season
    let teamInfo= await getTeamInfoByTeamId(teamId,teamName,season,leagueid);
    let fixturesByTeamId: Fixture[] = await getFixturesByTeamId(teamId,teamName,season,leagueid);


    return (
        <>
<head>
        <title>{teamName} – Stats, Form & Fixtures | Gridiola</title>
        <meta property="og:title" content={`${teamName} – Stats, Form & Fixtures | Gridiola`} />
        <meta name="twitter:title" content={`${teamName} – Stats, Form & Fixtures | Gridiola`} />
        {/* Optional: other Twitter/OpenGraph tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={`Explore ${teamName}'s latest stats, league form, and upcoming matches for the ${season}/${season + 1} season. Follow live scores and detailed insights on Gridiola.`} />
      </head>        
      <div className="flex justify-center items-center text-neutral-100 py-5">
            <div className="flex flex-col max-w-7xl p-5 w-full md:flex-row gap-5 bg-gray-900 rounded-lg shadow-lg">
                <div className="flex flex-col md:w-1/3 justify-center items-center bg-gray-800 rounded-lg p-5 shadow-md">
                    <img
                        src={`https://media.api-sports.io/football/teams/${teamId}.png`}
                        alt="TeamLogo"
                        width={150}
                        height={150}
                        className="p-3 border-2 border-gray-700"
                    />
                    <div className="text-2xl font-bold mt-3">{teamInfo?.league?.standings?.[0][0].team.name}</div>
                    <div className="flex justify-center items-center w-full mt-2 text-lg font-semibold">
                        <div className="w-1/3 text-center">#{teamInfo?.league?.standings[0]?.[0]?.rank}</div>
                        <div className="w-1/3 text-center">{teamInfo?.league?.standings[0]?.[0]?.group}</div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <div className="text-center">Form</div>
                            <div className="flex justify-center items-center">
                                {
                                    teamInfo?.league?.standings[0]?.[0]?.form.split('').map((char: string, i: any) => (
                                        <div
                                            key={char + i}
                                            className={`opacity-80 w-4 h-4 m-1 rounded-full
                                            ${char === 'L' ? 'bg-red-500' : char === 'D' ?
                                                    'bg-yellow-500' : 'bg-green-500'}`}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full p-2 mt-5">
                        <div className="flex w-full justify-center items-center text-lg font-semibold bg-gray-700 rounded-md p-2">
                            <div className="w-full text-center">P</div>
                            <div className="w-full text-center">M</div>
                            <div className="w-full text-center">W</div>
                            <div className="w-full text-center">D</div>
                            <div className="w-full text-center">L</div>
                            <div className="w-full text-center">GF</div>
                            <div className="w-full text-center">GA</div>
                            <div className="w-full text-center">GD</div>
                        </div>
                        <div className="flex w-full justify-center items-center text-lg font-semibold mt-2">
                            <div className="w-full text-center text-yellow-400">{teamInfo?.league?.standings[0]?.[0]?.points}</div>
                            <div className="w-full text-center">{teamInfo?.league?.standings[0]?.[0]?.all.played}</div>
                            <div className="w-full text-center">{teamInfo?.league?.standings[0]?.[0]?.all.win}</div>
                            <div className="w-full text-center">{teamInfo?.league?.standings[0]?.[0]?.all.draw}</div>
                            <div className="w-full text-center">{teamInfo?.league?.standings[0]?.[0]?.all.lose}</div>
                            <div className="w-full text-center">{teamInfo?.league?.standings[0]?.[0]?.all.goals.for}</div>
                            <div className="w-full text-center">{teamInfo?.league?.standings[0]?.[0]?.all.goals.against}</div>
                            <div className="w-full text-center">{teamInfo?.league?.standings[0]?.[0]?.goalsDiff}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:w-2/3 justify-center items-center bg-gray-800 rounded-lg p-5 shadow-md">
                    <Fixtures fixturesByTeamId={fixturesByTeamId} teamId={parseInt(params.id)} />
                </div>
            </div>
            

        </div>
        <div className="text-gray-300 mb-8 leading-relaxed space-y-4 max-w-7xl mx-auto px-4">
  <h1 className="text-2xl font-bold text-white">{teamInfo?.league?.standings[0]?.[0]?.team?.name} – Team Stats, League Form & Fixtures</h1>

  <p>
    Explore comprehensive insights into <strong>{teamInfo?.league?.standings[0]?.[0]?.team?.name}</strong>’s recent performances, standings, and upcoming matches for the {season}/{season + 1} season. From win/loss form to goals scored and conceded, this page gives fans everything they need to track their team’s journey in the current league.
  </p>

  <h2 className="text-xl font-semibold text-white">📈 Current League Standing</h2>
  <p>
    {teamInfo?.league?.standings[0]?.[0]?.team?.name} currently holds the <strong>#{teamInfo?.league?.standings[0]?.[0]?.rank}</strong> spot in the league. With a total of <strong>{teamInfo?.league?.standings[0]?.[0]?.points}</strong> points from <strong>{teamInfo?.league?.standings[0]?.[0]?.all.played}</strong> matches, the team has achieved <strong>{teamInfo?.league?.standings[0]?.[0]?.all.win}</strong> wins, <strong>{teamInfo?.league?.standings[0]?.[0]?.all.draw}</strong> draws, and <strong>{teamInfo?.league?.standings[0]?.[0]?.all.lose}</strong> losses.
    They've scored <strong>{teamInfo?.league?.standings[0]?.[0]?.all.goals.for}</strong> goals while conceding <strong>{teamInfo?.league?.standings[0]?.[0]?.all.goals.against}</strong>, giving them a goal difference of <strong>{teamInfo?.league?.standings[0]?.[0]?.goalsDiff}</strong>.
  </p>

  <h2 className="text-xl font-semibold text-white">🔥 Team Form</h2>
  <p>
    The recent form of {teamInfo?.league?.standings[0]?.[0]?.team?.name} is shown below with colored indicators: <span className="text-green-400">🟢 Win</span>, <span className="text-gray-400">⚪ Draw</span>, and <span className="text-red-400">🔴 Loss</span>.
    This gives fans a quick visual of their momentum heading into the next fixtures.
  </p>

  <h2 className="text-xl font-semibold text-white">📅 Previous & Upcoming Fixtures</h2>
  <p>
    Stay updated with {teamInfo?.league?.standings[0]?.[0]?.team?.name}'s full schedule. View details of their most recent games, including goals, opponents, and match outcomes. The upcoming fixture list helps supporters plan ahead to follow the action live. Whether it's a home game or away clash, we’ve got you covered.
  </p>

  <p>
    Dive into the team’s stats, evaluate their performance, and get real-time updates — all in one place. Ideal for passionate fans, fantasy football players, and sports analysts alike.
  </p>
</div>
</>

    )
}
