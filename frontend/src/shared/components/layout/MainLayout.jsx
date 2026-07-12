import './MainLayout.css'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/*TO DO : ADD HEADER HERE*/}
      <main className="main-layout__content">
        <Outlet />
      </main>
    </div>
  )
}
export default MainLayout
