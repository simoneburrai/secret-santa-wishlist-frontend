import type { JSX } from "react"
import {Outlet } from "react-router-dom"
import Header from "./Header";


export default function Default(): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-xmas-bg text-xmas-text transition-colors duration-500">
      <Header/>
      <main className="flex-1 flex flex-col p-6">
        <Outlet />
      </main>
    </div>
  );
}