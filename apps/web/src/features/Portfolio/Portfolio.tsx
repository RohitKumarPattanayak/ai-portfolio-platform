import { memo, lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import type { PortfolioData } from './types';

// Lazy load components for code splitting & faster initial render
const Hero = lazy(() => import('./components/Hero'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Education = lazy(() => import('./components/Education'));

interface PortfolioProps {
  data: PortfolioData;
}

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-20 w-full min-h-[300px]">
    <Loader2 className="w-8 h-8 text-emerald-500/50 animate-spin" />
  </div>
);

const Portfolio = memo(({ data }: PortfolioProps) => {
  return (
    <div className="bg-white dark:bg-[#020617] text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-500/30 dark:selection:bg-emerald-500/30 w-full overflow-x-hidden transition-colors duration-300">
      <Suspense fallback={<LoadingFallback />}>
        {/* Intro Section - Darkest Background */}
        <div className="bg-gray-50/50 dark:bg-[#020617] transition-colors duration-300">
          <Hero data={data} />
        </div>

        {/* Content Section - Subtle Gradient */}
        <div className="bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#020617] dark:via-[#080d1e] dark:to-[#020617] transition-colors duration-300">
          <Experience data={data} />
          <Projects data={data} />
          <Skills data={data} />
          <Education data={data} />
        </div>
      </Suspense>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-600 border-t border-gray-800/40 text-sm font-medium">
        <p>© {new Date().getFullYear()} • Engineered for Performance</p>
      </footer>
    </div>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;
