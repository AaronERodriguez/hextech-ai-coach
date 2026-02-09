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

    const result = {
        gameName : data.gameName,
        tagLine : data.tagLine,
        puuid : puuid,
        region : region,
    }

    return NextResponse.json({ message: result});
}