import { Suspense } from "react";
import MatchList from "./MatchList";

const SpecificPlayerPage = async ({
  params,
}: {
  params: Promise<{ summonerName: string; tagLine: string; region: string }>
}) => {
  const rest = await params

  const data = fetch(`${process.env.URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      summonerName: rest.summonerName,
      tagLine: rest.tagLine,
      region: rest.region,
    })
  }).then(res => res.json())

  return (
    <div>
      <h1>Summoner Name: {rest.summonerName}</h1>
      <h2>Tag Line: {rest.tagLine}</h2>
      <h3>Region: {rest.region}</h3>
      <Suspense fallback={<div>Loading matches...</div>}>
        <MatchList MatchesPromise={data} />
      </Suspense>
    </div>
  )
}

export default SpecificPlayerPage