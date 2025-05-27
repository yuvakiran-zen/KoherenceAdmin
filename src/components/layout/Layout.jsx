import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileNavbar from '../ui/MobileNavbar'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Handle screen resize to update mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(false) // Close mobile sidebar when resizing to desktop
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 pb-20 md:pb-6 bg-gray-50">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Mobile bottom navigation */}
        {isMobile && <MobileNavbar setSidebarOpen={setSidebarOpen} />}
      </div>
    </div>
  )
}

export default Layout