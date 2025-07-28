import React from 'react'
import TopBar from './Component/TopBar'
import Header from './Component/Header'
import { Outlet } from 'react-router-dom'
const App = () => {
  return (
    <div className="w-full overflow-x-hidden scrollbar-hide">
  <TopBar />
  <Header/>
  <Outlet></Outlet>
</div>

  )
}

export default App