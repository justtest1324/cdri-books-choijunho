import { Outlet } from 'react-router'
import Header from './Header'

function Layout() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[960px] px-6 pt-14 pb-20">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
