import { Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "./layout"
import DashboardPage from "../features/Dashboard/dashboard"
import ChatPage from "../features/Chat/chat"

export const AppRouter = () => {
  return (
    <Routes>
      {/* redirection */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="chat" element={<ChatPage />} />
      </Route>
    </Routes>
  )
}