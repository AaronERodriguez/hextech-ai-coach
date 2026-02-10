import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

type ResponseData = {
  message: string
}

const championJSON = await fetch('http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json');
const championData = await championJSON.json();

export async function POST(request: Request) {
  const body = await request.json();
  const summonerName = body.summonerName;
  const tagLine = body.tagLine;
  const region = body.region.toLowerCase() || "na1";

    const response = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}`, {
    method: "GET",
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY || "",
    },
    });
    const data = await response.json();
    const puuid = data.puuid;
    const responsetwo = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
    method: "GET",
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY || "",
    }
    });
    const datatwo = await responsetwo.json();

    const response3 = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`, {
    method: "GET",
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY || "",
    },
    });
    const data3 = await response3.json();

    const matches = await Promise.all(data3.map(async (matchId: string) => {
      return fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
        method: "GET",
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY || "",
        },
      })
    }))
    .then(responses => Promise.all(responses.map(res => res.json())));
    const finalMatches = matches.map((match: any) => {
      return {
        ...match,
        player: match.info.participants.filter((participant: any) => {
          return participant.puuid === puuid
        })
      }
    })

    const result = {
        gameName : data.gameName,
        tagLine : data.tagLine,
        puuid : puuid,
        region : region,
        profileIconId : datatwo.profileIconId,
        summonerLevel : datatwo.summonerLevel,
        matches : finalMatches,
    }

    return NextResponse.json({ message: result});
}