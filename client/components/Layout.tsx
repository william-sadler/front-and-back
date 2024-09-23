import { Outlet } from 'react-router-dom'
import Nav from './Nav'

export default function Layout() {
  return (
    <>
      <Nav />
      <section id="main-container">
        <section id="content-wrap">
          <Outlet />
        </section>
      </section>
    </>
  )
}
