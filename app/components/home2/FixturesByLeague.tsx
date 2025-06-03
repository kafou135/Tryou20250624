import { useState, useMemo } from "react";
import { AllFixtures } from "@/types";
import FixtureItem from "./FixtureItem";
import moment from "moment";

type PageProps = {
  fixturesByTeamId: AllFixtures[];
  selectedDate: string;
};

export default function FixturesByLeague({ fixturesByTeamId, selectedDate }: PageProps) {
  const [openLeagues, setOpenLeagues] = useState<{ [leagueId: number]: boolean }>({});

  const handleToggle = (leagueId: number) => {
    setOpenLeagues(prev => ({
      ...prev,
      [leagueId]: !prev[leagueId]
    }));
  };

  const fixturesGroupedByLeague = useMemo(() => {
    const filtered = fixturesByTeamId.filter(
      f => moment(f.fixture.date).format("YYYY-MM-DD") === selectedDate
    );

    const grouped: { [leagueId: number]: AllFixtures[] } = {};

    filtered.forEach(fixture => {
      const leagueId = fixture.league.id;
      if (!grouped[leagueId]) {
        grouped[leagueId] = [];
      }
grouped[leagueId] = [...(grouped[leagueId] || []), fixture];
    });

    return grouped;
  }, [fixturesByTeamId, selectedDate]);

  return (
    <div>
      {Object.entries(fixturesGroupedByLeague).map(([leagueIdStr, fixtures]) => {
        const leagueId = parseInt(leagueIdStr);
        const firstFixture = fixtures[0];
        const isOpen = openLeagues[leagueId] ?? true;

        return (
          <div key={leagueId} className="bg-white-200 mb-4">
            {/* League Header */}
            <div
              className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-all border-l-4 ${
                leagueId ? "border-red-600 bg-gray-200 text-black" : "border-transparent text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <img
                    src={`https://media.api-sports.io/football/leagues/${leagueId}.png`}
                    alt="league logo"
                    style={{ width: "24px", height: "auto", marginRight: "8px" }}
                  />
                  {firstFixture.league.name}
                </div>

                <div onClick={() => handleToggle(leagueId)} className="cursor-pointer ml-2">
                  <span className="text-xl font-bold">{isOpen ? "˄" : "˅"}</span>
                </div>
              </div>
            </div>

            {/* Fixtures List */}
            {isOpen && (
              <div className="flex flex-col mt-2">
                {fixtures.map(fixture => (
                  <FixtureItem match={fixture} key={fixture.fixture.id} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
