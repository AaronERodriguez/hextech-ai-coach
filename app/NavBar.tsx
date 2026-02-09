import { ModeToggle } from '@/components/toggle-theme'
import React from 'react'
import SearchBar from './SearchBar'

type Props = {}

function NavBar({}: Props) {
  return (
    <div className='w-full h-16 bg-primary flex flex-row items-center px-4 justify-between'>
        <h1 className='text-white text-2xl font-bold'>HexTech AI Coach</h1>
        <SearchBar />
        <ModeToggle />
    </div>
  )
}

export default NavBar