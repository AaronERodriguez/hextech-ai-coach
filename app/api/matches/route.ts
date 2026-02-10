import { NextResponse } from 'next/server';

type ResponseData = {
  message: string
}

const championJSON = await fetch('http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json');
const championData = await championJSON.json();

export async function POST(request: Request) {
  const body = await request.json();
  const puuid = body.puuid;

    const response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`, {
    method: "GET",
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY || "",
    },
    });
    const data = await response.json();

    const matches = await Promise.all(data.map(async (matchId: string) => {
      return fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
        method: "GET",
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY || "",
        },
      })
    }))
    .then(responses => Promise.all(responses.map(res => res.json())));
    
    matches.forEach((match: any) => {
      match.info.participants.filter((participant: any) => participant.puuid === puuid)
    })

    return NextResponse.json({ message: matches});
}