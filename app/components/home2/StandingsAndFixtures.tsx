'use client';

import { AllFixtures } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import FixturesByLeague from "./FixturesByLeague";
import moment from "moment";
import Link from "next/link";

export default function StandingsAndFixtures({ filteredFixtures,filteredFixtures1,filteredFixtures2,filteredFixtures3,filteredFixtures4,filteredFixtures5,filteredFixtures6,filteredFixtures7,filteredFixtures8,filteredFixtures9,filteredFixtures10,filteredFixtures_1,filteredFixtures_2,filteredFixtures1_1,filteredFixtures1_2,filteredFixtures2_1,filteredFixtures2_2,filteredFixtures3_1,filteredFixtures3_2,filteredFixtures4_1,filteredFixtures4_2,filteredFixtures5_1,filteredFixtures5_2,filteredFixtures6_1,filteredFixtures6_2,filteredFixtures7_1,filteredFixtures7_2,filteredFixtures8_1,filteredFixtures8_2,filteredFixtures9_1,filteredFixtures9_2,filteredFixtures10_1,filteredFixtures10_2 }: { filteredFixtures: AllFixtures[], filteredFixtures1: AllFixtures[],filteredFixtures2: AllFixtures[],filteredFixtures3: AllFixtures[], filteredFixtures4: AllFixtures[],filteredFixtures5: AllFixtures[],filteredFixtures6: AllFixtures[], filteredFixtures7: AllFixtures[], filteredFixtures8: AllFixtures[] , filteredFixtures9: AllFixtures[] , filteredFixtures10: AllFixtures[],filteredFixtures_1:AllFixtures[],filteredFixtures_2:AllFixtures[],filteredFixtures1_1:AllFixtures[],filteredFixtures1_2:AllFixtures[],filteredFixtures2_1:AllFixtures[],filteredFixtures2_2:AllFixtures[],filteredFixtures3_1:AllFixtures[],filteredFixtures3_2:AllFixtures[],filteredFixtures4_1:AllFixtures[],filteredFixtures4_2:AllFixtures[],filteredFixtures5_1:AllFixtures[],filteredFixtures5_2:AllFixtures[],filteredFixtures6_1:AllFixtures[],filteredFixtures6_2:AllFixtures[],filteredFixtures7_1:AllFixtures[],filteredFixtures7_2:AllFixtures[],filteredFixtures8_1:AllFixtures[],filteredFixtures8_2:AllFixtures[],filteredFixtures9_1:AllFixtures[],filteredFixtures9_2:AllFixtures[],filteredFixtures10_1:AllFixtures[],filteredFixtures10_2:AllFixtures[] }) {
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    
    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDate(event.target.value);
    };

    const menuItems = [
        { league: 39, name: 'EPL', yearr: 0 },
        { league: 140, name: 'La Liga', yearr: 0 },
        { league: 78, name: 'BundesLiga', yearr: 0 },
        { league: 135, name: 'Serie A', yearr: 0 },
        { league: 61, name: 'Ligue 1', yearr: 0 }
    ];

    const [activeTab, setActiveTab] = useState(0);
    const [updatedFixtures, setUpdatedFixtures] = useState<AllFixtures[]>(filteredFixtures);
    const [updatedFixtures_1, setUpdatedFixtures_1] = useState<AllFixtures[]>(filteredFixtures_1);
    const [updatedFixtures_2, setUpdatedFixtures_2] = useState<AllFixtures[]>(filteredFixtures_2);
    const [updatedFixtures1, setUpdatedFixtures1] = useState<AllFixtures[]>(filteredFixtures1);
    const [updatedFixtures1_1, setUpdatedFixtures1_1] = useState<AllFixtures[]>(filteredFixtures1_1);
    const [updatedFixtures1_2, setUpdatedFixtures1_2] = useState<AllFixtures[]>(filteredFixtures1_2);
    const [updatedFixtures2, setUpdatedFixtures2] = useState<AllFixtures[]>(filteredFixtures2);
    const [updatedFixtures2_1, setUpdatedFixtures2_1] = useState<AllFixtures[]>(filteredFixtures2_1);
    const [updatedFixtures2_2, setUpdatedFixtures2_2] = useState<AllFixtures[]>(filteredFixtures2_2);
    const [updatedFixtures3, setUpdatedFixtures3] = useState<AllFixtures[]>(filteredFixtures3);
    const [updatedFixtures3_1, setUpdatedFixtures3_1] = useState<AllFixtures[]>(filteredFixtures3_1);
    const [updatedFixtures3_2, setUpdatedFixtures3_2] = useState<AllFixtures[]>(filteredFixtures3_2);
    const [updatedFixtures4, setUpdatedFixtures4] = useState<AllFixtures[]>(filteredFixtures4);
    const [updatedFixtures4_1, setUpdatedFixtures4_1] = useState<AllFixtures[]>(filteredFixtures4_1);
    const [updatedFixtures4_2, setUpdatedFixtures4_2] = useState<AllFixtures[]>(filteredFixtures4_2);
    const [updatedFixtures5, setUpdatedFixtures5] = useState<AllFixtures[]>(filteredFixtures5);
    const [updatedFixtures5_1, setUpdatedFixtures5_1] = useState<AllFixtures[]>(filteredFixtures5_1);
    const [updatedFixtures5_2, setUpdatedFixtures5_2] = useState<AllFixtures[]>(filteredFixtures5_2);
    const [updatedFixtures6, setUpdatedFixtures6] = useState<AllFixtures[]>(filteredFixtures6);
    const [updatedFixtures6_1, setUpdatedFixtures6_1] = useState<AllFixtures[]>(filteredFixtures6_1);
    const [updatedFixtures6_2, setUpdatedFixtures6_2] = useState<AllFixtures[]>(filteredFixtures6_2);
    const [updatedFixtures7, setUpdatedFixtures7] = useState<AllFixtures[]>(filteredFixtures7);
    const [updatedFixtures7_1, setUpdatedFixtures7_1] = useState<AllFixtures[]>(filteredFixtures7_1);
    const [updatedFixtures7_2, setUpdatedFixtures7_2] = useState<AllFixtures[]>(filteredFixtures7_2);
    const [updatedFixtures8, setUpdatedFixtures8] = useState<AllFixtures[]>(filteredFixtures8);
    const [updatedFixtures8_1, setUpdatedFixtures8_1] = useState<AllFixtures[]>(filteredFixtures8_1);
    const [updatedFixtures8_2, setUpdatedFixtures8_2] = useState<AllFixtures[]>(filteredFixtures8_2);
    const [updatedFixtures9, setUpdatedFixtures9] = useState<AllFixtures[]>(filteredFixtures9);
    const [updatedFixtures9_1, setUpdatedFixtures9_1] = useState<AllFixtures[]>(filteredFixtures9_1);
    const [updatedFixtures9_2, setUpdatedFixtures9_2] = useState<AllFixtures[]>(filteredFixtures9_2);
    const [updatedFixtures10, setUpdatedFixtures10] = useState<AllFixtures[]>(filteredFixtures10);
    const [updatedFixtures10_1, setUpdatedFixtures10_1] = useState<AllFixtures[]>(filteredFixtures10_1);
    const [updatedFixtures10_2, setUpdatedFixtures10_2] = useState<AllFixtures[]>(filteredFixtures10_2);

    const menuRef = useRef<HTMLDivElement>(null);

    const scrollToTab = (index: number) => {
        const container = menuRef.current;
        if (container) {
            const tab = container.children[index] as HTMLElement;
            tab?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    };

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        scrollToTab(index);
    };

    useEffect(() => {
        if (updatedFixtures.length !== filteredFixtures.length) {
            setUpdatedFixtures(filteredFixtures);
        }
    }, [filteredFixtures]);
    useEffect(() => {
        if ((updatedFixtures_1).length !== (filteredFixtures_1).length) {
            setUpdatedFixtures(filteredFixtures_1);
        }
    }, [filteredFixtures_1]);
    useEffect(() => {
        if ((updatedFixtures_2).length !== (filteredFixtures_2).length) {
            setUpdatedFixtures1(filteredFixtures_2);
        }
    }, [filteredFixtures_2]);

    useEffect(() => {
        if ((updatedFixtures1).length !== (filteredFixtures1).length) {
            setUpdatedFixtures2(filteredFixtures1);
        }
    }, [filteredFixtures1]);
    useEffect(() => {
        if ((updatedFixtures1_1).length !== (filteredFixtures1_1).length) {
            setUpdatedFixtures2(filteredFixtures1_1);
        }
    }, [filteredFixtures1_1]);
    useEffect(() => {
        if ((updatedFixtures1_2).length !== (filteredFixtures1_2).length) {
            setUpdatedFixtures2(filteredFixtures1_2);
        }
    }, [filteredFixtures1_2]);
    useEffect(() => {
        if ((updatedFixtures2).length !== (filteredFixtures2).length) {
            setUpdatedFixtures2(filteredFixtures2);
        }
    }, [filteredFixtures2]);
    useEffect(() => {
        if ((updatedFixtures2_1).length !== (filteredFixtures2_1).length) {
            setUpdatedFixtures2(filteredFixtures2_1);
        }
    }, [filteredFixtures2_1]);
    useEffect(() => {
        if ((updatedFixtures2_2).length !== (filteredFixtures2_2).length) {
            setUpdatedFixtures2(filteredFixtures2_2);
        }
    }, [filteredFixtures2_2]);
    useEffect(() => {
        if ((updatedFixtures3).length !== (filteredFixtures3).length) {
            setUpdatedFixtures2(filteredFixtures3);
        }
    }, [filteredFixtures3]);
    useEffect(() => {
        if ((updatedFixtures3_1).length !== (filteredFixtures3_1).length) {
            setUpdatedFixtures2(filteredFixtures3_1);
        }
    }, [filteredFixtures3_1]);
    useEffect(() => {
        if ((updatedFixtures3_2).length !== (filteredFixtures3_2).length) {
            setUpdatedFixtures2(filteredFixtures3_2);
        }
    }, [filteredFixtures3_2]);
    useEffect(() => {
        if ((updatedFixtures4).length !== (filteredFixtures4).length) {
            setUpdatedFixtures2(filteredFixtures4);
        }
    }, [filteredFixtures4]);
    useEffect(() => {
        if ((updatedFixtures4_1).length !== (filteredFixtures4_1).length) {
            setUpdatedFixtures2(filteredFixtures4_1);
        }
    }, [filteredFixtures4_1]);
    useEffect(() => {
        if ((updatedFixtures4_2).length !== (filteredFixtures4_2).length) {
            setUpdatedFixtures2(filteredFixtures4_2);
        }
    }, [filteredFixtures4_2]);
    useEffect(() => {
        if ((updatedFixtures5).length !== (filteredFixtures5).length) {
            setUpdatedFixtures2(filteredFixtures5);
        }
    }, [filteredFixtures5]);
    useEffect(() => {
        if ((updatedFixtures5_1).length !== (filteredFixtures5_1).length) {
            setUpdatedFixtures2(filteredFixtures5_1);
        }
    }, [filteredFixtures5_1]);
    useEffect(() => {
        if ((updatedFixtures5_2).length !== (filteredFixtures5_2).length) {
            setUpdatedFixtures2(filteredFixtures5_2);
        }
    }, [filteredFixtures5_2]);
    useEffect(() => {
        if ((updatedFixtures6).length !== (filteredFixtures6).length) {
            setUpdatedFixtures2(filteredFixtures6);
        }
    }, [filteredFixtures6]);
    useEffect(() => {
        if ((updatedFixtures6_1).length !== (filteredFixtures6_1).length) {
            setUpdatedFixtures2(filteredFixtures6_1);
        }
    }, [filteredFixtures6_1]);
    useEffect(() => {
        if ((updatedFixtures6_2).length !== (filteredFixtures6_2).length) {
            setUpdatedFixtures2(filteredFixtures6_2);
        }
    }, [filteredFixtures6]);
    useEffect(() => {
        if ((updatedFixtures7).length !== (filteredFixtures7).length) {
            setUpdatedFixtures2(filteredFixtures7);
        }
    }, [filteredFixtures7]);
    useEffect(() => {
        if ((updatedFixtures7_1).length !== (filteredFixtures7_1).length) {
            setUpdatedFixtures2(filteredFixtures7_1);
        }
    }, [filteredFixtures7_1]);
    useEffect(() => {
        if ((updatedFixtures7_2).length !== (filteredFixtures7_2).length) {
            setUpdatedFixtures2(filteredFixtures7_2);
        }
    }, [filteredFixtures7_2]);
    useEffect(() => {
        if ((updatedFixtures8).length !== (filteredFixtures8).length) {
            setUpdatedFixtures2(filteredFixtures8);
        }
    }, [filteredFixtures8]);
    useEffect(() => {
        if ((updatedFixtures8_1).length !== (filteredFixtures8_1).length) {
            setUpdatedFixtures2(filteredFixtures8_1);
        }
    }, [filteredFixtures8_1]);
    useEffect(() => {
        if ((updatedFixtures8_2).length !== (filteredFixtures8_2).length) {
            setUpdatedFixtures2(filteredFixtures8_2);
        }
    }, [filteredFixtures8_2]);

    useEffect(() => {
        if ((updatedFixtures9).length !== (filteredFixtures9).length) {
            setUpdatedFixtures2(filteredFixtures9);
        }
    }, [filteredFixtures9]);
    useEffect(() => {
        if ((updatedFixtures9_1).length !== (filteredFixtures9_1).length) {
            setUpdatedFixtures2(filteredFixtures9_1);
        }
    }, [filteredFixtures9_1]);
    useEffect(() => {
        if ((updatedFixtures9_2).length !== (filteredFixtures9_2).length) {
            setUpdatedFixtures2(filteredFixtures9_2);
        }
    }, [filteredFixtures9_2]);

    useEffect(() => {
        if ((updatedFixtures10).length !== (filteredFixtures10).length) {
            setUpdatedFixtures2(filteredFixtures10);
        }
    }, [filteredFixtures10]);
    useEffect(() => {
        if ((updatedFixtures10_1).length !== (filteredFixtures10_1).length) {
            setUpdatedFixtures2(filteredFixtures10_1);
        }
    }, [filteredFixtures10_1]);
    useEffect(() => {
        if ((updatedFixtures10_2).length !== (filteredFixtures10_2).length) {
            setUpdatedFixtures2(filteredFixtures10_2);
        }
    }, [filteredFixtures10_2]);


    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (event.shiftKey) {
                event.preventDefault();
            }
        };

        const container = menuRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <div className="flex flex-wrap w-full bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-900">
            {/* Sidebar with League Buttons */}
            <div className="w-full md:w-1/4 bg-gray-600 shadow-md p-4 rounded-lg overflow-x-auto">
                {menuItems.map((league, i) => (
                    <Link href={`/standing/${league.yearr}${league.league}`} key={league.league}>
                        <button
                            className="hidden md:flex w-full px-4 py-2 rounded-lg text-sm font-medium transition-all border-l-4 text-white border-transparent hover:bg-gray-700"
                            onClick={() => handleTabClick(i)}
                        >
                            <div className="flex items-center">
                                <img
                                    src={`https://media.api-sports.io/football/leagues/${league.league}.png`}
                                    alt={league.name}
                                    className="w-5 h-5 md:w-6 md:h-6 mr-2"
                                />
                                {league.name}
                            </div>
                        </button>
                    </Link>
                ))}
            </div>

            {/* Match Display Section */}
            <div className="w-full md:w-3/4 bg-gray-800 shadow-lg rounded-lg p-6 text-white">
                {/* Date Selector */}
                <div className="mb-4 flex items-center">
                    <label className="mr-2 font-medium text-gray-300"></label>
                    <select
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="bg-gray-700 text-white border border-gray-600 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 focus:scale-105"
                    >
                        {Array.from({ length: 11 }).map((_, i) => {
                            const date = moment().subtract(7, 'days').add(i, 'days');
                            const formattedDate = date.format("DD/MM"); // Format as dd/mm
                            const dayOfWeek = date.format("ddd"); // Get the first three characters of the day name
                            const isToday = date.isSame(moment(), 'day'); // Check if it's today's date

                            return (
                                <option key={date.format("YYYY-MM-DD")} value={date.format("YYYY-MM-DD")}>
                                    {isToday ? "Today" : `${formattedDate} ${dayOfWeek}`}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Fixtures */}
                <div className="max-w-4xl mx-auto pt-2 space-y-4">
                    {updatedFixtures.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />

                        </>
                    ))}
                    {updatedFixtures_1.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />

                        </>
                    ))}
                    {updatedFixtures_2.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />

                        </>
                    ))}
                    {updatedFixtures1.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures1_1.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures1_2.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures2.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures2_1.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures2_2.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures3.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures3_1.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures3_2.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures4.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures4_1.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures4_2.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures5.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures5_1.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures5_2.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures6.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures6_1.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures6_2.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures7.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures7_1.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures7_2.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures8.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures8_1.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures8_2.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures9.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures9_1.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures9_2.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures10.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures10_1.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                    {updatedFixtures10_2.map((league, j) => (
                        <>
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                        </>
                    ))}
                </div>
            </div>
            <div className="text-gray-300 mb-8 leading-relaxed space-y-4">
  <h1 className="text-2xl font-bold text-white">Today’s Football Matches and Live Scores</h1>
  <p>
    Welcome to your one-stop destination for all football fixtures happening today! Whether you're a fan of the English Premier League, Spain's La Liga, Italy’s Serie A, Germany's Bundesliga, or France’s Ligue 1, this page gives you real-time updates and match schedules.
  </p>
  <p>
    Football is more than just a game—it's a global language that brings people together. Our platform is designed to offer fans an easy way to keep track of their favorite teams and leagues, all in one place. With intuitive navigation and up-to-date fixtures, you’ll never miss a kick, goal, or result.
  </p>
  <p>
    Each match you see below is updated in real time, so whether you’re preparing for fantasy football or just want to catch today’s biggest rivalries, you’re in the right place. From league leaders to underdog showdowns, every game has its own story.
  </p>
  <p>
    Click on any league from the sidebar to view current standings and explore more about your favorite teams. You can also browse matches by date to plan your football viewing experience. We believe fans deserve a simple, beautiful, and fast way to get the data they need.
  </p>
  <p>
    Don't forget to bookmark this page and check back daily for fresh updates, player performances, and full fixture breakdowns. We're committed to making this your go-to hub for everything football-related.
  </p>
</div>

        </div>
    );  
}
