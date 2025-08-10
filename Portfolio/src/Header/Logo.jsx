import React from 'react'
import { Link } from 'react-router-dom'
const Logo = () => {
  return (
    <Link to={'/'}>
    <span className="font-rubik text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-transparent dark:text-orange-600 bg-gradient-to-r
     from-orange-700 via-orange-600 to-orange-800 bg-clip-text" >
      HAIDER
    </span>
    </Link>
  )
}

export default Logo