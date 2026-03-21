import { Suspense, lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import ErrorBoundary from "../components/shared/ErrorBoundary"
import LoadingFallback from "../components/shared/LoadingFallback"

// Lazy load route components
const DashboardLayout = lazy(() => import("./layout"))
const DashboardPage = lazy(() => import("../features/Dashboard/dashboard"))
const ChatPage = lazy(() => import("../features/Chat/chat"))

export const AppRouter = () => {
  return (
    <ErrorBoundary moduleName="Application Routes">
      <Suspense fallback={<LoadingFallback message="Loading Routes..." />}>
        <Routes>
          {/* redirection */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="chat" element={<ChatPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}