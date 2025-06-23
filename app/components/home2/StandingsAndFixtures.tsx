'use client';

import { AllFixtures } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import FixturesByLeague from "./FixturesByLeague";
import moment from "moment";
import Link from "next/link";
import LoadingComponent from "../LoadingComponent";
import { log } from "node:console";

export default function StandingsAndFixtures({ 
    filteredFixtures_2}: { 
    filteredFixtures_2:AllFixtures[]
    }) {
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
    const [updatedFixtures_2, setUpdatedFixtures_2] = useState<AllFixtures[]>(filteredFixtures_2);
    
   //
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
        if ((updatedFixtures_2).length !== (filteredFixtures_2).length) {
            setUpdatedFixtures_2(filteredFixtures_2);
        }
    }, [filteredFixtures_2]);

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
            <div className="flex flex-wrap w-full bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-900">
        <div className="w-full md:w-1/4 bg-gray-600 shadow-md p-4 rounded-lg overflow-x-auto">
                {menuItems.map((league, i) => (
                    <Link href={`/chart`} key={league.league}>
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
                        {Array.from({ length: 1 }).map((_, i) => {
                            const date = moment().add(i, 'days');
                            const formattedDate = date.format("DD/MM"); // Format as dd/mm
                            const dayOfWeek = date.format("ddd"); // Get the first three characters of the day name
                            const isToday = date.isSame(moment(), 'day'); // Check if it's today's date

                            return (
                                <option key={date.format("YYYY-MM-DD")} value={date.format("YYYY-MM-DD")}>
                                    {isToday ? "2025-03-16" : `${formattedDate} ${dayOfWeek}`}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Fixtures */}
                <div className="max-w-4xl mx-auto pt-2 space-y-4">
                   
                        <>
                        
                        <FixturesByLeague
                            fixturesByTeamId={updatedFixtures_2}
                            selectedDate={selectedDate}
                        />
                       
                        </>
                   
                    
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

            

        </div>
    );  
}
