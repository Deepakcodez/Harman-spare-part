import React from "react"
import { Sidebar } from "./_components/Sidebar/Sidebar"
import { Dashboard } from "./_components/Dashboard/Dashboard"

const Admin:React.FC = () => {


  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
      <Sidebar />
      <Dashboard />
    </main>
  )
}
export default Admin