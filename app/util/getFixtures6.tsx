//port { AllFixtures, Fixture } from "@/types";
//port moment from 'moment';//
//nst API_KEY = process.env.API_KEY as string;//////
//nst leagues =    [
//  {league: 224,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
//eague: 225,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
//eague: 226,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
//eague: 227,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
//eague: 228,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
//eague: 229,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
//eague: 230,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
//eague: 231,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
//eague: 232,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
//eague: 222,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
//eague: 221,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
//eague: 223,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
//eague: 418,yearr:-1,startmonth: '2024-09-01',endmonth: '2025-06-01',country: "Azerbaijan",name: "EPL"},
//eague: 420,yearr:-1,startmonth: '2024-10-01',endmonth: '2025-05-01',country: "Azerbaijan",name: "EPL"},
//eague: 419,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-06-01',country: "Azerbaijan",name: "EPL"},
//eague: 1049,yearr:-1,startmonth: '2025-01-01',endmonth: '2025-05-01',country: "Bahrain",name: "EPL"},
//]//
//ync function fetchFixturesByLeague(
//  year: number,
//  league: number,
//  yearr: number
// Promise<Fixture[]> {
//nst nextWeek1 = moment().add(3, 'days').format('YYYY-MM-DD');        const lastWeek1 = moment().add(1, 'days').format('YYYY-MM-DD');   const url = `hhhhhhh?league=${league}&season=${year + yearr}&from=${lastWeek1}&to=${nextWeek1}`;    const options = {
//      method: 'GET',
//      headers: {
//          'X-RapidAPI-Key': API_KEY,
//      },
//      next: {
//          revalidate: 1 * 1 * 15,
//      },
//  };//
//  try {
//      const response = await fetch(url, options);
//      const data = await response.json();
//      return data.response ?? [];
//  } catch (err) {
//      console.log(`Error fetching ${league} fixtures in year ${year}: ${err}`);
//      return [];
//  }
//}
// 