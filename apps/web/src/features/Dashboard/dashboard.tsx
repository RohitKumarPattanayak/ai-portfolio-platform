import { dashboardFetchPortfolio } from "../../react-queries/DashboardQueries";
import { Loader2 } from "lucide-react";
import { lazy, Suspense, useEffect } from 'react';
import { useActiveResumeStore } from "../../store/active_resume.store";
import { onboardingFetchActiveResume } from "../../react-queries/OnboardingQueries";

// Lazy loading the isolated portfolio component for efficient bundle splitting
const Portfolio = lazy(() => import('../Portfolio/Portfolio'));

const DashboardPage = () => {
    const { data, isLoading, isError, error } = dashboardFetchPortfolio();
    const setResumeDetails = useActiveResumeStore((s) => s.setResumeDetails);
    const { data: activeResume } = onboardingFetchActiveResume();
    useEffect(() => {
        if (activeResume) {
            setResumeDetails(
                activeResume.resume_owner_pic,
                activeResume.personal_info
            );
        }
    }, [activeResume, setResumeDetails]);
    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-transparent space-y-4">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                <p className="text-gray-600 dark:text-gray-400 font-medium animate-pulse">Loading Portfolio...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-transparent text-gray-900 dark:text-white p-6">
                <div className="text-center p-8 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded-3xl max-w-md w-full shadow-xl dark:shadow-2xl">
                    <h2 className="text-xl font-bold mb-3">Unable to Load Portfolio</h2>
                    <p className="text-sm opacity-80">{error?.message || 'Please check your connection and try again.'}</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <div className="w-full min-h-screen bg-transparent transition-colors duration-300">
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-transparent">
                    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                </div>
            }>
                <Portfolio data={data} />
            </Suspense>
        </div>
    );
}

export default DashboardPage;
