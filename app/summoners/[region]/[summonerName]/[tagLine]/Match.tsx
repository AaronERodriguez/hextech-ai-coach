'use client'

import { Avatar, AvatarBadge, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    match: any
}

function secondsToMinutsFormat(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

const Match = ({match}: Props) => {
    console.log(match)
  return (
    <Card className={cn('w-full py-2 flex flex-row items-center', match.player[0].win ? 'bg-green-100 dark:bg-green-950' : 'bg-red-100 dark:bg-red-950')}>
        <div className='relative'>
            <Image src={`/images/champions/${match.player[0].championId}.png`} alt="Champion" width={48} height={48} />
            <Badge variant='secondary' className='absolute -right-3 bottom-0'>{match.player[0].champLevel}</Badge>
        </div>
        <Badge variant='outline' className='self-center'>
            {match.info.queueId === 420 ? "Ranked Solo/Duo" : match.info.queueId === 440 ? "Ranked Flex" : match.queueId === 450 ? "ARAM" : "Other"}
        </Badge>
        <p>{`${match.player[0].kills}/${match.player[0].deaths}/${match.player[0].assists}`}</p>
        <p>{secondsToMinutsFormat(match.info.gameDuration)}</p>
    </Card>
  )
}

export default Match