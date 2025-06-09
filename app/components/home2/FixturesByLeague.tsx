'use client';

import LocalTime from "@/app/components/LocalTime";
import { Fixture } from "@/types";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";

type PageProps = {
    fixturesByTeamId: Fixture[];
    selectedDate:string;
};

export default function Fixtures({ fixturesByTeamId,selectedDate }: PageProps) {
    const [visibleItemsCount, setVisibleItemsCount] = useState(5);



    const allFixtures = Object.values(fixturesByTeamId).flat();

    
  
  const fixturesToday = allFixtures
    .filter(fixture => fixture?.fixture?.date && moment(fixture.fixture.date).format("YYYY-MM-DD") === selectedDate);
  
 

    return (
        <div className="p-0 mt-0 mb-0 my-0">
            

            {Object.entries(
    fixturesToday
        .slice(0, visibleItemsCount)
        .reduce((acc, fixture) => {
            const leagueId = fixture.league.id;
            if (!acc[leagueId]) acc[leagueId] = [];
            acc[leagueId].push(fixture);
            return acc;
        }, {} as Record<number, Fixture[]>)
)
    // Filter out leagues with 0 fixtures
    .filter(([_, fixtures]) => fixtures.length > 0)

    .map(([leagueId, fixtures]) => (
        <div key={leagueId} className="w-full">
            <div className="w-full text-center text-lg font-bold p-2 bg-red-700/80 mt-4 rounded-t-md">
                {fixtures[0].league.name}
            </div>
            {fixtures.map(fixture => (
                <Link
                    key={fixture.fixture.id}
                    href={`/match1/${fixture.fixture.id}nm${fixture.league.name}seas${fixture.league.season}lid${fixture.league.id}`}
                    className="w-full flex items-center bg-gray-700 hover:bg-red-800 rounded-md p-4 mb-2"
                >
                    <div className="flex flex-col items-center w-3/12 text-sm">
                        <img src={fixture.teams.home.logo} alt="HomeLogo" width={50} height={50} />
                        <div>{fixture.teams.home.name}</div>
                    </div>
                    <div className="flex flex-col items-center w-6/12 text-xs md:text-sm">
                        <div className="text-center">{fixture.league.name}</div>
                        <LocalTime fixture={fixture} />
                        <div className="my-1 text-xl font-semibold">
                    {fixture.fixture.status.short === "NS" ? (
                        <span className="text-lg text-white">{fixture.goals.home} - {fixture.goals.away}</span>
                    ) : fixture.fixture.status.short === "FT" ? (
                        <span className="text-white">{fixture.goals.home} - {fixture.goals.away}</span>
                    ) :  fixture.fixture.status.short === "PEN" ? (
<span className="text-white">
    {fixture.teams.home.winner === true 
        ? `${fixture.goals.home + 1} - ${fixture.goals.away}` 
        : `${fixture.goals.home} - ${fixture.goals.away + 1}`}
</span>
                    ) : fixture.fixture.status.short === "P" ? (
                        <div>
                        <span className="text-red-600">{fixture.goals.home} - {fixture.goals.away}</span>
                        <span className="text-red-600 text-xl">PENALTIES</span>
                        </div>
                    ) :  fixture.fixture.status.short === "AET" ? (
                        <span className="text-white">{fixture.goals.home} - {fixture.goals.away}</span>
                    ) :fixture.fixture.status.short === "PEN" ? (
                        <span className="text-white">{fixture.goals.home} - {fixture.goals.away}</span>
                    ): fixture.fixture.status.short === "FT" ? (
                        <span className="text-white">{fixture.goals.home} - {fixture.goals.away}</span>
                    ) : (
                        <span className="text-red-700">{fixture.goals.home} - {fixture.goals.away}</span>
                    )}
                </div>
                        {["1H"].includes(fixture.fixture.status.short) && (
    <div className="text-xs text-red-600">
        {fixture.fixture.status.elapsed >= 45 ? `45+${fixture.fixture.status.elapsed - 44}` : fixture.fixture.status.elapsed}
        <span className="inline-block animate-ping">′</span>
    </div>
)}
                {["2H"].includes(fixture.fixture.status.short) && (
    <div className="text-xs text-red-600">
        {fixture.fixture.status.elapsed >= 90 ? `90+${fixture.fixture.status.elapsed - 89}` : fixture.fixture.status.elapsed}
        <span className="inline-block animate-ping">′</span>
    </div>
)}
                {["ET"].includes(fixture.fixture.status.short) && (
    <div className="text-xs text-red-600">
        {fixture.fixture.status.elapsed+1}
        <span className="inline-block animate-ping">′</span>
    </div>
)}
                        <div className="text-center">{fixture.fixture.venue.name}</div>
                    </div>
                    <div className="flex flex-col items-center w-3/12 text-sm">
                        <img src={fixture.teams.away.logo} alt="AwayLogo" width={50} height={50} />
                        <div>{fixture.teams.away.name}</div>
                    </div>
                </Link>
            ))}
        </div>
))}

           
        </div>
    );
}
