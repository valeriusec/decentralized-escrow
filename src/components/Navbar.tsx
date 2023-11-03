import React from 'react'
import { ModeToggle } from './ThemeToggler'
import { Layers3 } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='w-full flex items-center justify-between backdrop-blur-md fixed top-0 p-4'>
      <div className="flex gap-1">
        <Layers3 className="text-primary" />
        <span>GoContract</span>
      </div>
        <ModeToggle />
    </nav>
  )
}

export default Navbar