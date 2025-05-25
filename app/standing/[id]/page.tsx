import getTeamInfoByTeamId from "@/app/util/getTeamInfoByTeamId"
import { Fixture,Standing } from "@/types"
import type { Team, Topscorers } from "@/types"
import Image from "next/image"
import Fixtures from "./components/standing"

import getTopScorersBatch from "@/app/util/getPlayers"
import getStandingsBatch from "@/app/util/getStanding"

type PageProps = {
    params: {
        id: number
    }
}

export default async function Team({
    params
}: PageProps) {
  const idString = params.id.toString(); // Convert number to string
  const yearr = idString.slice(0, 1); // First three characters
  const id = idString.slice(1); // Remaining characters
  
  console.log("ID:", id, "Year:", yearr); // Debugging
  
  // Assuming id and yearr are variables
  // Assuming you have id and yearr variables for a single league
  const standingsData: Standing[][] = await getStandingsBatch(Number(yearr),Number(id))
  
  // This retrieves the standings for the specific league by the id
  const topscorers:Topscorers[] = await getTopScorersBatch(Number(yearr),Number(id))
  console.log("standingsData",standingsData)

    return (
        <>
        <div className="laptop-only">
                    <Fixtures standingsData={standingsData} topscorers={topscorers}/>
            </div>
            <div className="text-gray-300 mb-8 leading-relaxed space-y-4 max-w-7xl mx-auto px-4">
  <h1 className="text-2xl font-bold text-white">League Standings and Top Scorers Overview</h1>

  <p>
    Welcome to the official league table and top scorers page for the {standingsData[0]?.league?.name} {standingsData[0]?.league?.season} season. Whether you're following the title race, the battle for European spots, or the fight to avoid relegation, this page has all the up-to-date data you need.
  </p>

  <h2 className="text-xl font-semibold text-white">🏆 Live Standings & Points Table</h2>
  <p>
    The standings show the current performance of every team in the league based on their match results. It includes total matches played, wins, draws, losses, goals scored, goals conceded, and goal difference.
    Teams are ranked by points, with 3 points awarded for a win and 1 for a draw.
  </p>
  <p>
    This dynamic table helps fans monitor their club’s position in real time, track changes after each matchweek, and get insights into overall team performance.
  </p>

  <h2 className="text-xl font-semibold text-white">⚽ Top Goal Scorers</h2>
  <p>
    The top scorers section showcases the most lethal attackers in the league. These players consistently make a difference for their teams with their goal-scoring ability.
    Here you'll find details like number of goals scored, matches played, and sometimes even assists or penalties converted.
  </p>
  <p>
    This leaderboard is especially useful for fantasy football players, bettors, and fans tracking their favorite strikers.
  </p>

  <p>
    Our data is updated regularly to reflect every goal, point, and performance change throughout the season. Be sure to bookmark this page to follow your team's journey or see which player might claim the Golden Boot!
  </p>
</div>

            </>
    );
}
