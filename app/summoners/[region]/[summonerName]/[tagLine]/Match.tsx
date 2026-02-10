'use client'

import { Avatar, AvatarBadge, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

type Props = {
    match: any
}

const Match = ({match}: Props) => {
    console.log(match)
  return (
    <Card className='w-full py-2 flex flex-row'>
        <div className='relative'>
            <Image src={`/images/champions/${match.player[0].championId}.png`} alt="Champion" width={48} height={48} />
            <Badge variant='secondary' className='absolute -right-3 bottom-0'>{match.player[0].champLevel}</Badge>
        </div>
        <Badge variant='outline' className='self-center'>
            {match.info.queueId === 420 ? "Ranked Solo/Duo" : match.info.queueId === 440 ? "Ranked Flex" : match.queueId === 450 ? "ARAM" : "Other"}
        </Badge>
    </Card>
  )
}

export default Match