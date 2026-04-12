import { memo } from 'react';
import { GraduationCap } from 'lucide-react';
import type { PortfolioData } from '../types';

interface EducationProps {
  data: PortfolioData;
}

const EducationData = memo(({ data }: EducationProps) => {
  const education = data.education || [];

  if (education.length === 0) return null;

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto w-full transition-colors duration-300">
      <div className="flex items-center gap-3 mb-12">
        <GraduationCap className="w-8 h-8 text-purple-500 dark:text-purple-400" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight transition-colors">Education</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, idx) => {
          const { degree, institution, start_year, end_year } = edu.meta_data;
          return (
            <div 
              key={idx} 
              className="p-8 bg-white dark:bg-[#0B1120]/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800/80 rounded-2xl hover:border-purple-300 dark:hover:border-purple-500/40 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-500 group shadow-sm hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/5"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-3 leading-tight">{degree}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                 <h4 className="text-gray-600 dark:text-gray-400 text-sm font-medium tracking-wide w-full sm:w-auto transition-colors">{institution}</h4>
                 <span className="inline-flex items-center text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-full text-gray-600 dark:text-gray-500 font-medium whitespace-nowrap transition-colors">
                  {start_year} - {end_year}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

EducationData.displayName = 'Education';
export default EducationData;
