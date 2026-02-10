"use client";

import React, { use, useEffect } from 'react'

type Props = {
    MatchesPromise : any
}

const MatchList = ({MatchesPromise}: Props) => {
    const data = use(MatchesPromise)
    useEffect(() => {
        console.log(data)
    }, [data])
  return (
    <div>MatchList</div>
  )
}

export default MatchList