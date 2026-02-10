"use client";

import React, { use, useEffect } from 'react'
import Match from './Match';

type Props = {
    MatchesPromise : any
}

const MatchList = ({MatchesPromise}: Props) => {
    const data = use<any>(MatchesPromise)

    useEffect(() => {
        console.log(data)
    }, [data])
  return (
    <div className='w-full flex flex-col'>
        {data.message.matches.map((match: any) => (
            <Match match={match} key={match.metadata.matchId}/>
        ))}
    </div>
  )
}

export default MatchList