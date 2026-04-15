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
    <div>
      <div id="portfolio-main" className="bg-white dark:bg-[#020617] text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-500/30 dark:selection:bg-emerald-500/30 w-full overflow-x-hidden transition-colors duration-300">
        <Suspense fallback={<LoadingFallback />}>
          {/* Intro Section - Darkest Background */}
          <div className="bg-gray-50/50 dark:bg-[#020617] transition-colors duration-300">
            <Hero data={data} />
          </div>

          {/* Content Section - Subtle Gradient */}
          <div className="bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#020617] dark:via-[#080d1e] dark:to-[#020617] transition-colors duration-300">
            <nav className="fixed top-2 left-1/2 -translate-x-1/2 z-50">
              <div className="flex gap-5 px-4 py-1.5 rounded-full 
                  bg-white/20 dark:bg-white/5 
                  backdrop-blur-sm">

                <a href="#experience" className="text-xs text-gray-500/70 dark:text-gray-400/60 hover:text-indigo-600">
                  Experience
                </a>

                <a href="#projects" className="text-xs text-gray-500/70 dark:text-gray-400/60 hover:text-indigo-600">
                  Projects
                </a>

                <a href="#skills" className="text-xs text-gray-500/70 dark:text-gray-400/60 hover:text-indigo-600">
                  Skills
                </a>

                <a href="#education" className="text-xs text-gray-500/70 dark:text-gray-400/60 hover:text-indigo-600">
                  Education
                </a>

              </div>
            </nav>
            <div id="experience" className="scroll-mt-14"><Experience data={data} /></div>
            <div id="projects" className="scroll-mt-14"><Projects data={data} /></div>
            <div id="skills" className="scroll-mt-14"><Skills data={data} /></div>
            <div id="education" className="scroll-mt-14"><Education data={data} /></div>
          </div>
        </Suspense>

        {/* Footer */}
        <footer className="py-10 text-center text-gray-600 border-t border-gray-800/40 text-sm font-medium">
          <p>© {new Date().getFullYear()} • Engineered for Performance</p>
        </footer>
      </div>
    </div >
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;
