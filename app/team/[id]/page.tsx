import getTeamInfoByTeamId from "@/app/util/getTeamInfoByTeamId"
import { Fixture } from "@/types"
import type { Team } from "@/types"
import Image from "next/image"
import Fixtures from "./components/Fixtures"
import getFixturesByTeamId from "@/app/util/getFixturesByTeamId"

type PageProps = {
    params: {
        id: string
    }
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
    let teamInfo: Team = await getTeamInfoByTeamId(teamId,teamName,season,leagueid);
    let fixturesByTeamId: Fixture[] = await getFixturesByTeamId(teamId,teamName,season,leagueid);


    return (
        <>
        <div className="flex justify-center items-center text-neutral-100 py-5">
            <div className="flex flex-col max-w-7xl p-5 w-full md:flex-row gap-5 bg-gray-900 rounded-lg shadow-lg">
                <div className="flex flex-col md:w-1/3 justify-center items-center bg-gray-800 rounded-lg p-5 shadow-md">
                    <img
                        src={teamInfo.team.logo}
                        alt="TeamLogo"
                        width={150}
                        height={150}
                        className="p-3 border-2 border-gray-700"
                    />
                    <div className="text-2xl font-bold mt-3">{teamInfo.team.name}</div>
                    <div className="flex justify-center items-center w-full mt-2 text-lg font-semibold">
                        <div className="w-1/3 text-center">#{teamInfo.rank}</div>
                        <div className="w-1/3 text-center">{teamInfo.group}</div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <div className="text-center">Form</div>
                            <div className="flex justify-center items-center">
                                {
                                    teamInfo.form?.split('').map((char, i) => (
                                        <div
                                            key={char + i}
                                            className={`opacity-80 w-4 h-4 m-1 rounded-full
                                            ${char === 'L' ? 'bg-red-500' : char === 'D' ?
                                                    'bg-gray-500' : 'bg-green-500'}`}
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
                            <div className="w-full text-center text-yellow-400">{teamInfo.points}</div>
                            <div className="w-full text-center">{teamInfo.all.played}</div>
                            <div className="w-full text-center">{teamInfo.all.win}</div>
                            <div className="w-full text-center">{teamInfo.all.draw}</div>
                            <div className="w-full text-center">{teamInfo.all.lose}</div>
                            <div className="w-full text-center">{teamInfo.all.goals.for}</div>
                            <div className="w-full text-center">{teamInfo.all.goals.against}</div>
                            <div className="w-full text-center">{teamInfo.goalsDiff}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:w-2/3 justify-center items-center bg-gray-800 rounded-lg p-5 shadow-md">
                    <Fixtures fixturesByTeamId={fixturesByTeamId} teamId={parseInt(params.id)} />
                </div>
            </div>
            

        </div>
        <div className="text-gray-300 mb-8 leading-relaxed space-y-4 max-w-7xl mx-auto px-4">
  <h1 className="text-2xl font-bold text-white">{teamInfo.team.name} – Team Stats, League Form & Fixtures</h1>

  <p>
    Explore comprehensive insights into <strong>{teamInfo.team.name}</strong>’s recent performances, standings, and upcoming matches for the {season}/{season + 1} season. From win/loss form to goals scored and conceded, this page gives fans everything they need to track their team’s journey in the current league.
  </p>

  <h2 className="text-xl font-semibold text-white">📈 Current League Standing</h2>
  <p>
    {teamInfo.team.name} currently holds the <strong>#{teamInfo.rank}</strong> spot in the league. With a total of <strong>{teamInfo.points}</strong> points from <strong>{teamInfo.all.played}</strong> matches, the team has achieved <strong>{teamInfo.all.win}</strong> wins, <strong>{teamInfo.all.draw}</strong> draws, and <strong>{teamInfo.all.lose}</strong> losses.
    They've scored <strong>{teamInfo.all.goals.for}</strong> goals while conceding <strong>{teamInfo.all.goals.against}</strong>, giving them a goal difference of <strong>{teamInfo.goalsDiff}</strong>.
  </p>

  <h2 className="text-xl font-semibold text-white">🔥 Team Form</h2>
  <p>
    The recent form of {teamInfo.team.name} is shown below with colored indicators: <span className="text-green-400">🟢 Win</span>, <span className="text-gray-400">⚪ Draw</span>, and <span className="text-red-400">🔴 Loss</span>.
    This gives fans a quick visual of their momentum heading into the next fixtures.
  </p>

  <h2 className="text-xl font-semibold text-white">📅 Previous & Upcoming Fixtures</h2>
  <p>
    Stay updated with {teamInfo.team.name}'s full schedule. View details of their most recent games, including goals, opponents, and match outcomes. The upcoming fixture list helps supporters plan ahead to follow the action live. Whether it's a home game or away clash, we’ve got you covered.
  </p>

  <p>
    Dive into the team’s stats, evaluate their performance, and get real-time updates — all in one place. Ideal for passionate fans, fantasy football players, and sports analysts alike.
  </p>
</div>

        </>
    )
}
