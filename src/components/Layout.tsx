import { Link, Outlet } from "@tanstack/react-router";
export default function Layout() {
  return (
    <div>
      <h1>Layout</h1>
      <Link to="/">Home</Link>
      <Outlet />
    </div>
  )
}
